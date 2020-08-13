## Shortest Path

1. Single-source & Single-destination (x → y)
2. Single-source (x → \*)
3. Single-desination (\* → y)
4. All pairs (_ → _)

if i = j, then 0

if No edge, then Infinity

- Adjacency Matrix: W[i, j]
- Shortest-path Matrix: D[i, j]
- Visited Matrix V[i, j]
- Predecessor-vertex Matrix: π[i, j]

### Dijkstra: Single-source

W[i][j] ∈ N

**Pseudo (Array)**

1. N ← Vertex Count
2. Init D[start] ← W[start]

   Init V[start] ← False

3. V[start] ← true
4. for i ← 1 to N-2

   Current ←getSmallIndex()

   V[Current] ← true

5. for j ← 1 to N

   if !V[j], if (D[Current] + G[Current][j]) < D[j], then D[j] = D[Current] +G[Current ][j]

**Pseudo (Heap)**

WIP...

### Floyd Warshall: All pairs

W[i][j] ∈ Z

**Pesudo**

1. N ← Vertex Count
2. Init D(0) ← W
3. for k, i, j ← 1 to N

   if D[i][j] > (D[i][k] + D[k][j]), then D[i][j] = D[i][k] + D[k][j]

4. return D(N)
