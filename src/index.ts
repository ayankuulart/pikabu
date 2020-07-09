import { Game } from "./Modules/Game";
import { IGameParameters } from "./Interface/index";
import  "./styles/main.sass";

const defaultParams: IGameParameters = {
  size: 5,
  translateAnimDuration: 400,
  blockedCellAnimDuration: 600,
  waitBeforeRender: 1000,
  picUrl: "url(https://cs.pikabu.ru/images/jobseeker/logo2.png)"
}

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.createElement("div");
  rootElement.id = "root";

  document.body.appendChild(rootElement);

  Game.params = defaultParams;
  const game = new Game();

  game.init(rootElement);

  window.game = game;
});