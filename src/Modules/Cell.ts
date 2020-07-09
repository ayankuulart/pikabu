import { IPiece, ITable, ICell } from "../Interface/index"
import { Game } from "./Game";

export class Cell {
  id: number;

  ref: HTMLDivElement;

  piece: IPiece;

  x: number;

  y: number;

  table: ITable;

  needUpdate: boolean;

  constructor(x: number, y: number, cell: HTMLDivElement, piece: IPiece, table: ITable, id: number) {
    this.x = x;
    this.y = y;
    this.piece = piece;
    this.ref = cell;
    this.table = table;
    this.id = id;

    this.ref.addEventListener("click", () => {
      this.handleClick();
    });
  }

  swap(emptyCellId: number) {
    const newCells = this.table.cells.map(item => {
      if (item.id === emptyCellId) {
        const emptyCellPiece = item.piece;

        item.piece = this.piece;
        this.piece = emptyCellPiece;

        item.needUpdate = true;
        this.needUpdate = true;
      }

      return item;
    });

    this.table.setRelations(newCells.map(item => item.piece.id));
    this.table.cells = newCells;
  }

  getEmptyCellBeside() {
    const siblingsCoords = [
      { x: this.x - 1, y: this.y },
      { x: this.x + 1, y: this.y },
      { x: this.x, y: this.y - 1 },
      { x: this.x, y: this.y + 1 }
    ];

    return siblingsCoords.map(coord => {
      return this.table.getCellByCoords(coord.x, coord.y);
    }).filter(item => item?.piece.isEmpty)[0];
  }

  handleClick() {
    const emptyCell = this.getEmptyCellBeside();

    if (emptyCell && Game.canClick) {
      Game.canClick = false;
      this.swap(emptyCell.id);

      setTimeout(() => {
        Game.canClick = true;
      }, Game.params.translateAnimDuration);
    } else {
      this.piece.ref.className = "piece anim";

      setTimeout(() => {
        this.piece.ref.className = "piece";
      }, Game.params.translateAnimDuration);
    }
  }
}