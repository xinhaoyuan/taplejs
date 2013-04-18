function Compiler() {
    this.scope_depth = 0;
}

Compiler.prototype = {
    compile_eval_string: function(str) {
        return this.compile_begin(null, texpr_parser.parse(str), 0);
    },

    extract_expr: function (scope, expr) {
        while (true) {
            if (typeof expr != "object") throw "Cannot extract expression for " + String(expr);
            var type = String(expr.type);
            if (type == "Scoped") {
                scope = expr.scope;
                expr =  expr.expr;
            } else break;
        }
        return { scope: scope, expr: expr };
    },

    compile_eval: function (scope, expr) {
        var v = this.extract_expr(scope, expr);
        scope = v.scope; expr = v.expr;
        
        switch (expr.type) {
            // Constants
        case "Integer":
            return "(" + String(expr.value) + ")";
        case "RealNumber":
            return "(" + String(expr.value) + ")";
        case "String":
            return expr.value;
        case "EmptyTExpr":
            return "(null)";
            // Binding
        case "Symbol":
            return this.compile_binding(scope, expr.value);
            // Composed expression
        case "TExpr": {
            if (expr.symbol == "{") {
                if (expr.named.length != 0) throw "``begin'' expr does not accept named part";
                return this.compile_begin(scope, expr.ordered, 0);
            }
            var head = this.extract_expr(scope, expr.ordered[0]);
            if (head.expr.type == "Symbol") {
                switch (head.expr.value) {
                case "begin":
                    if (expr.named.length != 0) throw "``begin'' expr does not accept named part";
                    if (expr.ordered.length < 2) throw "expect one or more expression for ``begin'' expr";
                    return this.compile_begin(scope, expr.ordered, 1);
                case "if":
                    if (expr.named.length != 0) throw "``if'' expr does not accept named part";
                    if (expr.ordered.length != 4) throw "wrong number of node for ``if'' expr";
                    return this.compile_if(scope, expr.ordered[1], expr.ordered[2], expr.ordered[3]);
                case "lambda": {
                    if (expr.named.length != 0) throw "``lambda'' expr does not accept named part";
                    var name = null;
                    var extra_args = null;
                    var args_list = this.extract_expr(scope, expr.ordered[1]);
                    var body_start;
                    if (args_list.expr.type == "Symbol") {
                        name = args_list.expr.value;
                        if (expr.ordered.length < 4) throw "wrong number of nodes in ``lambda'' expression";
                        args_list = this.extract_expr(scope, expr.ordered[2]);
                        body_start = 3;
                    } else if (expr.ordered.length < 3) throw "wrong number of nodes in ``lambda'' expression"
                    else body_start = 2;
                    if (args_list.expr.type != "TExpr" && args_list.expr.type != "EmptyTExpr")
                        throw "Bad args list in ``lambda'' expression";
                    var args = [];
                    if (args_list.expr.type == "TExpr") {
                        for (var i = 0; i < args_list.expr.ordered.length; ++ i) {
                            var arg = this.extract_expr(args_list.scope, args_list.expr.ordered[i]);
                            if (arg.expr.type == "Symbol")
                                args.push(arg.expr.value);
                        }
                        for (var i = 0; i < args_list.expr.named.length; ++ i) {
                            var item = this.extract_expr(args_list.scope, args_list.expr.named[i]);
                            if (item.expr.type == "SymbolNamed" && item.expr.symbol == "extra") {
                                item = this.extract_expr(item.scope, item.expr.value);
                                if (item.expr.type == "Symbol")
                                    extra_args = item.expr.value;
                            }
                        }
                    }
                    return this.compile_lambda(scope, name, args, extra_args, expr.ordered, body_start);
                }
                case "set!": {
                    if (expr.named.length != 0) throw "``set!'' expression does not accept named part";
                    if (expr.ordered.length != 3) throw "wrong number of nodes in ``set!'' expression";
                    return this.compile_set(scope, expr.ordered[1], expr.ordered[2]);
                }
                default: break;
                }
            }
            return this.compile_apply(scope, expr.ordered, expr.named);
            break;
        }
        case "SymbolRef": {
            var base = this.extract_expr(scope, expr.base);
            if (base.expr.type == "Symbol" && base.expr.value == "lambda")
                return this.compile_lambda_binding(scope, expr.symbol);
            else return "(" + this.compile_eval(base.scope, base.expr) + "['" + expr.symbol + "'])";
        }
        case "ExprRef": {
            return "(" + this.compile_eval(scope, expr.base) + "[" +
                this.compile_eval(scope, expr.expr) + "])"
        }
        case "QuotedSymbol": {
            switch (expr.symbol) {
            case "'t":
                return "(true)";
            case "'f":
                return "(false)";
            default:
                return "(undefined)";
            }
            break;
        }
        case "QuotedExpr": {
            throw "QuotedExpr not supported yet";
        }
        default:
            throw "Cannot compile expr with type " + expr.type;
        }
    },

    compile_begin: function (scope, exprs, start) {
        var result = "(";
        for (var i = start; i < exprs.length; ++ i) {
            result += this.compile_eval(scope, exprs[i]);
            result += i == exprs.length - 1 ? ")" : ",";
        }
        return result;
    },

    compile_if: function (scope, cond_expr, then_expr, else_expr) {
        return "(" + 
            this.compile_eval(scope, cond_expr) + "?" + 
            this.compile_eval(scope, then_expr) + ":" + 
            this.compile_eval(scope, else_expr) + ")";
    },

    compile_lambda: function (scope, name, args, extra_args, exprs, start) {
        ++ this.scope_depth;
        var dict = {};
        var f_name = "f_" + this.scope_depth;
        var s_name = "s_" + this.scope_depth;
        var result;
        result = "(function " + f_name + "(args){var " + s_name +
            "=";
        result += extra_args != null ? ("{'" + extra_args + "':args};") : "{};";
        for (var i = 0; i < args.length; ++ i) {
            dict[args[i]] = 1;
            result += "if('" + args[i] + "' in args){" + s_name + "['" + 
                args[i] + "']=args['" + args[i] + "'];delete args['" + args[i] +
                "'];}else " + s_name + "['" + args[i] + "']=args['.ordered'][" + i + "];";
        }
        result += "delete args['.ordered'];args=" + s_name + ";"
        var n_scope = { depth: this.scope_depth, dict: dict, name: name, args: args, extra_args: extra_args, parent: scope };
        result += "return " + this.compile_begin(n_scope, exprs, start) + ";})";
        -- this.scope_depth;
        return result;
    },

    compile_apply: function (scope, ordered, named) {
        var result;
        var exprNamedArgs = [];
        var f = this.compile_eval(scope, ordered[0]);

        result = "{'.ordered':["
        for (var i = 1; i < ordered.length; ++ i) {
            if (i > 1) result += ",";
            result += this.compile_eval(scope, ordered[i]);
        }
        result += "]";
        for (var i = 0; i < named.length; ++ i) {
            var item = this.extract_expr(scope, named[i]);
            if (item.expr.type == "SymbolNamed")
                result += ", '" + item.expr.symbol + "':" + 
                this.compile_eval(item.scope, item.expr.value);
            else exprNamedArgs.push(item);
        }
        result += "}";
        if (exprNamedArgs.length > 0) {
            var g = "(function(a){";
            for (var i = 0; i < exprNamedArgs.length; ++ i) {
                g += "a[" + this.compile_eval(exprNamedArgs[i].scope, exprNamedArgs[i].expr.expr) + "]=" +
                    this.compile_eval(exprNamedArgs[i].scope, exprNamedArgs[i].expr.value) + ";";
            }
            g += "})";
            result = g + ".call(" + result + ")";
        }
        return "(" + f + "(" + result + "))";
    },

    compile_binding: function (scope, symbol) {
        var n = scope;
        while (n != null) {
            if (symbol in n.dict || symbol == n.extra_args) {
                return "(s_" + n.depth + "['" + symbol + "'])";
                break;
            }
            n = n.parent;
        }
        return "(g['" + symbol + "'])";
    },

    compile_lambda_binding: function (scope, symbol) {
        var n = scope;
        while (n != null) {
            if (symbol == n.name) {
                return "(f_" + n.depth + ")";
                break;
            }
            n = n.parent;
        }
        throw "Cannot find lambda binding in current scope";
    },

    compile_set: function (scope, ref, value) {
        ref = this.extract_expr(scope, ref);
        value = this.extract_expr(scope, value);
        if (ref.expr.type != "Symbol" && ref.expr.type != "SymbolRef" && ref.expr.type != "ExprRef")
            throw "Cannot set a non-reference";
        return "(" + this.compile_eval(ref.scope, ref.expr) + "=" + this.compile_eval(value.scope, value.expr) + ")";
    },
};
