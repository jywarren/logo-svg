
jQuery(document).ready(function($) {

  LS.initialize();

});

var LS = {

  x: 300,
  y: 300,
  angle: -90,
  cmds: [],
  functions: [],

  initialize: function() {
    draw = SVG('svg').size(600, 600)
    
  },

  // runs a whole program
  run: function(program) {
    // turn newlines into spaces! whoa
    program = program.replace(/\n/g,' ')
    // variable substitution here? 
    // downcasing here
    this.cmds = this.cmds.concat(this.parse(program));
    // run pre-processed program, which is now a flattened array 
    // of executable statements with no loops
    while (this.cmds.length > 0) {
      var cmd = this.cmds.shift();
      if (cmd.length > 0) {
        var keyword = cmd[0];
            args = cmd;
        this.commands[keyword].apply(this,[args]);
      }
    }
  },

  // parses one line of code
  parse: function(line) {
    var cmds  = [],
        loops = [], // loops need not be known outside the parse context
        words = $.trim(line).split(' ');
    // sort each word
    for (var i = 0; i < words.length; i++) {
      var word = $.trim(words[i]);
      if (loops.length > 0) { // we're in a block 
        loops[0].cmds.push(word);
        // if the word is the recognized terminator for this block type
        if (word == this.blockCommands[loops[0].type].terminator) {
          // end the block and run it with its args
          cmds = cmds.concat(this.blockCommands[loops[0].type].f.apply(this,[loops[0].cmds]));
          loops.shift();
        }
      } else if (this.commands.hasOwnProperty(word)) { // it's a recognized command
        // create a new command
        cmds.push([word]);
      } else {
        // detect if a code block is about to begin,
        // by comparing to our list of block keywords
        if (this.blockCommands.hasOwnProperty(word)) {
          // create a place to store the statements in this block
          loops.push({
            type: word,
            cmds: []
          });
        } else {
          // add it to the last statement
          if (word != "") cmds[cmds.length-1].push(word);
        }
      }
    }
    return cmds;
  },

  radians: function(angle) {
    return angle / 180 * Math.PI;
  },

  blockCommands: {
    "REPEAT": {
      terminator: ']', 
      f: function(args) {
        var reps = parseInt(args.shift()),
            cmds = [];
        // remove brackets
        args = args.splice(1,args.length-2);
        // re-add spaces for parsing
        var string = args.join(' ');
        // add to main cmds array
        for (var i = 0; i < reps; i++) {
          cmds = cmds.concat(this.parse(string));
        }
        return cmds;
      }
    },
    "TO": {
      terminator: 'END', 
      f: function(args) {
        // add self to global context
        var f = {
          cmds: []
        }
        f.name = args.shift();
console.log(args)
        for (var i = 0; i < args; i++) {
          // if it's a function argument, which start with ":"
          if (args[i][0] == ":") {
            // store it in the arguments array
            f.args.push(args[i]);
          } else {
            f.cmds.push(args[i]);
          }
        }
console.log(f)
        this.functions.push(f);
        return [];
      }
    }
  },

  commands: {
    "SETX": function(args) {
      this.x = parseFloat(args[1]);
    },
    "SETY": function(args) {
      this.y = parseFloat(args[1]);
    },
    "SETXY": function(args) {
      this.x = parseFloat(args[1]);
      this.y = parseFloat(args[2]);
    },
    "LT": function(args) {
      this.angle += parseFloat(args[1]);
    },
    "RT": function(args) {
      this.angle += parseFloat(args[1]);
    },
    "LEFT": function(args) {
      this.angle += parseFloat(args[1]);
    },
    "RIGHT": function(args) {
      this.angle += parseFloat(args[1]);
    },
    "FORWARD": function(args) {
      this.crawl(args[1]);
    },
    "FW": function(args) {
      this.crawl(args[1]);
    },
    "BACKWARD": function(args) {
      this.crawl(-args[1]);
    },
  },

  crawl: function(d) {
    var newx = this.x + d * Math.cos(this.radians(this.angle));
    var newy = this.y + d * Math.sin(this.radians(this.angle));

    draw.line(this.x, this.y, newx, newy).stroke({ width: 1 })

    this.x = newx;
    this.y = newy;
  },

  download: function() {
    var svg = $('svg')[0];
    var serializer = new XMLSerializer();
    var svg_blob = new Blob([serializer.serializeToString(svg)],
                            {'type': "image/svg+xml"});
    var url = URL.createObjectURL(svg_blob);
    var lnk = document.createElement("a");

    lnk.href = url;
    lnk.download = prompt('Enter a filename','logo.svg');

    if (document.createEvent) {
      event = document.createEvent("MouseEvents");
      event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      lnk.dispatchEvent(event);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }

  }

}
