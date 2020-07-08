import { IPiece, ITable, ICell } from "../Interface/index"

export class Cell {
  id: number;

  ref: HTMLDivElement;

  piece: IPiece;

  x: number;

  y: number;

  table: ITable;

  nextPiece: IPiece;

  swap() {
    const siblings = this.getSiblings();
    let emptyCellIndex: number;

    siblings.forEach(cell => {
      if (cell && cell.piece.isEmpty) {
        emptyCellIndex = this.table.cells.findIndex(item => item.id === cell.id);
      }
    });

    const newCells = this.table.cells.map((item, index) => {
      if (index === emptyCellIndex) {
        const emptyCellPiece = item.piece;
        item.nextPiece = this.piece;
        this.piece = emptyCellPiece;

        setTimeout(() => {
          this.ref.innerHTML = ""
        }, 300);
      }

      return item;
    });

    this.table.update(newCells);
  }

  getSiblings() {
    const siblingsCoords = [
      { x: this.x - 1, y: this.y },
      { x: this.x + 1, y: this.y },
      { x: this.x, y: this.y - 1 },
      { x: this.x, y: this.y + 1 }
    ];

    return siblingsCoords.map(coord => {
      return this.table.getCellByCoords(coord.x, coord.y);
    });
  }

  constructor(x: number, y: number, cell: HTMLDivElement, piece: IPiece, table: ITable, id: number) {
    this.x = x;
    this.y = y;
    this.piece = piece;
    this.ref = cell;
    this.table = table;
    this.id = id;

    this.ref.addEventListener("click", () => {
      this.swap();
    });
  }
}