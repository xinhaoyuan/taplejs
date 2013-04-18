function TapleRT() {
    this.modules = {};
}

TapleRT.prototype = {
    eval_taple_source: function (source, scope) {
        comp = new Compiler();
        var js = comp.compile_eval_string(source);
        var f = new Function("with(this){return" + js + "}");
        return f.call(scope);
    },

    wrap_js_func: function (argnames, func) {
        return function(args) {
            var argv = args['.ordered'];
            for (var i = 0; i < argnames.length; ++ i)
            {
                if (argnames[i] in args)
                    argv[i] = args[argnames[i]]
            }
            return func.apply(null, argv);
        }
    },

    import_module: function (name) {
        name = String(name);
        if (!(name in this.modules)) return null;
        if (this.modules[name].loading) throw "recursive require";
        if (!this.modules[name].loaded) 
        {
            this.modules[name].loading = true;
            var scope = {g:{require: function(args) {
                var name = "name" in args ? args[name] : args[".ordered"][0];
                return rt.import_module(name);
            }}};
            eval_taple_text(this.modules[name].source, scope);
            this.modules[name].exports = scope.__global.exports;
            this.modules[name].loaded = true;
            this.modules[name].loading = false;
        }
        return this.modules[name].exports;
    },

    scope: {g:{require: function(args) {
        var name = "name" in args ? args[name] : args[".ordered"][0];
        return rt.import_module(name);
    }}},

    eval: function (source) {
        var rt = this;
        return this.eval_taple_source(source, this.scope);
    }
}

var rt = new TapleRT();

rt.modules["io"] = { loaded: true,
                     exports: {
                         println: rt.wrap_js_func(["line"], function(ln){
                             $("#taple_console").prepend($("<pre/>").text(String(ln)));
                         })
                     }
                   };

rt.modules["math"] = { loaded: true,
                       exports: {
                           "<": rt.wrap_js_func([], function(a,b){return a<b;}),
                           "=": rt.wrap_js_func([], function(a,b){return a==b;}),
                           ">": rt.wrap_js_func([], function(a,b){return a>b;}),
                           "-": rt.wrap_js_func([], function(a,b){return a-b;}),
                       }
                     };
