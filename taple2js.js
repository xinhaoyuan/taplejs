function compile2js(ast)
{
    var result;
    if (ast.type == "String") return ast.value
    else if (ast.type == "Integer") return String(ast.value);
    else if (ast.type == "RealNumber") return String(ast.value);
    else if (ast.type == "Quote") {
        if (ast.value == "'t") return true;
        else if (ast.value == "'f") return false;
        else return undefined; 
    }
    else if (ast.type == "Begin") {
        result = "(";
        for (var i = 0; i < ast.exps.length; ++ i) {
            if (i > 0) result += ","
            result += compile2js(ast.exps[i]);
        }
        result += ")"
        return result;
    }
    else if (ast.type == "Branch") {
        return "(" + compile2js(ast.condition) + "?" +
            compile2js(ast.then_branch) + ":" +
            compile2js(ast.else_branch) + ")"
    }
    else if (ast.type == "Set") {
        return "(" + compile2js(ast.ref) + "=" + compile2js(ast.value) + ")";
    }
    else if (ast.type == "LiteralSet") {
        return "(" + compile2js(ast.ref) + "=" + compile2js(ast.value) + ")";
    }
    else if (ast.type == "Apply") {
        result = "(" + compile2js(ast.seq[0]) + "({'.unnamed':["
        for (var i = 1; i < ast.seq.length; ++ i) {
            if (i > 1) result += ",";
            result += compile2js(ast.seq[i]);
        }
        result += "]";
        if ("table" in ast) {
            for (var i in ast.table) {
                result += ", '" + i + "':" + compile2js(ast.table[i]);
            }
        }
        result += "}))";
        return result;
    }
    else if (ast.type == "Lambda") {
        result = "(function(args){var __scope_" + ast.depth +
            "=args;";
        for (var i = 0; i < ast.args.length; ++ i) {
            result += "if(!('" + ast.args[i] + "' in args))args['" + 
                ast.args[i] + "']=args['.unnamed'][" + i + "];";
        }
        result += "delete args['.unnamed'];"
        result += "return " + compile2js(ast.body)
            + "})"
        return result;
    }
    else if (ast.type == "LiteralRef") {
        return "(__global['" + ast.name + "'])";
    }
    else if (ast.type == "LexicalRef") {
        return "(args['" + ast.name + "'])";
    }
    else if (ast.type == "ScopeRef") { 
        return "(__scope_" + ast.index + ")";
    }
    else if (ast.type == "LookupRef") {
        return "(" + compile2js(ast.base) + "[\"" + ast.name + "\"])"
    }
    else return "(undefined)";
}

function eval_taple(source)
{
    var ast = taple_parser.parse(source);
    var result = compile2js(ast);
    if (typeof __global == "undefined") __global = {};
    return eval(result);
}
