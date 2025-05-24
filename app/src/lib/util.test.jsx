import { rollD6 } from './util.jsx';

test('rollD6 returns a number between 1 and 6', () => {
    let res = [0, 0, 0, 0, 0, 0];
    let n = 1000;
    let roll =0;
    for (let i = 0; i < n; i++) {
        roll = rollD6();
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(6);
        res[roll-1]++;
    }
    for (let index = 0; index < res.length; index++) {
        console.log("%d: %d", index+1, res[index]);
    }
});