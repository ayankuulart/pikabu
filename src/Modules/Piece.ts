import { Game } from "./Game";

export class Piece {
  id: number;

  static counter: number = 0;

  ref: HTMLElement;

  isEmpty: boolean;

  constructor(piece: Node, isEmpty?: boolean) {
    this.id = Piece.counter++;
    this.ref = piece as HTMLElement;
    this.isEmpty = !!isEmpty;
  }

  fly(target: HTMLElement) {
    const targetCoords = {
      x: target.offsetLeft,
      y: target.offsetTop
    };

    const x = targetCoords.x - this.ref.offsetLeft;
    const y = targetCoords.y - this.ref.offsetTop;

    this.ref.style.transition = `transform ${Game.params.translateAnimDuration}ms ease-in-out`;
    this.ref.style.transform = `translate(${x}px, ${y}px)`;
  }

}