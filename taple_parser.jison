%lex

SYMSTART                   [a-zA-Z!@#$%\^&*_\-+=]
SYMCHARS                   [a-zA-Z0-9!@#$%\^&*_\-+=]

%%

[\s]*";"[^\n]*             { /* comment */ }
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
"("[\s]*                   { return 'LB0'; }
[\s]*")"                   { return 'RB0'; }
"["[\s]*                   { return 'LB1'; }
[\s]*"]"                   { return 'RB1'; }
"{"[\s]*                   { return 'LB2'; }
[\s]*"}"                   { return 'RB2'; }
[\s\n]+                    { return 'SEP'; }
<<EOF>>                    { return 'EOF'; }

/lex
%left SEP

%start Prog
%%

Sep              :
                 | SEP
                 ;

ProgStart        : Sep
                   { $scopes = []; $scope_refs = {}; }
                 ;

ProgEnd          : Sep
                 ;

Prog             : ProgStart UnamedExprSeq ProgEnd EOF
                   { $$ = { type: "Begin", exps: $2 }; return $$; }
                 ;

Ref              : SYMBOL
                   { 
                     var idx = $scopes.length == 0 ?
                         -1 : $scopes[$scopes.length - 1].indexOf($1);
                     if (idx >= 0) 
                        $$ = { type: 'LexicalRef', name: $1, index: idx };
                     else if ($1 in $scope_refs) {
                        var s = $scope_refs[$1];
                        $$ = { type: 'ScopeRef', name: $1, index: s[s.length - 1] };
                     }
                     else
                     {
                        $$ = { type: 'LiteralRef', name: $1 };
                     }
                   }
                 | LAMBDA '.' SYMBOL
                   {
                     if ($3 in $scope_refs) {
                          var s = $scope_refs[$3];
                          $$ = { type: 'LambdaRef', name: $3, index: s[s.length - 1] };
                     }
                     else
                     {
                          $$ = { type: 'Error', msg: 'Invalid lambda reference: ' + $3 + '.' };
                     }
                   }
                 | Expr '.' SYMBOL
                   { $$ = { type: 'LookupRef', base: $1, name: $3 }; }
                 ;

SymbolSeq        : SYMBOL
                   {{ $$ = [ $1 ]; }}
                 | SymbolSeq SEP SYMBOL
                   {{ $$ = $1; $$.push($3); }}
                 ;

SymbolList       : LB0 RB0
                   { $$ = []; }
                 | LB1 RB1
                   { $$ = []; }
                 | LB2 RB2
                   { $$ = []; }
                 | LB0 SymbolSeq RB0
                   { $$ = $2 }
                 | LB1 SymbolSeq RB1
                   { $$ = $2 }
                 | LB2 SymbolSeq RB2
                   { $$ = $2 }
                 ;

UnamedExprSeq    : Expr
                   { $$ = [ $1 ]; }
                 | UnamedExprSeq SEP Expr 
                   { $$ = $1; $$.push($3); }
                 ;

NamedExprSeq     : ':' SYMBOL SEP Expr 
                   { $$ = new Object(); $$[$2] = $4; }
                 | NamedExprSeq SEP ':' SYMBOL SEP Expr
                   { $$ = $1; $1[$4] = $6; }
                 ;

SExprSeq         : UnamedExprSeq
                   { $$ = { type: 'Apply', seq: $1 }; }
                 | UnamedExprSeq SEP NamedExprSeq
                   { $$ = { type: 'Apply', seq: $1, table: $3  }; }
                 | SetSeq
                 | BeginSeq
                 | IfSeq
                 | LambdaSeq
                 ;

IfSeq            : IF SEP Expr SEP Expr SEP Expr
                   { $$ = { type: "Branch", condition: $3,
                            then_branch: $5,
                            else_branch: $7 }; }
                 ;

UnnamedLambdaDef : LAMBDA SEP SymbolList
                   { 
                     $scopes.push($3);
                     $$ = $3;
                   }
                 ;

NamedLambdaDef   : LAMBDA SEP SYMBOL SEP SymbolList
                   {
                     $scopes.push($5); 
                     if (!($3 in $scope_refs))
                        $scope_refs[$3] = [];
                     $scope_refs[$3].push($scopes.length - 1);
                     $$ = [ $3, $5 ];
                   }
                 ;

LambdaSeq        : UnnamedLambdaDef SEP UnamedExprSeq
                   { $scopes.pop();
                     $$ = { type: "Lambda", 
                            depth: $scopes.length,
                            args: $1, body:
                            { type: 'Begin', exps: $3 }
                            }; }
                 | NamedLambdaDef SEP UnamedExprSeq
                   { $scopes.pop(); $scope_refs[$1[0]].pop();
                     $$ = { type: "Lambda", 
                            depth: $scopes.length,
                            args: $1[1], body:
                            { type: 'Begin', exps: $3 }
                          }; }
                 ;

SetSeq           : SET SEP Ref SEP Expr
                   { if ($3.type == "LiteralRef")
                        $$ = { type: "LiteralSet", ref: $3, value: $5 };
                     else $$ = { type: "Set", ref: $3, value: $5 };
                   }
                 ;

BeginSeq         : BEGIN SEP UnamedExprSeq
                   { $$ = { type: "Begin", exps: $3 }; }
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

Expr             : Ref
                 | Number
                 | STRING
                   { $$ = { type: 'String', value: $1 }; }
                 | QUOTE
                   { $$ = { type: 'Quote', value: $1 }; }
                 | LB0 SExprSeq RB0
                   { $$ = $2; }
                 | LB1 SExprSeq RB1
                   { $$ = $2; }
                 | LB2 SExprSeq RB2
                   { $$ = $2; }
                 ;
