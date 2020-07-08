import { Cell } from "./Entity/Cell";
import { Game } from "./Entity/Game";

const defaultParams = {
  size: 5
}

document.addEventListener("DOMContentLoaded", event => {
  const rootElement = document.getElementById("root");
  const game = new Game();

  game.init(rootElement, defaultParams);

  // @ts-ignore
  window.game = game;
});