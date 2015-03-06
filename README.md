A Javascript library for working with 2D grids - useful for simulations, cellular automata, simple games etc.

### Demo

[Conway's Game Of Life](https://cdn.rawgit.com/martinpllu/cellgrid/master/examples/life/life.html)

### Grids

Grids consist of a M by N matrix of square cells, where each cell has 8 neighbours.

Grids are toroidal, meaning that the cells at the edges of the grid are neighbours of the cells at the opposite edges.

### Code sample

A quick code sample to give a flavour:

<pre>
var grid = new Grid(100, 100);
var cell = grid.cell(58,21);
var randomCell = grid.randomCell();
var neighboursArray = cell.neighbours();
var neighbour = cell.neighbour(Direction.NORTHEAST);
var randomNeighbour = cell.randomNeighbour();

</pre>

### Visualisation

There are also some basic utilities for visualising grids via a `<canvas>` element.

### Getting started

To get started, look at the [Conway's Game Of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) example under `examples/life/life.html`.

