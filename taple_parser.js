/* parser generated by jison 0.4.2 */
var taple_parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Sep":3,"SEP":4,"ProgStart":5,"ProgEnd":6,"Prog":7,"UnamedExprSeq":8,"EOF":9,"Ref":10,"SYMBOL":11,"LAMBDA":12,".":13,"Expr":14,":":15,"SymbolSeq":16,"SymbolList":17,"LB0":18,"RB0":19,"LB1":20,"RB1":21,"LB2":22,"RB2":23,"ExtraNamedArg":24,"ExtraUnnamedArg":25,"ExtraArgs":26,"ArgsList":27,"NamedExprLabel":28,"NamedExprSeq":29,"SExprSeq":30,"SetSeq":31,"BeginSeq":32,"IfSeq":33,"LambdaSeq":34,"IF":35,"UnnamedLambdaDef":36,"NamedLambdaDef":37,"SET":38,"BEGIN":39,"Number":40,"ZERO":41,"HEXINT":42,"OCTINT":43,"DECINT":44,"REALNUMBER":45,"STRING":46,"QUOTE":47,"$accept":0,"$end":1},
terminals_: {2:"error",4:"SEP",9:"EOF",11:"SYMBOL",12:"LAMBDA",13:".",15:":",18:"LB0",19:"RB0",20:"LB1",21:"RB1",22:"LB2",23:"RB2",35:"IF",38:"SET",39:"BEGIN",41:"ZERO",42:"HEXINT",43:"OCTINT",44:"DECINT",45:"REALNUMBER",46:"STRING",47:"QUOTE"},
productions_: [0,[3,0],[3,1],[5,1],[6,1],[7,4],[10,1],[10,3],[10,3],[10,3],[16,1],[16,3],[17,2],[17,2],[17,2],[17,3],[17,3],[17,3],[24,3],[25,3],[26,1],[26,1],[26,3],[26,3],[27,2],[27,2],[27,2],[27,3],[27,3],[27,3],[27,3],[27,3],[27,3],[27,5],[27,5],[27,5],[8,1],[8,3],[28,3],[29,3],[29,5],[30,1],[30,3],[30,1],[30,1],[30,1],[30,1],[33,7],[36,3],[37,5],[34,3],[34,3],[31,5],[32,3],[40,1],[40,1],[40,1],[40,1],[40,1],[14,1],[14,1],[14,1],[14,1],[14,3],[14,3],[14,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 3: scopes = []; 
break;
case 5: 
                     this.$ = { type: 'Begin', exps: $$[$0-2] };
                     return this.$;
                   
break;
case 6: 
                     var idx = -1;
                     var depth = -1;
                     for (depth = scopes.length - 1; depth >= 0; -- depth)
                     {
                        var scope = scopes[depth];
                        idx = scope.named.indexOf($$[$0]);
                        if (idx == -1 &&
                            ($$[$0] == scope.name ||
                             $$[$0] == scope.extra.named ||
                             $$[$0] == scope.extra.unnamed)) break;
                        if (idx >= 0) break;
                     } 

                     if (idx >= 0) 
                        this.$ = { type: 'LexicalRef', name: $$[$0], offset: idx, index: depth };
                     else if (depth >= 0) {
                        if ($$[$0] == scope.extra.unnamed)
                           this.$ = { type: 'ExtraUnnamedRef', index: depth };
                        else if ($$[$0] == scope.extra.named)
                           this.$ = { type: 'ExtraNamedRef', index: depth };
                        else this.$ = { type: 'ScopeRef', name: $$[$0], index: depth };
                     }
                     else
                     {
                        this.$ = { type: 'LiteralRef', name: $$[$0] };
                     }
                   
break;
case 7:
                     var depth = -1;
                     for (depth = scopes.length - 1; depth >= 0; -- depth)
                     {
                        var scope = scopes[depth];
                        if ($$[$0] == scope.name) break;
                     }

                     if (depth >= 0) {
                          this.$ = { type: 'LambdaRef', name: $$[$0], index: depth };
                     }
                     else
                     {
                          this.$ = { type: 'Error', msg: 'Invalid lambda reference: ' + $$[$0] + '.' };
                     }
                   
break;
case 8: this.$ = { type: 'LookupRef', base: $$[$0-2], name: $$[$0] }; 
break;
case 9: this.$ = { type: 'LookupExp', base: $$[$0-2], ref: $$[$0] }; 
break;
case 10: this.$ = [ $$[$0] ]; 
break;
case 11: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 12: this.$ = []; 
break;
case 13: this.$ = []; 
break;
case 14: this.$ = []; 
break;
case 15: this.$ = $$[$0-1] 
break;
case 16: this.$ = $$[$0-1] 
break;
case 17: this.$ = $$[$0-1] 
break;
case 18: this.$ = $$[$0]; 
break;
case 19: this.$ = $$[$0]; 
break;
case 20: this.$ = { named: $$[$0] }; 
break;
case 21: this.$ = { unnamed: $$[$0] }; 
break;
case 22: this.$ = { unnamed: $$[$0-2], named: $$[$0] }; 
break;
case 23: this.$ = { unnamed: $$[$0], named: $$[$0-2] }; 
break;
case 24: this.$ = { named: [], extra: {} }; 
break;
case 25: this.$ = { named: [], extra: {} }; 
break;
case 26: this.$ = { named: [], extra: {} }; 
break;
case 27: this.$ = { named: $$[$0-1], extra: {} }; 
break;
case 28: this.$ = { named: $$[$0-1], extra: {} }; 
break;
case 29: this.$ = { named: $$[$0-1], extra: {} }; 
break;
case 30: this.$ = { named: [], extra: $$[$0-1] }; 
break;
case 31: this.$ = { named: [], extra: $$[$0-1] }; 
break;
case 32: this.$ = { named: [], extra: $$[$0-1] }; 
break;
case 33: this.$ = { named: $$[$0-3], extra: $$[$0-1] }; 
break;
case 34: this.$ = { named: $$[$0-3], extra: $$[$0-1] }; 
break;
case 35: this.$ = { named: $$[$0-3], extra: $$[$0-1] }; 
break;
case 36: this.$ = [ $$[$0] ]; 
break;
case 37: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 38: this.$ = $$[$0-1]; 
break;
case 39: this.$ = new Object(); this.$[$$[$0-2]] = $$[$0]; 
break;
case 40: this.$ = $$[$0-4]; $$[$0-4][$$[$0-2]] = $$[$0]; 
break;
case 41: this.$ = { type: 'Apply', seq: $$[$0] }; 
break;
case 42: this.$ = { type: 'Apply', seq: $$[$0-2], table: $$[$0]  }; 
break;
case 47: this.$ = { type: 'Branch', condition: $$[$0-4],
                            then_branch: $$[$0-2],
                            else_branch: $$[$0] }; 
break;
case 48:
                     scopes.push($$[$0]);
                     this.$ = $$[$0];
                   
break;
case 49:
                     $$[$0].name = $$[$0-2];
                     scopes.push($$[$0]); 
                     this.$ = $$[$0];
                   
break;
case 50: scopes.pop();
                     this.$ = { type: 'Lambda', 
                            depth: scopes.length,
                            args: $$[$0-2], body:
                            { type: 'Begin', exps: $$[$0] }
                            }; 
break;
case 51: scopes.pop();
                     this.$ = { type: 'Lambda', 
                            depth: scopes.length,
                            args: $$[$0-2], body:
                            { type: 'Begin', exps: $$[$0] }
                          }; 
break;
case 52:
                     if ($$[$0-2].type == 'LiteralRef')
                        this.$ = { type: 'LiteralSet', ref: $$[$0-2], value: $$[$0] };
                     else if ($$[$0-2].type == 'ExtraNamedRef' || $$[$0-2].type == 'ExtraUnnamedRef' || 
                              $$[$0-2].type == 'LexicalRef' || $$[$0-2].type == 'LookupRef')
                        this.$ = { type: 'Set', ref: $$[$0-2], value: $$[$0] };
                     else this.$ = { type: 'Error', msg: 'Cannot set the reference: ' + $$[$0-2].type + '.' };
                   
break;
case 53: this.$ = { type: 'Begin', exps: $$[$0] }; 
break;
case 54: this.$ = { type: 'Integer', value: 0 } 
break;
case 55: this.$ = { type: 'Integer', value: parseInt($$[$0],16) } 
break;
case 56: this.$ = { type: 'Integer', value: parseInt($$[$0],8) } 
break;
case 57: this.$ = { type: 'Integer', value: Number($$[$0]) } 
break;
case 58: this.$ = { type: 'RealNumber', value: Number($$[$0]) } 
break;
case 61: this.$ = { type: 'String', value: $$[$0] }; 
break;
case 62: this.$ = { type: 'Quote', value: $$[$0] }; 
break;
case 63: this.$ = $$[$0-1]; 
break;
case 64: this.$ = $$[$0-1]; 
break;
case 65: this.$ = $$[$0-1]; 
break;
}
},
table: [{3:3,4:[1,4],5:2,7:1,11:[2,1],12:[2,1],18:[2,1],20:[2,1],22:[2,1],41:[2,1],42:[2,1],43:[2,1],44:[2,1],45:[2,1],46:[2,1],47:[2,1]},{1:[3]},{8:5,10:7,11:[1,14],12:[1,15],14:6,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{11:[2,3],12:[2,3],18:[2,3],20:[2,3],22:[2,3],41:[2,3],42:[2,3],43:[2,3],44:[2,3],45:[2,3],46:[2,3],47:[2,3]},{11:[2,2],12:[2,2],18:[2,2],20:[2,2],22:[2,2],41:[2,2],42:[2,2],43:[2,2],44:[2,2],45:[2,2],46:[2,2],47:[2,2]},{3:23,4:[1,22],6:21,9:[2,1]},{4:[2,36],9:[2,36],13:[1,24],15:[1,25],19:[2,36],21:[2,36],23:[2,36]},{4:[2,59],9:[2,59],13:[2,59],15:[2,59],19:[2,59],21:[2,59],23:[2,59]},{4:[2,60],9:[2,60],13:[2,60],15:[2,60],19:[2,60],21:[2,60],23:[2,60]},{4:[2,61],9:[2,61],13:[2,61],15:[2,61],19:[2,61],21:[2,61],23:[2,61]},{4:[2,62],9:[2,62],13:[2,62],15:[2,62],19:[2,62],21:[2,62],23:[2,62]},{8:27,10:7,11:[1,14],12:[1,37],14:6,18:[1,11],20:[1,12],22:[1,13],30:26,31:28,32:29,33:30,34:31,35:[1,34],36:35,37:36,38:[1,32],39:[1,33],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{8:27,10:7,11:[1,14],12:[1,37],14:6,18:[1,11],20:[1,12],22:[1,13],30:38,31:28,32:29,33:30,34:31,35:[1,34],36:35,37:36,38:[1,32],39:[1,33],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{8:27,10:7,11:[1,14],12:[1,37],14:6,18:[1,11],20:[1,12],22:[1,13],30:39,31:28,32:29,33:30,34:31,35:[1,34],36:35,37:36,38:[1,32],39:[1,33],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{4:[2,6],9:[2,6],13:[2,6],15:[2,6],19:[2,6],21:[2,6],23:[2,6]},{13:[1,40]},{4:[2,54],9:[2,54],13:[2,54],15:[2,54],19:[2,54],21:[2,54],23:[2,54]},{4:[2,55],9:[2,55],13:[2,55],15:[2,55],19:[2,55],21:[2,55],23:[2,55]},{4:[2,56],9:[2,56],13:[2,56],15:[2,56],19:[2,56],21:[2,56],23:[2,56]},{4:[2,57],9:[2,57],13:[2,57],15:[2,57],19:[2,57],21:[2,57],23:[2,57]},{4:[2,58],9:[2,58],13:[2,58],15:[2,58],19:[2,58],21:[2,58],23:[2,58]},{9:[1,41]},{9:[2,2],10:7,11:[1,14],12:[1,15],14:42,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{9:[2,4]},{11:[1,43]},{10:7,11:[1,14],12:[1,15],14:44,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{19:[1,45]},{4:[1,46],19:[2,41],21:[2,41],23:[2,41]},{19:[2,43],21:[2,43],23:[2,43]},{19:[2,44],21:[2,44],23:[2,44]},{19:[2,45],21:[2,45],23:[2,45]},{19:[2,46],21:[2,46],23:[2,46]},{4:[1,47]},{4:[1,48]},{4:[1,49]},{4:[1,50]},{4:[1,51]},{4:[1,52],13:[1,40]},{21:[1,53]},{23:[1,54]},{11:[1,55]},{1:[2,5]},{4:[2,37],9:[2,37],13:[1,24],15:[1,25],19:[2,37],21:[2,37],23:[2,37]},{4:[2,8],9:[2,8],13:[2,8],15:[2,8],19:[2,8],21:[2,8],23:[2,8]},{4:[2,9],9:[2,9],13:[2,9],15:[2,9],19:[2,9],21:[2,9],23:[2,9]},{4:[2,63],9:[2,63],13:[2,63],15:[2,63],19:[2,63],21:[2,63],23:[2,63]},{10:7,11:[1,14],12:[1,15],13:[1,58],14:42,18:[1,11],20:[1,12],22:[1,13],28:57,29:56,40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{10:59,11:[1,14],12:[1,15],14:60,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{8:61,10:7,11:[1,14],12:[1,15],14:6,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{10:7,11:[1,14],12:[1,15],14:62,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{8:63,10:7,11:[1,14],12:[1,15],14:6,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{8:64,10:7,11:[1,14],12:[1,15],14:6,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{11:[1,66],18:[1,67],20:[1,68],22:[1,69],27:65},{4:[2,64],9:[2,64],13:[2,64],15:[2,64],19:[2,64],21:[2,64],23:[2,64]},{4:[2,65],9:[2,65],13:[2,65],15:[2,65],19:[2,65],21:[2,65],23:[2,65]},{4:[2,7],9:[2,7],13:[2,7],15:[2,7],19:[2,7],21:[2,7],23:[2,7]},{4:[1,70],19:[2,42],21:[2,42],23:[2,42]},{4:[1,71]},{11:[1,72]},{4:[1,73],13:[2,59],15:[2,59]},{13:[1,24],15:[1,25]},{4:[1,74],19:[2,53],21:[2,53],23:[2,53]},{4:[1,75],13:[1,24],15:[1,25]},{4:[1,74],19:[2,50],21:[2,50],23:[2,50]},{4:[1,74],19:[2,51],21:[2,51],23:[2,51]},{4:[2,48]},{4:[1,76]},{11:[1,80],13:[1,84],15:[1,83],16:78,19:[1,77],24:81,25:82,26:79},{11:[1,80],13:[1,84],15:[1,83],16:86,21:[1,85],24:81,25:82,26:87},{11:[1,80],13:[1,84],15:[1,83],16:89,23:[1,88],24:81,25:82,26:90},{13:[1,58],28:91},{10:7,11:[1,14],12:[1,15],14:92,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{15:[1,93]},{10:7,11:[1,14],12:[1,15],14:94,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{10:7,11:[1,14],12:[1,15],14:42,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{10:7,11:[1,14],12:[1,15],14:95,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{18:[1,67],20:[1,68],22:[1,69],27:96},{4:[2,24]},{4:[1,98],19:[1,97]},{19:[1,99]},{4:[2,10],19:[2,10],21:[2,10],23:[2,10]},{4:[1,100],19:[2,20],21:[2,20],23:[2,20]},{4:[1,101],19:[2,21],21:[2,21],23:[2,21]},{4:[1,102]},{4:[1,103]},{4:[2,25]},{4:[1,105],21:[1,104]},{21:[1,106]},{4:[2,26]},{4:[1,108],23:[1,107]},{23:[1,109]},{4:[1,110]},{4:[2,39],13:[1,24],15:[1,25],19:[2,39],21:[2,39],23:[2,39]},{4:[2,38]},{13:[1,24],15:[1,25],19:[2,52],21:[2,52],23:[2,52]},{4:[1,111],13:[1,24],15:[1,25]},{4:[2,49]},{4:[2,27]},{11:[1,113],13:[1,84],15:[1,83],24:81,25:82,26:112},{4:[2,30]},{13:[1,84],25:114},{15:[1,83],24:115},{11:[1,116]},{11:[1,117]},{4:[2,28]},{11:[1,113],13:[1,84],15:[1,83],24:81,25:82,26:118},{4:[2,31]},{4:[2,29]},{11:[1,113],13:[1,84],15:[1,83],24:81,25:82,26:119},{4:[2,32]},{10:7,11:[1,14],12:[1,15],14:120,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{10:7,11:[1,14],12:[1,15],14:121,18:[1,11],20:[1,12],22:[1,13],40:8,41:[1,16],42:[1,17],43:[1,18],44:[1,19],45:[1,20],46:[1,9],47:[1,10]},{19:[1,122]},{4:[2,11],19:[2,11],21:[2,11],23:[2,11]},{19:[2,23],21:[2,23],23:[2,23]},{19:[2,22],21:[2,22],23:[2,22]},{4:[2,18],19:[2,18],21:[2,18],23:[2,18]},{4:[2,19],19:[2,19],21:[2,19],23:[2,19]},{21:[1,123]},{23:[1,124]},{4:[2,40],13:[1,24],15:[1,25],19:[2,40],21:[2,40],23:[2,40]},{13:[1,24],15:[1,25],19:[2,47],21:[2,47],23:[2,47]},{4:[2,33]},{4:[2,34]},{4:[2,35]}],
defaultActions: {23:[2,4],41:[2,5],65:[2,48],77:[2,24],85:[2,25],88:[2,26],93:[2,38],96:[2,49],97:[2,27],99:[2,30],104:[2,28],106:[2,31],107:[2,29],109:[2,32],122:[2,33],123:[2,34],124:[2,35]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* generated by jison-lex 0.1.0 */
var lexer = (function(){
var lexer = {
EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: /* comment */ 
break;
case 1: return 38; 
break;
case 2: return 12; 
break;
case 3: return 35; 
break;
case 4: return 39; 
break;
case 5: return 42; 
break;
case 6: return 43; 
break;
case 7: return 41; 
break;
case 8: return 45; 
break;
case 9: return 44; 
break;
case 10: return 11; 
break;
case 11: return 46; 
break;
case 12: return 47; 
break;
case 13: return 15; 
break;
case 14: return 13; 
break;
case 15: return 18; 
break;
case 16: return 19; 
break;
case 17: return 20; 
break;
case 18: return 21; 
break;
case 19: return 22; 
break;
case 20: return 23; 
break;
case 21: return 4; 
break;
case 22: return 9; 
break;
}
},
rules: [/^(?:[\s]*;[^\n]*)/,/^(?:set!)/,/^(?:lambda\b)/,/^(?:if\b)/,/^(?:begin\b)/,/^(?:0x[0-9a-fA-F]+)/,/^(?:0[0-7]*)/,/^(?:[+\-]0+)/,/^(?:[+\-]?[0-9]*\.[0-9]+)/,/^(?:[+\-]?[1-9][0-9]*)/,/^(?:([a-zA-Z!@#$%\^&*_\-+=<>/?\|])([a-zA-Z0-9!@#$%\^&*_\-+=<>/?\|])*)/,/^(?:"([^\\\"]|\\.)*")/,/^(?:'([a-zA-Z0-9!@#$%\^&*_\-+=<>/?\|])+)/,/^(?::)/,/^(?:\.)/,/^(?:\([\s]*)/,/^(?:[\s]*\))/,/^(?:\[[\s]*)/,/^(?:[\s]*\])/,/^(?:\{[\s]*)/,/^(?:[\s]*\})/,/^(?:[\s\n]+)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = taple_parser;
exports.Parser = taple_parser.Parser;
exports.parse = function () { return taple_parser.parse.apply(taple_parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}