%lex

SYMSTART                   [a-zA-Z!@#$%\^&*_\-+=<>/?\|]
SYMCHARS                   [a-zA-Z0-9!@#$%\^&*_\-+=<>/?\|]

%%

[+\-]?[0-9]*"."[0-9]+      { return 'REALNUMBER'; }
"0x"[0-9a-fA-F]+           { return 'HEXINT'; }
"0"[0-7]*                  { return 'OCTINT'; }
[+\-]?[1-9][0-9]*          { return 'DECINT'; }
[+\-]"0"+                  { return 'ZERO'; }
{SYMSTART}{SYMCHARS}*      { return 'SYMBOL'; }
"\""([^\\\"]|\\.)*"\""     { return 'STRING'; }
"'"{SYMCHARS}+             { return 'QUOTED_SYMBOL'; }
"'"                        { return 'QUOTE'; }
":"                        { return ':'; }
"."                        { return '.'; }
","                        { return ','; }
([\s]|";"[^\n]*)+          { /* IGNORED */ }
"("                        { return 'LB0'; }
")"                        { return 'RB0'; }
"["                        { return 'LB1'; }
"]"                        { return 'RB1'; }
"{"                        { return 'LB2'; }
"}"                        { return 'RB2'; }
<<EOF>>                    { return 'EOF'; }

/lex

%left '(' ')'
%left '.' ','
%right ':'

%start ExprString
%%

ExprString       : MultiExprSeq EOF
                   { $$ = $1.exprs; console.log($$); return $$;}
                 | OrderedExprSeq EOF
                   { $$ = $1; console.log($$); return $$; }
                 ;

LValue           : SYMBOL
                   { $$ = { type: 'Symbol', value: $1 }; }
                 | Expr '.' SYMBOL
                   { $$ = { type: 'SymbolRef', base: $1, symbol: $3 }; }
                 | Expr '.' TExpr
                   { $$ = { type: 'ExprRef', base: $1, expr: $3 }; }
                 ;

OrderedExprSeq   : Expr
                   { $$ = [ $1 ]; }
                 | OrderedExprSeq Expr
                   { $$.push($2); }
                 ;

NamedExpr        : SYMBOL ':' Expr
                   { $$ = { type: 'SymbolNamed', symbol: $1, value: $3 }; }
                 | TExpr  ':' Expr
                   { $$ = { type: 'ExprNamed', expr: $1, value: $3 }; }
                 ;

NamedExprSeq     : NamedExpr
                   { $$ = [ $1 ]; } 
                 | NamedExprSeq NamedExpr
                   { $$.push($2); }
                 ;

ExprSeq          : { $$ = { type: 'EmptyExprSeq' }; }
                 | OrderedExprSeq
                   { $$ = { type: 'ExprSeq', ordered: $1, named: [] }; }
                 | OrderedExprSeq NamedExprSeq
                   { $$ = { type: 'ExprSeq', ordered: $1, named: $2 }; }
                 | NamedExprSeq
                   { $$ = { type: 'ExprSeq', ordered: [], named: $1 }; }
                 ;

MultiExprSeq     : ExprSeq ',' ExprSeq
                   { $$ = { type: 'MultiExprSeq', exprs: [$1, $3] } }
                 | MultiExprSeq ',' ExprSeq
                   {
                     $1.exprs.push($3);
                     $$ = $1;
                   }
                 ;

InsideTExpr      : ExprSeq
                   { $$ = $1; $$.type = $$.type == 'EmptyExprSeq' ? 'EmptyTExpr' : 'TExpr'; }
                 | MultiExprSeq
                   { $$ = $1; $$.type = 'MultiTExpr'; }
                 ;

TExpr            : LB0 InsideTExpr RB0
                   { $$ = $2; $$.symbol = $1; }
                 | LB1 InsideTExpr RB1
                   { $$ = $2; $$.symbol = $1; }
                 | LB2 InsideTExpr RB2
                   { $$ = $2; $$.symbol = $1; }
                 ;


Number           : ZERO
                   { $$ = { type: 'Integer', value: 0 } }
                 | HEXINT
                   { $$ = { type: 'Integer', value: parseInt($1,16) } }
                 | OCTINT
                   { $$ = { type: 'Integer', value: parseInt($1,8) } }
                 | DECINT
                   { $$ = { type: 'Integer', value: Number($1) } }
                 | REALNUMBER
                   { $$ = { type: 'RealNumber', value: Number($1) } }
                 ;

QValue           : Number
                 | STRING
                   { $$ = { type: 'String', value: $1 }; }
                 | TExpr
                 | QUOTED_SYMBOL
                   { $$ = { type: 'QuotedSymbol', symbol: $1 }; }
                 | QUOTE QValue
                   { $$ = { type: 'QuotedExpr', expr: $2 }; }
                 ;

Expr             : LValue
                 | QValue
                 ;
