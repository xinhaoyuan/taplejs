function compile2js(ast)
{
    var result;
    if (ast.type == "String") return ast.value
    else if (ast.type == "Integer") return "(" + String(ast.value) + ")";
    else if (ast.type == "RealNumber") return "(" + String(ast.value) + ")";
    else if (ast.type == "Quote") {
        if (ast.value == "'t") return "(true)";
        else if (ast.value == "'f") return "(false)";
        else return "(undefined)"; 
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
        var args_v = "__scope_" + ast.depth;
        var extra_unnamed_v = "__scope_eu_" + ast.depth;
        var extra_named_v = "__scope_en_" + ast.depth;
        result = "(function f" + ast.depth + "(args){var " + args_v +
            "=new Object();\n";
        for (var i = 0; i < ast.args.named.length; ++ i) {
            result += "if('" + ast.args.named[i] + "' in args){" + args_v + "['" + 
                ast.args.named[i] + "']=args['" + ast.args.named[i] + "'];delete args['" + ast.args.named[i] +
                "'];}else " + args_v + "['" + ast.args.named[i] + "']=args['.unnamed'][" + i + "];";
            result += "\n";
        }
        result += "if('.unnamed' in args)" + extra_unnamed_v + "=args['.unnamed'].slice(" + ast.args.named.length + ",args['.unnamed'].length);\n";
        result += "delete args['.unnamed'];" + extra_named_v + "=args;args=undefined;\n";
        result += "return " + compile2js(ast.body) + "})\n";
        return result;
    }
    else if (ast.type == "LiteralRef") {
        return "(__global['" + ast.name + "'])";
    }
    else if (ast.type == "LexicalRef") {
        return "(__scope_" + ast.index + "['" + ast.name + "'])";
    }
    else if (ast.type == "ExtraNamedRef") {
        return "(__scope_en_" + ast.index + ")";
    }
    else if (ast.type == "ExtraUnnamedRef") {
        return "(__scope_eu_" + ast.index + ")";
    }
    else if (ast.type == "ScopeRef") { 
        return "(__scope_" + ast.index + ")";
    }
    else if (ast.type == "LambdaRef") { 
        return "(f" + ast.index + ")"
    }
    else if (ast.type == "LookupRef") {
        return "(" + compile2js(ast.base) + "['" + ast.name + "'])"
    }
    else if (ast.type == "LookupExp") {
        return "(" + compile2js(ast.base) + "[" + compile2js(ast.ref) + "])";
    }
    else if (ast.type == "Error") {
        throw ast.msg;
    }
    else return "(undefined)";
}

if (typeof require != "undefined")
    taple_parser = require("./taple_parser");

function eval_taple_text(source, scope)
{
    return (new Function("with(this){ return" + compile2js(taple_parser.parse(source)) + "}")).call(scope)
}

// Runtime
function __wrap_js_func(argnames, func)
{
    return function(args) {
        var argv = args['.unnamed'];
        for (var i = 0; i < argnames.length; ++ i)
        {
            if (argnames[i] in args)
                argv[i] = args[argnames[i]]
        }
        return func.apply(null, argv);
    }
}

function import_module(name)
{
    name = String(name);
    if (!(name in modules)) return null;
    if (modules[name].loading) throw "recursive require";
    if (!modules[name].loaded) 
    {
        modules[name].loading = true;
        var scope = new Object();
        scope.__global = { require: __require }
        eval_taple_text(modules[name].source, scope);
        modules[name].exports = scope.__global.exports;
        modules[name].loaded = true;
        modules[name].loading = false;
    }
    return modules[name].exports;
}

__require = __wrap_js_func(["name"], import_module);

var modules = { }
var eval_scope = { __global: { require: __require }};
function eval_taple(source)
{
    return eval_taple_text(source, eval_scope);
}
