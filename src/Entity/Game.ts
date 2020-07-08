import { ITable, ICell, IGameParameters } from "../Interface/index";
import { Table } from "../Entity/Table";
import { Cell } from "./Cell";
import { Piece } from "./Piece";

export class Game {
  table: ITable;

  containerWidth: number;

  init(el: HTMLElement, params: IGameParameters) {
    const { size } = params;

    this.containerWidth = el.clientWidth;
    this.ref = el;
    this.render(new Table(size, size));
  }

  render(table: ITable) {
    this.table = table;

    const cellSize = 100 / this.table.lengthX;

    let iteration = 0;

    for (let y = 0; y < this.table.lengthX; y++) {
      for (let x = 0; x < this.table.lengthY; x++) {
        const divCell = this.drawCell(x, y, cellSize);
        const piece = this.drawPiece(x, y, cellSize, iteration);

        if (this.table.lengthX * this.table.lengthY !== iteration + 1) {
          divCell.append(piece);
          this.table.addCell(new Cell(x, y, divCell, new Piece(piece), this.table, iteration));
        } else {
          const emptyDiv = document.createElement("div");
          divCell.append(emptyDiv);
          this.table.addCell(new Cell(x, y, divCell, new Piece(emptyDiv, true), this.table, iteration));
        }

        this.ref.appendChild(divCell);
        iteration++;
      }
    }

    setTimeout(() => {
      this.table.randomize();
    }, 2000);
  }

  private drawCell(x: number, y: number, cellSize: number) {
    const divCell = document.createElement("div");

    divCell.className = "cell";
    divCell.dataset.x = x.toString();
    divCell.dataset.y = y.toString();

    divCell.style.width = `${cellSize}%`;
    divCell.style.height = `${cellSize}%`;

    return divCell;
  }

  private drawPiece(x: number, y: number, cellSize: number, iteration: number) {
    const piece = document.createElement("div");

    piece.className = "piece";
    piece.dataset.index = iteration.toString();

    piece.style.backgroundSize = `calc(100% * ${this.table.lengthX} + ${this.table.lengthX * 2}px)`;
    piece.style.backgroundPosition = `calc(${100 / (this.table.lengthX - 1) * x}%) calc(${100 / (this.table.lengthY - 1) * y}%)`;
    piece.style.backgroundImage = "url(https://cs.pikabu.ru/images/jobseeker/logo2.png)";

    return piece;
  }

  ref: Element = null;
}