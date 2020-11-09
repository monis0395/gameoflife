import { tick } from "./gol";
import { assert } from "chai";

describe('Game of Life Rules', () => {
    it('Any live cell with fewer than two live neighbours dies, as if by underpopulation', () => {
        const grid = [
            [1, 0],
            [0, 0],
        ];
        const next = tick(grid);
        assert.deepEqual(next[0][0], 0);
    });
    it('Any live cell with two or three live neighbours lives on to the next generation.', () => {
        const grid = [
            [1, 1],
            [1, 0],
        ];
        const next = tick(grid);
        assert.deepEqual(next[0][0], 1);
    })
    it('Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
        const grid = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
        const next = tick(grid);
        assert.deepEqual(next[1][1], 0);
    })
    it('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
        const grid = [
            [0, 1],
            [1, 1],
        ];
        const next = tick(grid);
        assert.deepEqual(next[0][0], 1);
    });
});
