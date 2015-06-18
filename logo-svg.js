
jQuery(document).ready(function($) {

  LS.initialize();

});

var LS = {

  x: 300,
  y: 300,
  angle: -90,

  initialize: function() {
    draw = SVG('svg').size(600, 600)
    
  },

  run: function() {
    var program = $('.program').val();
    var lines = program.split('\n');

    for (var i = 0;i < lines.length;i++) {

      var args = lines[i].split(' ');
      var cmd   = args[0];

      this.commands[cmd].apply(this,[args]);

    }

  },

  radians: function(angle) {
    return angle / 180 * Math.PI;
  },

  commands: {
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
  }

}