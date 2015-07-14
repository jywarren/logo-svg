// Logo code block storage
LogoSvg.Block = Class.extend({
  init: function(name,template) {
    this.name = name;
    this.template = template;
    this.cmds = [];
  }
})
