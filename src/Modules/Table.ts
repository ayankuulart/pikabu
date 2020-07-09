import { ITable, ICell } from "../Interface/index";
import { shuffle } from "../utils/shuffle";
import { Game } from "./Game";

export class Table implements ITable {
  lengthX: number;
  lengthY: number;

  constructor(x: number, y: number) {
    this.lengthX = x;
    this.lengthY = y;

    window.addEventListener("popstate", data => {
      const state = JSON.parse(decodeURI(data.state));

      if (state?.relations) {
        this.restoreWithRelations(state.relations);
      }
    });
  }

  _cells: ICell[] = [];

  get cells() {
    return this._cells;
  }

  set cells(cells: ICell[]) {
    this._cells = cells;
    this.update(cells);
  }

  addCell(cell: ICell) {
    this.cells.push(cell);
  }

  restoreWithRelations(relations: number[]) {
    const newPiecesStack = relations.map(pieceId => {
      const cellWithTargetPiece = this.cells.filter(cell => {
        return cell.piece.id === pieceId;
      })[0];

      if (cellWithTargetPiece) {
        return cellWithTargetPiece.piece;
      }

      return null;
    });


    const newCells = this.cells.map((item, index) => {
      item.piece = newPiecesStack[index];
      item.needUpdate = true;

      return item;
    });

    this.cells = newCells;
  }

  randomize() {
    const shuffledPieces = shuffle(this.cells.map(item => item.piece));

    const newCells = this.cells.map((item, index) => {
      item.piece = shuffledPieces[index];
      item.needUpdate = true;

      return item;
    });

    // В видео-примере, пустая ячейка всегда появлется в левом верхнем углу после перемешивания. Следующие строки только для того, чтобы реализовать это. START
    const emptyCellIndex = newCells.findIndex(cell => cell.piece.isEmpty);
    const firstCellPiece = newCells[0].piece;

    newCells[0].piece = newCells[emptyCellIndex].piece;
    newCells[emptyCellIndex].piece = firstCellPiece;
    // END

    this.setRelations(newCells.map(item => item.piece.id));
    this.cells = newCells;
  }

  changePiece(cell: ICell) {
    if (cell.needUpdate) {
      cell.piece.fly(cell.ref);
      cell.needUpdate = false;
    }
  }

  setRelations(relations: number[]) {
    const urlState = JSON.stringify({
      size: { x: this.lengthX, y: this.lengthY },
      relations: relations
    });

    history.pushState(urlState, "urlState", `#${encodeURI(urlState)}`);
  }

  update(newCells: ICell[]) {
    newCells.forEach(this.changePiece, this);

    setTimeout(() => {
      for (let i = 0; i < newCells.length; i++) {
        const clone = newCells[i].piece.ref.cloneNode() as HTMLElement;

        clone.style.transition = "initial";
        clone.style.transform = "initial";

        newCells[i].ref.replaceChild(clone, newCells[i].ref.firstChild);
        newCells[i].piece.ref = newCells[i].ref.firstChild as HTMLElement;
      }
    }, Game.params.translateAnimDuration);
  }

  getCellByCoords(x: number, y: number) {
    return this.cells.filter(item => item.x === x && item.y === y)[0];
  }
}