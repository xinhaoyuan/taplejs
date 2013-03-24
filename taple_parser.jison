%lex

SYMSTART                   [a-zA-Z!@#$%\^&*_\-+=<>/?\|]
SYMCHARS                   [a-zA-Z0-9!@#$%\^&*_\-+=<>/?\|]
SEPCHARS                   [\s\n]

%%

({SEPCHARS}|";"[^\n]*)+    { return 'SEP' }
"set!"                     { return 'SET'; }
"lambda"                   { return 'LAMBDA'; }
"if"                       { return 'IF'; }
"begin"                    { return 'BEGIN'; }
"0x"[0-9a-fA-F]+           { return 'HEXINT'; }
"0"[0-7]*                  { return 'OCTINT'; }
[+\-]"0"+                  { return 'ZERO'; }
[+\-]?[0-9]*"."[0-9]+      { return 'REALNUMBER'; }
[+\-]?[1-9][0-9]*          { return 'DECINT'; }
{SYMSTART}{SYMCHARS}*      { return 'SYMBOL'; }
"\""([^\\\"]|\\.)*"\""     { return 'STRING'; }
"'"{SYMCHARS}+             { return 'QUOTE'; }
":"                        { return ':'; }
"."                        { return '.'; }
"("({SEPCHARS}|";"[^\n]*)* { return 'LB0'; }
({SEPCHARS}|";"[^\n]*)*")" { return 'RB0'; }
"["({SEPCHARS}|";"[^\n]*)* { return 'LB1'; }
({SEPCHARS}|";"[^\n]*)*"]" { return 'RB1'; }
"{"({SEPCHARS}|";"[^\n]*)* { return 'LB2'; }
({SEPCHARS}|";"[^\n]*)*"}" { return 'RB2'; }
<<EOF>>                    { return 'EOF'; }

/lex
%left SEP
%left ':' '.'

%start Prog
%%

Sep              :
                 | SEP
                 ;

ProgStart        : Sep
                   { $scopes = []; }
                 ;

ProgEnd          : Sep
                 ;

Prog             : ProgStart UnamedExprSeq ProgEnd EOF
                   { 
                     $$ = { type: 'Begin', exps: $2 };
                     return $$;
                   }
                 ;

Ref              : SYMBOL
                   { 
                     var idx = -1;
                     var depth = -1;
                     for (depth = $scopes.length - 1; depth >= 0; -- depth)
                     {
                        var scope = $scopes[depth];
                        idx = scope.named.indexOf($1);
                        if (idx == -1 &&
                            ($1 == scope.name ||
                             $1 == scope.extra.named ||
                             $1 == scope.extra.unnamed)) break;
                        if (idx >= 0) break;
                     } 

                     if (idx >= 0) 
                        $$ = { type: 'LexicalRef', name: $1, offset: idx, index: depth };
                     else if (depth >= 0) {
                        if ($1 == scope.extra.unnamed)
                           $$ = { type: 'ExtraUnnamedRef', index: depth };
                        else if ($1 == scope.extra.named)
                           $$ = { type: 'ExtraNamedRef', index: depth };
                        else $$ = { type: 'ScopeRef', name: $1, index: depth };
                     }
                     else
                     {
                        $$ = { type: 'LiteralRef', name: $1 };
                     }
                   }
                 | LAMBDA '.' SYMBOL
                   {
                     var depth = -1;
                     for (depth = $scopes.length - 1; depth >= 0; -- depth)
                     {
                        var scope = $scopes[depth];
                        if ($3 == scope.name) break;
                     }

                     if (depth >= 0) {
                          $$ = { type: 'LambdaRef', name: $3, index: depth };
                     }
                     else
                     {
                          $$ = { type: 'Error', msg: 'Invalid lambda reference: ' + $3 + '.' };
                     }
                   }
                 | Expr '.' SYMBOL
                   { $$ = { type: 'LookupRef', base: $1, name: $3 }; }
                 | Expr '.' SExpr
                   { $$ = { type: 'LookupExp', base: $1, ref: $3 }; }
                 ;

SymbolSeq        : SYMBOL
                   {{ $$ = [ $1 ]; }}
                 | SymbolSeq SEP SYMBOL
                   {{ $$ = $1; $$.push($3); }}
                 ;

ExtraNamedArg    : ':' SEP SYMBOL
                   { $$ = $3; }
                 ;
ExtraUnnamedArg  : '.' SEP SYMBOL
                   { $$ = $3; }
                 ;

ExtraArgs        : ExtraNamedArg
                   { $$ = { named: $1 }; }
                 | ExtraUnnamedArg
                   { $$ = { unnamed: $1 }; }
                 | ExtraUnnamedArg SEP ExtraNamedArg
                   { $$ = { unnamed: $1, named: $3 }; }
                 | ExtraNamedArg SEP ExtraUnnamedArg
                   { $$ = { unnamed: $3, named: $1 }; }
                 ;
                                      
ArgsList         : LB0 RB0
                   { $$ = { named: [], extra: {} }; }
                 | LB0 SymbolSeq RB0
                   { $$ = { named: $2, extra: {} }; }
                 | LB0 ExtraArgs RB0
                   { $$ = { named: [], extra: $2 }; }
                 | LB0 SymbolSeq SEP ExtraArgs RB0
                   { $$ = { named: $2, extra: $4 }; }
                 ;


UnamedExprSeq    : Expr
                   { $$ = [ $1 ]; }
                 | UnamedExprSeq SEP Expr 
                   { $$ = $1; $$.push($3); }
                 ;

NamedExpr        : SYMBOL ':' Expr
                   { $$ = { type:'SymbolNamedExpr', ref: $1, value: $3 }; }
                 | SExpr  ':' Expr
                   { $$ = { type:'ExprNamedExpr', ref: $1, value: $3 }; }
                 ;

NamedExprSeq     : NamedExpr 
                   { $$ = [$1]; }
                 | NamedExprSeq SEP NamedExpr
                   { $$.push($3); }
                 ;

SExprSeq         : UnamedExprSeq
                   { $$ = { type: 'Apply', seq: $1 }; }
                 | UnamedExprSeq SEP NamedExprSeq
                   { $$ = { type: 'Apply', seq: $1, named: $3 }; }
                 | SetSeq
                 | BeginSeq
                 | IfSeq
                 | LambdaSeq
                 ;

IfSeq            : IF SEP Expr SEP Expr SEP Expr
                   { $$ = { type: 'Branch', condition: $3,
                            then_branch: $5,
                            else_branch: $7 }; }
                 ;

UnnamedLambdaDef : LAMBDA SEP ArgsList
                   {
                     $scopes.push($3);
                     $$ = $3;
                   }
                 ;

NamedLambdaDef   : LAMBDA SEP SYMBOL SEP ArgsList
                   {
                     $5.name = $3;
                     $scopes.push($5); 
                     $$ = $5;
                   }
                 ;

LambdaSeq        : UnnamedLambdaDef SEP UnamedExprSeq
                   { $scopes.pop();
                     $$ = { type: 'Lambda', 
                            depth: $scopes.length,
                            args: $1, body:
                            { type: 'Begin', exps: $3 }
                            }; }
                 | NamedLambdaDef SEP UnamedExprSeq
                   { $scopes.pop();
                     $$ = { type: 'Lambda', 
                            depth: $scopes.length,
                            args: $1, body:
                            { type: 'Begin', exps: $3 }
                          }; }
                 ;

SetSeq           : SET SEP Ref SEP Expr
                   {
                     if ($3.type == 'LiteralRef')
                        $$ = { type: 'LiteralSet', ref: $3, value: $5 };
                     else if ($3.type == 'ExtraNamedRef' || $3.type == 'ExtraUnnamedRef' || 
                              $3.type == 'LexicalRef' || $3.type == 'LookupRef')
                        $$ = { type: 'Set', ref: $3, value: $5 };
                     else $$ = { type: 'Error', msg: 'Cannot set the reference: ' + $3.type + '.' };
                   }
                 ;

BeginSeq         : BEGIN SEP UnamedExprSeq
                   { $$ = { type: 'Begin', exps: $3 }; }
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

SExpr            : LB0 SExprSeq RB0
                   { $$ = $2; }
                 | LB1 SExprSeq RB1
                   { $$ = $2; }
                 | LB2 UnamedExprSeq RB2
                   { $$ = { type: 'Begin', exps: $2 }; }
                 ;

Expr             : Ref
                 | Number
                 | STRING
                   { $$ = { type: 'String', value: $1 }; }
                 | QUOTE
                   { $$ = { type: 'Quote', value: $1 }; }
                 | SExpr
                 ;
