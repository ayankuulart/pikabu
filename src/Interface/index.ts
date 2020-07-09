export interface ITable {
  cells: ICell[];
  addCell: (cell: ICell) => void;
  getCellByCoords: (x: number, y: number) => ICell;
  randomize: () => void;
  lengthX: number;
  lengthY: number;
  restoreWithRelations: (relations: number[]) => void;
  setRelations: (relations: number[]) => void;
  update: (newCells: ICell[]) => void;
}

export interface ICell {
  id: number;
  x: number;
  y: number;
  table: ITable;
  ref: HTMLDivElement;
  piece: IPiece;
  needUpdate: boolean;
  swap: (emptyCellId: number) => void;
}

export interface IPiece {
  id: number;
  isEmpty: boolean;
  ref: HTMLElement;
  fly: (target: HTMLElement) => void;
}

export interface IGameParameters {
  size: number;
  translateAnimDuration: number,
  blockedCellAnimDuration: number,
  picUrl: string,
  waitBeforeRender: number
}

export interface IGame {
  table: ITable;
  containerWidth: number;
}

declare global {
  interface Window { game: IGame; }
}