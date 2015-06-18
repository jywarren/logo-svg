
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

      var args = $.trim(lines[i]).split(' ');
      var cmd   = args[0];

      if (lines[i] != "") this.commands[cmd].apply(this,[args]);

    }

  },

  radians: function(angle) {
    return angle / 180 * Math.PI;
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
