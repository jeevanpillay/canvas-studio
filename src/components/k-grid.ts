import { background } from '../canvas-studio/gl/core/background'
import { fill } from '../canvas-studio/gl/core/fill'
import { line } from '../canvas-studio/gl/core/line'
import { stroke } from '../canvas-studio/gl/core/stroke'
import { strokeWeight } from '../canvas-studio/gl/core/strokeWeight'
import { DrawAlgorithmContext } from '../canvas-studio/gl/interfaces'
import { random } from '../canvas-studio/gl/math/random'

type ColorPalette = string[]

const PALETTE_1: ColorPalette = ['#053B50', '#176B87', '#64CCC5', '#EEEEEE']
const PALETTE_2: ColorPalette = ['#C06C84', '#355C7D', '#F67280']
const PALETTE_3: ColorPalette = ['#00B8A9', '#F6416C', '#FFDE7D', '#F8F3D4']

let currentPalette!: ColorPalette
let cellSize!: number
let rows!: number
let columns!: number
let strokeSize!: number
let cubeDrawnBoolean!: boolean[][]
let visited!: boolean[][]
let groups!: { col: number; row: number }[][]
let cubeOccurance!: number
let lineSpacing!: number

function setup(ctx: CanvasRenderingContext2D, width: number, height: number) {
  cellSize = Math.floor(random(2, 9)) * 5
  const rnd = Math.floor(width / cellSize)
  rows = rnd
  columns = rnd
  strokeSize = Math.ceil(cellSize / Math.ceil(random(12, 16)))
  cubeDrawnBoolean = Array(columns)
    .fill(null)
    .map(() => Array(rows).fill(false))
  visited = Array(columns)
    .fill(null)
    .map(() => Array(rows).fill(false))
  groups = []
  cubeOccurance = 0.5
  lineSpacing = cellSize / Math.floor(random(1, 5))
  currentPalette = random([PALETTE_1, PALETTE_2, PALETTE_3])
}

function draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
  background(ctx, getBackgroundColor())
  createCubes()
  removeChildlessCubes()
  groupByConnectedCubes()

  for (let group of groups) {
    for (let cube of group) {
      fillCube(ctx, cube.col, cube.row, width, height)
    }
  }
}

function fillCube(ctx: CanvasRenderingContext2D, col: number, row: number, width: number, height: number) {
  // Calculate the total width and height of the grid
  let totalGridWidth = columns * cellSize
  let totalGridHeight = rows * cellSize

  // Calculate the starting x and y positions to center the grid
  let startX = (width - totalGridWidth) / 2
  let startY = (height - totalGridHeight) / 2

  let x = startX + col * cellSize
  let y = startY + row * cellSize

  fillDiagonalLines1(ctx, x, y)
}

function fillDiagonalLines1(ctx: DrawAlgorithmContext, x: number, y: number, weight = 2) {
  let color = getRandomColor()
  stroke(ctx, color)
  fill(ctx, color)
  strokeWeight(ctx, weight)

  for (let offset = -cellSize - 1; offset < cellSize + 1; offset += lineSpacing) {
    let startX = x + offset
    let startY = y

    let endX = x + offset + cellSize
    let endY = y + cellSize

    // Adjust start and end positions to keep the line inside the cube
    if (startX < x) {
      startY += x - startX
      startX = x
    }
    if (endX > x + cellSize) {
      endY -= endX - (x + cellSize)
      endX = x + cellSize
    }

    line(ctx, startX, startY, endX, endY)
  }
}

function getBackgroundColor() {
  return currentPalette[currentPalette.length - 1] || '#000'
}

function createCubes() {
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      if (cubeOccurance === 1 || random(1) > cubeOccurance) {
        cubeDrawnBoolean[col][row] = true
      }
    }
  }
}

function getRandomColor() {
  return random(currentPalette)
}

function removeChildlessCubes() {
  let toBeRemoved = []

  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      if (cubeDrawnBoolean[col][row]) {
        let hasNeighbor = false

        // Check top neighbor
        if (row > 0 && cubeDrawnBoolean[col][row - 1]) {
          hasNeighbor = true
        }

        // Check bottom neighbor
        if (row < rows - 1 && cubeDrawnBoolean[col][row + 1]) {
          hasNeighbor = true
        }

        // Check left neighbor
        if (col > 0 && cubeDrawnBoolean[col - 1][row]) {
          hasNeighbor = true
        }

        // Check right neighbor
        if (col < columns - 1 && cubeDrawnBoolean[col + 1][row]) {
          hasNeighbor = true
        }

        // If the cube doesn't have any neighbors, mark it for removal
        if (!hasNeighbor) {
          toBeRemoved.push([col, row])
        }
      }
    }
  }

  // Remove cubes that are marked for removal
  toBeRemoved.forEach((coords) => {
    cubeDrawnBoolean[coords[0]][coords[1]] = false
  })
}

function groupByConnectedCubes() {
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      if (!visited[col][row] && cubeDrawnBoolean[col][row]) {
        let currentGroup: { col: number; row: number }[] = []
        dfs(col, row, currentGroup)
        if (currentGroup.length > 0) {
          groups.push(currentGroup)
        }
      }
    }
  }
}

function dfs(col: number, row: number, currentGroup: { col: number; row: number }[]) {
  if (col < 0 || row < 0 || col >= columns || row >= rows) {
    return
  }

  if (visited[col][row] || !cubeDrawnBoolean[col][row]) {
    return
  }

  visited[col][row] = true
  currentGroup.push({ col, row })

  dfs(col - 1, row, currentGroup)
  dfs(col + 1, row, currentGroup)
  dfs(col, row - 1, currentGroup)
  dfs(col, row + 1, currentGroup)
}

const render = {
  setup,
  draw,
}

export { render }
