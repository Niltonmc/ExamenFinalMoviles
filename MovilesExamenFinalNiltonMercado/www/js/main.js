window.onload = function () {
  let game = new Phaser.Game(800, 600, Phaser.AUTO);
  game.state.add("Preload", Preload);
  game.state.add("Menu", Menu);
  game.state.add("Selection", Selection);
  game.state.add("Game", Game);
  game.state.add("Gameover", Gameover);
  game.state.start("Preload");
};
