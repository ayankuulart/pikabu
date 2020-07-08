import { ICell } from "../Interface/index";
import { shuffle } from "../utils/shuffle";

export class Table {
  constructor(x: number, y: number) {
    this.lengthX = x;
    this.lengthY = y;
  }

  private _cells: ICell[] = [];

  get cells() {
    return this._cells;
  }

  set cells(cells: ICell[]) {
    this._cells = cells;
    this.update(cells);
  }

  lengthX: number;
  lengthY: number;

  addCell(cell: ICell) {
    this.cells.push(cell);
  }

  randomize() {
    const shuffledPieces = shuffle(this.cells.map(item => item.piece));

    const newCells = this.cells.map((item, index) => {
      item.nextPiece = shuffledPieces[index];
      return item;
    });

    this.cells = newCells;
  }

  private changePiece(cell: ICell) {
    if (cell.nextPiece) {
      const pieceCopy = cell.nextPiece.ref.cloneNode();
      cell.nextPiece.fly(cell.ref);

      cell.piece = cell.nextPiece;
      // @ts-ignore
      cell.piece.ref = pieceCopy;
      delete cell.nextPiece;

      setTimeout(() => {
        cell.ref.innerHTML = "";
        cell.ref.appendChild(pieceCopy);
      }, 300);
    }
  }

  update(newCells: ICell[]) {
    newCells.forEach(this.changePiece);
  }

  getCellByCoords(x: number, y: number) {
    return this.cells.filter(item => item.x === x && item.y === y)[0];
  }
}