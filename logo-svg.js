
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
    var lines = program.split('\n');
    for (var i = 0;i < lines.length;i++) {
      // variable substitution here? 
      // downcasing here
      this.cmds.push(this.parse(lines[i]));
    }
    while (this.cmds.length > 0) {
      var cmd = this.cmds.shift();
      if (cmd.length > 0) {
        var keyword = cmd[0][0];
            args = cmd[0];
        this.commands[keyword].apply(this,[args]);
      }
    }
  },

  // parses one line of code
  parse: function(line) {
    var cmds  = [],
        words = $.trim(line).split(' ');
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      // it's a recognized command
      if (this.commands.hasOwnProperty(word)) {
        // create a new command
        cmds.push([word]);
      } else if (this.functions.hasOwnProperty(word)) {
        // execute user generated logo function
        //this.functions[word]
      } else {
        if (cmds.length > 0) {
          // add it to the previous command
          cmds[cmds.length-1].push(word);
        }
      }
    }
console.log(cmds);
    return cmds;
  },

  radians: function(angle) {
    return angle / 180 * Math.PI;
  },

  commands: {
    "REPEAT": function(args) {
console.log(args)
      args.shift();
      var reps = parseInt(args.shift());
console.log(args)
      args = args.join(' ');
      // remove brackets
console.log(args)
      args = args.substr(1,args.length-2).split(' ');
      for (var i = 0; i < reps; i++) {
console.log(args)
        this.cmds.push(this.parse(args));
      }
    },
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
