function getNeighbours(grid: CellState[][], rowIndex: number, colIndex: number) {
    const leftCell = grid?.[rowIndex]?.[colIndex - 1];
    const rightCell = grid?.[rowIndex]?.[colIndex + 1];
    const topCell = grid?.[rowIndex - 1]?.[colIndex];
    const bottomCell = grid?.[rowIndex + 1]?.[colIndex];
    const topLeftCell = grid?.[rowIndex - 1]?.[colIndex - 1];
    const topRightCell = grid?.[rowIndex - 1]?.[colIndex + 1];
    const bottomLeftCell = grid?.[rowIndex + 1]?.[colIndex - 1];
    const bottomRightCell = grid?.[rowIndex + 1]?.[colIndex + 1];
    return {
        leftCell,
        rightCell,
        topCell,
        bottomCell,
        topLeftCell,
        topRightCell,
        bottomLeftCell,
        bottomRightCell,
    }
}

function getAliveNeighboursCount(neighbours: { [position: string]: CellState }) {
    return Object.values(neighbours).filter((cellState) => cellState === CellState.Alive).length;
}

export enum CellState {
    Dead,
    Alive
}

const ruleBook = [{
    inputState: CellState.Alive,
    predicate: (aliveNeighboursCount: number) => aliveNeighboursCount < 2,
    returnState: CellState.Dead,
}, {
    inputState: CellState.Alive,
    predicate: (aliveNeighboursCount: number) => aliveNeighboursCount === 2 || aliveNeighboursCount === 3,
    returnState: CellState.Alive,
}, {
    inputState: CellState.Alive,
    predicate: (aliveNeighboursCount: number) => aliveNeighboursCount > 3,
    returnState: CellState.Dead,
}, {
    inputState: CellState.Dead,
    predicate: (aliveNeighboursCount: number) => aliveNeighboursCount === 3,
    returnState: CellState.Alive,
}];

function getNextGeneration(grid: CellState[][], forEachCell: (current: CellState, row: number, col: number) => CellState) {
    return grid.map((row, rowIndex) => {
        return row.map((currentCellState, colIndex) => {
            return forEachCell(currentCellState, rowIndex, colIndex)
        });
    });
}

export function tick(grid: CellState[][]): CellState[][] {
    return getNextGeneration(grid, (current, rowIndex, colIndex) => {
        const neighbours = getNeighbours(grid, rowIndex, colIndex);
        const aliveNeighboursCount = getAliveNeighboursCount(neighbours);
        const rule = ruleBook.find((rule) => current === rule.inputState && rule.predicate(aliveNeighboursCount));
        return rule === undefined ? current : rule.returnState;
    });
}
