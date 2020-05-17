const SWITCH;
const CLOCKS;
const LINKED = [[]]; // !![i][j]: Switch 'i' Linked Clock 'j'

// given clocks: []
function areAligned(clocks) {
    // validation
}

function push(clocks, swtch) {
    for (let clock = 0; clock < CLOCKS; clock += 1) {
        if (LINKED[swtch][clock] === 'y') {
            clocks[clock] += 3;

            // 15 == 3 (about over 12)
            if (clocks[clock] === 15) clocks[clock] = 3;
        }
    }
}

function solve(clocks, swtch) {
    if (swtch === SWITCH) return areAligned(clocks) ? 0 : INF;

    let result = INF;

    for (let count = 0; count < 4; count += 1) {
        result = Math.min(result, count + solve(clocks, swtch + 1));

        push(clocks, swtch); // + push
    }

    return result;
}