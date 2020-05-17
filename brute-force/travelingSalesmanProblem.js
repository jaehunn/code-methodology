const CITYS;
const DISTS = [CITYS][CITYS]; // [start][end] = cost

function shortestPath(paths = [], visited, currentLength) {
    if (paths.length === CITYS) return currentLength + DISTS[paths[paths.length - 1]][paths[0]]; // last city -> start city

    // init result
    let result = INF; // INF is Max constant value

    for (let index = 0; index < CITYS; index += 1) {
        // find startIndex
        if (visited[index]) continue;

        let currentCity = paths[paths.length - 1];

        // add paths, visited
        paths.push(currentCity);
        visited[index] = true;

        // recursive
        let candidate = shortestPath(paths, visited, currentLength + DISTS[current][index]);

        result = Math.min(result, candidate);

        // free 
        paths.pop();
        visited[index] = false;
    }

    return result;
}
