import { ICell, ITable } from "../Interface/index";

export class Piece {
  id: number;

  static counter: number = 0;

  ref: HTMLElement;

  isEmpty: boolean;

  fly(target: HTMLElement) {
    const targetCoords = {
      x: target.offsetLeft,
      y: target.offsetTop
    };

    const x = targetCoords.x - this.ref.offsetLeft;
    const y = targetCoords.y - this.ref.offsetTop;

    // T0D0 .3s to CONST
    this.ref.style.transition = "transform .3s linear";
    this.ref.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    setTimeout(() => {
      this.ref.style.transition = "initial";
    }, 300);
  }

  constructor(piece: HTMLDivElement, isEmpty?: boolean) {
    this.id = Piece.counter++;
    this.ref = piece;
    this.isEmpty = !!isEmpty;
  }
}