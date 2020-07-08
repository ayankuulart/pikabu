export interface ITable {
  cells: ICell[];
  addCell: (cell: ICell) => void;
  getCellByCoords: (x: number, y: number) => ICell;
  randomize: () => void;
  lengthX: number;
  lengthY: number;
  update: (newCells: ICell[]) => void;
}

export interface ICell {
  id: number;
  x: number;
  y: number;
  table: ITable;
  ref: HTMLDivElement;
  piece: IPiece;
  nextPiece: IPiece;
  swap: () => void;
}

export interface IPiece {
  id: number;
  isEmpty: boolean;
  ref: HTMLElement;
  fly: (target: HTMLElement) => void;
}

export interface IGameParameters {
  size: number;
}