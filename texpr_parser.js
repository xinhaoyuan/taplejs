/* parser generated by jison 0.4.2 */
var texpr_parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"ExprString":3,"MultiExprSeq":4,"EOF":5,"OrderedExprSeq":6,"LValue":7,"SYMBOL":8,"Expr":9,".":10,"TExpr":11,"NamedExpr":12,":":13,"NamedExprSeq":14,"ExprSeq":15,",":16,"InsideTExpr":17,"LB0":18,"RB0":19,"LB1":20,"RB1":21,"LB2":22,"RB2":23,"Number":24,"ZERO":25,"HEXINT":26,"OCTINT":27,"DECINT":28,"REALNUMBER":29,"QValue":30,"STRING":31,"QUOTED_SYMBOL":32,"QUOTE":33,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"SYMBOL",10:".",13:":",16:",",18:"LB0",19:"RB0",20:"LB1",21:"RB1",22:"LB2",23:"RB2",25:"ZERO",26:"HEXINT",27:"OCTINT",28:"DECINT",29:"REALNUMBER",31:"STRING",32:"QUOTED_SYMBOL",33:"QUOTE"},
productions_: [0,[3,2],[3,2],[7,1],[7,3],[7,3],[6,1],[6,2],[12,3],[12,3],[14,1],[14,2],[15,0],[15,1],[15,2],[15,1],[4,3],[4,3],[17,1],[17,1],[11,3],[11,3],[11,3],[24,1],[24,1],[24,1],[24,1],[24,1],[30,1],[30,1],[30,1],[30,1],[30,2],[9,1],[9,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: this.$ = $$[$0-1].exprs; console.log(this.$); return this.$;
break;
case 2: this.$ = $$[$0-1]; console.log(this.$); return this.$; 
break;
case 3: this.$ = { type: 'Symbol', value: $$[$0] }; 
break;
case 4: this.$ = { type: 'SymbolRef', base: $$[$0-2], symbol: $$[$0] }; 
break;
case 5: this.$ = { type: 'ExprRef', base: $$[$0-2], expr: $$[$0] }; 
break;
case 6: this.$ = [ $$[$0] ]; 
break;
case 7: this.$.push($$[$0]); 
break;
case 8: this.$ = { type: 'SymbolNamed', symbol: $$[$0-2], value: $$[$0] }; 
break;
case 9: this.$ = { type: 'ExprNamed', expr: $$[$0-2], value: $$[$0] }; 
break;
case 10: this.$ = [ $$[$0] ]; 
break;
case 11: this.$.push($$[$0]); 
break;
case 12: this.$ = { type: 'EmptyExprSeq' }; 
break;
case 13: this.$ = { type: 'ExprSeq', ordered: $$[$0], named: [] }; 
break;
case 14: this.$ = { type: 'ExprSeq', ordered: $$[$0-1], named: $$[$0] }; 
break;
case 15: this.$ = { type: 'ExprSeq', ordered: [], named: $$[$0] }; 
break;
case 16: this.$ = { type: 'MultiExprSeq', exprs: [$$[$0-2], $$[$0]] } 
break;
case 17:
                     $$[$0-2].exprs.push($$[$0]);
                     this.$ = $$[$0-2];
                   
break;
case 18: this.$ = $$[$0]; this.$.type = this.$.type == 'EmptyExprSeq' ? 'EmptyTExpr' : 'TExpr'; 
break;
case 19: this.$ = $$[$0]; this.$.type = 'MultiTExpr'; 
break;
case 20: this.$ = $$[$0-1]; this.$.symbol = $$[$0-2]; 
break;
case 21: this.$ = $$[$0-1]; this.$.symbol = $$[$0-2]; 
break;
case 22: this.$ = $$[$0-1]; this.$.symbol = $$[$0-2]; 
break;
case 23: this.$ = { type: 'Integer', value: 0 } 
break;
case 24: this.$ = { type: 'Integer', value: parseInt($$[$0],16) } 
break;
case 25: this.$ = { type: 'Integer', value: parseInt($$[$0],8) } 
break;
case 26: this.$ = { type: 'Integer', value: Number($$[$0]) } 
break;
case 27: this.$ = { type: 'RealNumber', value: Number($$[$0]) } 
break;
case 29: this.$ = { type: 'String', value: $$[$0] }; 
break;
case 31: this.$ = { type: 'QuotedSymbol', symbol: $$[$0] }; 
break;
case 32: this.$ = { type: 'QuotedExpr', expr: $$[$0] }; 
break;
}
},
table: [{3:1,4:2,6:3,7:7,8:[1,10],9:5,11:13,12:9,14:6,15:4,16:[2,12],18:[1,21],20:[1,22],22:[1,23],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{1:[3]},{5:[1,24],16:[1,25]},{5:[1,26],7:7,8:[1,10],9:27,11:13,12:9,14:28,16:[2,13],18:[1,21],20:[1,22],22:[1,23],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{16:[1,29]},{5:[2,6],8:[2,6],10:[1,30],16:[2,6],18:[2,6],19:[2,6],20:[2,6],21:[2,6],22:[2,6],23:[2,6],25:[2,6],26:[2,6],27:[2,6],28:[2,6],29:[2,6],31:[2,6],32:[2,6],33:[2,6]},{5:[2,15],8:[1,32],11:33,12:31,16:[2,15],18:[1,21],19:[2,15],20:[1,22],21:[2,15],22:[1,23],23:[2,15]},{5:[2,33],8:[2,33],10:[2,33],16:[2,33],18:[2,33],19:[2,33],20:[2,33],21:[2,33],22:[2,33],23:[2,33],25:[2,33],26:[2,33],27:[2,33],28:[2,33],29:[2,33],31:[2,33],32:[2,33],33:[2,33]},{5:[2,34],8:[2,34],10:[2,34],16:[2,34],18:[2,34],19:[2,34],20:[2,34],21:[2,34],22:[2,34],23:[2,34],25:[2,34],26:[2,34],27:[2,34],28:[2,34],29:[2,34],31:[2,34],32:[2,34],33:[2,34]},{5:[2,10],8:[2,10],16:[2,10],18:[2,10],19:[2,10],20:[2,10],21:[2,10],22:[2,10],23:[2,10]},{5:[2,3],8:[2,3],10:[2,3],13:[1,34],16:[2,3],18:[2,3],19:[2,3],20:[2,3],21:[2,3],22:[2,3],23:[2,3],25:[2,3],26:[2,3],27:[2,3],28:[2,3],29:[2,3],31:[2,3],32:[2,3],33:[2,3]},{5:[2,28],8:[2,28],10:[2,28],16:[2,28],18:[2,28],19:[2,28],20:[2,28],21:[2,28],22:[2,28],23:[2,28],25:[2,28],26:[2,28],27:[2,28],28:[2,28],29:[2,28],31:[2,28],32:[2,28],33:[2,28]},{5:[2,29],8:[2,29],10:[2,29],16:[2,29],18:[2,29],19:[2,29],20:[2,29],21:[2,29],22:[2,29],23:[2,29],25:[2,29],26:[2,29],27:[2,29],28:[2,29],29:[2,29],31:[2,29],32:[2,29],33:[2,29]},{5:[2,30],8:[2,30],10:[2,30],13:[1,35],16:[2,30],18:[2,30],19:[2,30],20:[2,30],21:[2,30],22:[2,30],23:[2,30],25:[2,30],26:[2,30],27:[2,30],28:[2,30],29:[2,30],31:[2,30],32:[2,30],33:[2,30]},{5:[2,31],8:[2,31],10:[2,31],16:[2,31],18:[2,31],19:[2,31],20:[2,31],21:[2,31],22:[2,31],23:[2,31],25:[2,31],26:[2,31],27:[2,31],28:[2,31],29:[2,31],31:[2,31],32:[2,31],33:[2,31]},{11:37,18:[1,21],20:[1,22],22:[1,23],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:36,31:[1,12],32:[1,14],33:[1,15]},{5:[2,23],8:[2,23],10:[2,23],16:[2,23],18:[2,23],19:[2,23],20:[2,23],21:[2,23],22:[2,23],23:[2,23],25:[2,23],26:[2,23],27:[2,23],28:[2,23],29:[2,23],31:[2,23],32:[2,23],33:[2,23]},{5:[2,24],8:[2,24],10:[2,24],16:[2,24],18:[2,24],19:[2,24],20:[2,24],21:[2,24],22:[2,24],23:[2,24],25:[2,24],26:[2,24],27:[2,24],28:[2,24],29:[2,24],31:[2,24],32:[2,24],33:[2,24]},{5:[2,25],8:[2,25],10:[2,25],16:[2,25],18:[2,25],19:[2,25],20:[2,25],21:[2,25],22:[2,25],23:[2,25],25:[2,25],26:[2,25],27:[2,25],28:[2,25],29:[2,25],31:[2,25],32:[2,25],33:[2,25]},{5:[2,26],8:[2,26],10:[2,26],16:[2,26],18:[2,26],19:[2,26],20:[2,26],21:[2,26],22:[2,26],23:[2,26],25:[2,26],26:[2,26],27:[2,26],28:[2,26],29:[2,26],31:[2,26],32:[2,26],33:[2,26]},{5:[2,27],8:[2,27],10:[2,27],16:[2,27],18:[2,27],19:[2,27],20:[2,27],21:[2,27],22:[2,27],23:[2,27],25:[2,27],26:[2,27],27:[2,27],28:[2,27],29:[2,27],31:[2,27],32:[2,27],33:[2,27]},{4:40,6:41,7:7,8:[1,10],9:5,11:13,12:9,14:6,15:39,16:[2,12],17:38,18:[1,21],19:[2,12],20:[1,22],22:[1,23],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{4:40,6:41,7:7,8:[1,10],9:5,11:13,12:9,14:6,15:39,16:[2,12],17:42,18:[1,21],20:[1,22],21:[2,12],22:[1,23],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{4:40,6:41,7:7,8:[1,10],9:5,11:13,12:9,14:6,15:39,16:[2,12],17:43,18:[1,21],20:[1,22],22:[1,23],23:[2,12],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{1:[2,1]},{5:[2,12],6:41,7:7,8:[1,10],9:5,11:13,12:9,14:6,15:44,16:[2,12],18:[1,21],19:[2,12],20:[1,22],21:[2,12],22:[1,23],23:[2,12],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{1:[2,2]},{5:[2,7],8:[2,7],10:[1,30],16:[2,7],18:[2,7],19:[2,7],20:[2,7],21:[2,7],22:[2,7],23:[2,7],25:[2,7],26:[2,7],27:[2,7],28:[2,7],29:[2,7],31:[2,7],32:[2,7],33:[2,7]},{5:[2,14],8:[1,32],11:33,12:31,16:[2,14],18:[1,21],19:[2,14],20:[1,22],21:[2,14],22:[1,23],23:[2,14]},{5:[2,12],6:41,7:7,8:[1,10],9:5,11:13,12:9,14:6,15:45,16:[2,12],18:[1,21],19:[2,12],20:[1,22],21:[2,12],22:[1,23],23:[2,12],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{8:[1,46],11:47,18:[1,21],20:[1,22],22:[1,23]},{5:[2,11],8:[2,11],16:[2,11],18:[2,11],19:[2,11],20:[2,11],21:[2,11],22:[2,11],23:[2,11]},{13:[1,34]},{13:[1,35]},{7:7,8:[1,49],9:48,11:37,18:[1,21],20:[1,22],22:[1,23],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{7:7,8:[1,49],9:50,11:37,18:[1,21],20:[1,22],22:[1,23],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{5:[2,32],8:[2,32],10:[2,32],16:[2,32],18:[2,32],19:[2,32],20:[2,32],21:[2,32],22:[2,32],23:[2,32],25:[2,32],26:[2,32],27:[2,32],28:[2,32],29:[2,32],31:[2,32],32:[2,32],33:[2,32]},{5:[2,30],8:[2,30],10:[2,30],16:[2,30],18:[2,30],19:[2,30],20:[2,30],21:[2,30],22:[2,30],23:[2,30],25:[2,30],26:[2,30],27:[2,30],28:[2,30],29:[2,30],31:[2,30],32:[2,30],33:[2,30]},{19:[1,51]},{16:[1,29],19:[2,18],21:[2,18],23:[2,18]},{16:[1,25],19:[2,19],21:[2,19],23:[2,19]},{5:[2,13],7:7,8:[1,10],9:27,11:13,12:9,14:28,16:[2,13],18:[1,21],19:[2,13],20:[1,22],21:[2,13],22:[1,23],23:[2,13],24:11,25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:8,31:[1,12],32:[1,14],33:[1,15]},{21:[1,52]},{23:[1,53]},{5:[2,17],16:[2,17],19:[2,17],21:[2,17],23:[2,17]},{5:[2,16],16:[2,16],19:[2,16],21:[2,16],23:[2,16]},{5:[2,4],8:[2,4],10:[2,4],16:[2,4],18:[2,4],19:[2,4],20:[2,4],21:[2,4],22:[2,4],23:[2,4],25:[2,4],26:[2,4],27:[2,4],28:[2,4],29:[2,4],31:[2,4],32:[2,4],33:[2,4]},{5:[2,5],8:[2,5],10:[2,5],16:[2,5],18:[2,5],19:[2,5],20:[2,5],21:[2,5],22:[2,5],23:[2,5],25:[2,5],26:[2,5],27:[2,5],28:[2,5],29:[2,5],31:[2,5],32:[2,5],33:[2,5]},{5:[2,8],8:[2,8],10:[1,30],16:[2,8],18:[2,8],19:[2,8],20:[2,8],21:[2,8],22:[2,8],23:[2,8]},{5:[2,3],8:[2,3],10:[2,3],16:[2,3],18:[2,3],19:[2,3],20:[2,3],21:[2,3],22:[2,3],23:[2,3]},{5:[2,9],8:[2,9],10:[1,30],16:[2,9],18:[2,9],19:[2,9],20:[2,9],21:[2,9],22:[2,9],23:[2,9]},{5:[2,20],8:[2,20],10:[2,20],13:[2,20],16:[2,20],18:[2,20],19:[2,20],20:[2,20],21:[2,20],22:[2,20],23:[2,20],25:[2,20],26:[2,20],27:[2,20],28:[2,20],29:[2,20],31:[2,20],32:[2,20],33:[2,20]},{5:[2,21],8:[2,21],10:[2,21],13:[2,21],16:[2,21],18:[2,21],19:[2,21],20:[2,21],21:[2,21],22:[2,21],23:[2,21],25:[2,21],26:[2,21],27:[2,21],28:[2,21],29:[2,21],31:[2,21],32:[2,21],33:[2,21]},{5:[2,22],8:[2,22],10:[2,22],13:[2,22],16:[2,22],18:[2,22],19:[2,22],20:[2,22],21:[2,22],22:[2,22],23:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[2,22],29:[2,22],31:[2,22],32:[2,22],33:[2,22]}],
defaultActions: {24:[2,1],26:[2,2]},
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
case 0: return 29; 
break;
case 1: return 26; 
break;
case 2: return 27; 
break;
case 3: return 28; 
break;
case 4: return 25; 
break;
case 5: return 8; 
break;
case 6: return 31; 
break;
case 7: return 32; 
break;
case 8: return 33; 
break;
case 9: return 13; 
break;
case 10: return 10; 
break;
case 11: return 16; 
break;
case 12: /* IGNORED */ 
break;
case 13: return 18; 
break;
case 14: return 19; 
break;
case 15: return 20; 
break;
case 16: return 21; 
break;
case 17: return 22; 
break;
case 18: return 23; 
break;
case 19: return 5; 
break;
}
},
rules: [/^(?:[+\-]?[0-9]*\.[0-9]+)/,/^(?:0x[0-9a-fA-F]+)/,/^(?:0[0-7]*)/,/^(?:[+\-]?[1-9][0-9]*)/,/^(?:[+\-]0+)/,/^(?:([a-zA-Z!@#$%\^&*_\-+=<>/?\|])([a-zA-Z0-9!@#$%\^&*_\-+=<>/?\|])*)/,/^(?:"([^\\\"]|\\.)*")/,/^(?:'([a-zA-Z0-9!@#$%\^&*_\-+=<>/?\|])+)/,/^(?:')/,/^(?::)/,/^(?:\.)/,/^(?:,)/,/^(?:([\s]|;[^\n]*)+)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = texpr_parser;
exports.Parser = texpr_parser.Parser;
exports.parse = function () { return texpr_parser.parse.apply(texpr_parser, arguments); };
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