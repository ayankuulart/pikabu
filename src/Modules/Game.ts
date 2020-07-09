import { ITable, IGame, IGameParameters } from "../Interface/index";
import { Table } from "./Table";
import { Cell } from "./Cell";
import { Piece } from "./Piece";

const rangeInput = document.createElement("input");
rangeInput.type = "range";
rangeInput.min = "5";
rangeInput.max = "10";
rangeInput.defaultValue = "5";
rangeInput.step = "1";

const fifteenWrap = document.createElement("div");
fifteenWrap.className = "fifteen-wrap";

const emptyDiv = document.createElement("div");
emptyDiv.className = "empty";

export class Game implements IGame {
  table: ITable;
  containerWidth: number;

  public static params: IGameParameters;
  public static timeout: any;
  public static canClick: boolean = true;

  init(el: HTMLElement) {
    this.containerWidth = el.clientWidth;
    this.ref = el;

    rangeInput.addEventListener("change", this.handleRangeChange);

    this.ref.appendChild(rangeInput);
    this.ref.appendChild(fifteenWrap.cloneNode(false));

    const urlState = this.getStateFromUrl();

    if (urlState) {
      rangeInput.value = urlState.size.x;
      this.render(new Table(urlState.size.x, urlState.size.y));
    } else {
      this.render(new Table(Game.params.size, Game.params.size));
    }
  }

  render(table: ITable) {
    this.table = table;

    const cellSize = 100 / this.table.lengthX;

    let iteration = 0;

    for (let y = 0; y < this.table.lengthX; y++) {
      for (let x = 0; x < this.table.lengthY; x++) {
        const divCell = this.drawCell(x, y, cellSize);
        const piece = this.drawPiece(x, y, iteration);

        if (this.table.lengthX * this.table.lengthY !== iteration + 1) {
          divCell.append(piece);
          this.table.addCell(new Cell(x, y, divCell, new Piece(piece), this.table, iteration));
        } else {
          const emptyDivClone = emptyDiv.cloneNode()
          divCell.append(emptyDivClone);
          this.table.addCell(new Cell(x, y, divCell, new Piece(emptyDivClone, true), this.table, iteration));
        }

        this.ref.lastChild.appendChild(divCell);
        iteration++;
      }
    }

    if (this.getStateFromUrl()) {
      this.table.restoreWithRelations(this.getStateFromUrl().relations);
    } else {
      Game.timeout = setTimeout(() => {
        this.table.randomize();
      }, Game.params.waitBeforeRender);
    }
  }

  getStateFromUrl() {
    try {
      const hash = decodeURI(location.hash.slice(1));

      if (!hash) {
        return null;
      }

      return JSON.parse(hash);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  drawCell(x: number, y: number, cellSize: number) {
    const divCell = document.createElement("div");

    divCell.className = "cell";
    divCell.dataset.x = x.toString();
    divCell.dataset.y = y.toString();

    divCell.style.width = `${cellSize}%`;
    divCell.style.height = `${cellSize}%`;

    return divCell;
  }

  drawPiece(x: number, y: number, iteration: number) {
    const piece = document.createElement("div");

    piece.className = "piece";
    piece.dataset.index = iteration.toString();

    piece.style.backgroundSize = `calc(100% * ${this.table.lengthX} + ${this.table.lengthX * 2}px)`;
    piece.style.backgroundPosition = `calc(${100 / (this.table.lengthX - 1) * x}%) calc(${100 / (this.table.lengthY - 1) * y}%)`;
    piece.style.backgroundImage = Game.params.picUrl;

    return piece;
  }

  handleRangeChange = (e: Event) => {
    const target = <HTMLInputElement>e.target;
    Game.params.size = Number(target.value);
    rangeInput.removeEventListener("change", this.handleRangeChange);

    Piece.counter = 0;

    clearTimeout(Game.timeout);

    location.hash = "";

    this.ref.innerHTML = "";
    this.init(this.ref as HTMLElement);
  }

  ref: Element = null;
}