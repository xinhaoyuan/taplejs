(set! math (require "math"))
(set! gcd (lambda gcd (x y)
                  (if (math.< x y) (lambda.gcd y x)
                      (if (math.= y 0) x
                          (lambda.gcd y (math.- x y))))))
(gcd 4 6)
