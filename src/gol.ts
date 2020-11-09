function getNeighbours(grid: number[][], rowIndex: number, colIndex: number) {
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

function getAliveNeighboursCount(neighbours: { topCell: number; bottomCell: number; topRightCell: number; bottomLeftCell: number; topLeftCell: number; bottomRightCell: number; leftCell: number; rightCell: number }) {
    return Object.values(neighbours).reduce((sum, current) => sum + (current || 0), 0);
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

function forEachCell(grid, callback) {
    return grid.map((row, rowIndex) => {
        return row.map((currentCellState, colIndex) => {
            return callback(currentCellState, rowIndex, colIndex)
        });
    });
}

export function tick(grid: number[][]): number[][] {
    return forEachCell(grid, (current: CellState, rowIndex, colIndex) => {
        const neighbours = getNeighbours(grid, rowIndex, colIndex);
        const aliveNeighboursCount = getAliveNeighboursCount(neighbours);
        const rule = ruleBook.find((rule) => current === rule.inputState && rule.predicate(aliveNeighboursCount));
        return rule === undefined ? current : rule.returnState;
    });
}
