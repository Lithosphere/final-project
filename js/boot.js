var SideScroller = SideScroller || {};
SideScroller.Boot = function(){};

//setting game configuration and loading assets for the loading screen.

SideScroller.Boot.prototype = {
  preload: function(){
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },

  create: function(){
    this.game.stage.backgroundColor = "#87CEFA";
    this.stage.disableVisibilityChange = false;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    // this.scale.setScreenSize(true);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('Preload');
  }
}