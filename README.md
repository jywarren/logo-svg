#Logo-SVG

**Note!** Abandoning in favor of https://github.com/jywarren/papert - an SVG-enabled fork of the Papert logo parser!

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

****

##Developers

You'll need `npm` and bower, the latter with `npm install -g bower`.

I'm slowly cleaning this code up as an exercise for myself, but as of now you'll need to install the Grunt cli:

`npm install -g grunt-cli`

And run `grunt` from the root directory to watch for code changes and compile them into `dist/logosvg.js` on the fly.

****

Sketchpad for parsing math expressions:


This works now, but expressions with variables choke: ":N/360" remains one word, so variable recognition doesn't trigger.

  SO! um. We must glob our math expressions *after* variable substitution, OR we must be able to substitute variables buried within words
  AND we'd have to consider breaking out our variables into their own words, if they're not space-delimited from a math expression

AND what about parentheses?
AND what about conditionals? Would the above work for conditionals, if we add an IF blockCommand?


