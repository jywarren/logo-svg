#Logo-SVG

A minimal Logo command set for SVG.js:

* FORWARD/FW
* BACKWARD
* LEFT/LT
* RIGHT/RT
* SETX, SETY, SETXY
* REPEAT `n` [ ... ]
* TO FOO :ARG1 :ARG2 BODY END

Planned:

* RESET
* HOME
* CLEARSCREEN/CLEAR/CS
* COLOR [r g b]
* MAKE "X 1 (setting :X to 1)
* IF `COND` [ ... ]

Demo at https://jywarren.github.io/logo-svg

Inspired by the `canvas`-based version at https://github.com/rmmh/papert

But intended for lasercutting use, so SVG was needed!

Quite messy, not as generalizable as I'd like, so please chip in!

--Jeffrey Warren (unterbahn.com)

Addendum: As this progressed, it became more about me learning how to write a parser, by trial and error -- a thought experiment. 
