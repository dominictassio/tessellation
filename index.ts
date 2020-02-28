import * as PIXI from 'pixi.js'
import gsap from 'gsap'

const widthModifier = 1.00
const heightModifier = 0.80

const width = window.innerWidth * widthModifier
const height = window.innerHeight * heightModifier

let colorCount = 0
const colors = [0x512888, 0x753ac5, 0x9f76d7, 0xcab3e9]
const offsets = [-4, -2, -1, 0, 1, 2, 4]

const app = new PIXI.Application({ width: width, height: height, antialias: true, backgroundColor: 0xffffff, resolution: window.devicePixelRatio || 1 })
document.body.appendChild(app.view)

interface IPoint {
  x: number,
  y: number,
}

let pointsChanged = false
const points: IPoint[][] = []

for (let x = 0; x < 11; x++) {
  const column: IPoint[] = []

  if (x % 2 == 0) {
    for (let y = 0; y < 10; y++) {
      column.push({ x: x * width / 10 + getRandomOffset(), y: y * height / 8 + getRandomOffset() })
    }
  } else {
    for (let y = 0; y < 10; y++) {
      column.push({ x: x * width / 10 + getRandomOffset(), y: (y - 0.5) * height / 8 + getRandomOffset() })
    }
  }

  points.push(column)
}

const triangles = new PIXI.Graphics()
triangles.lineStyle(4, 0xffffff)

for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 9; y++) {
    if (x % 2 == 0) {
      triangles.beginFill(getRandomColor())
      triangles.drawPolygon([
        points[x][y].x, points[x][y].y,
        points[x][y + 1].x, points[x][y + 1].y,
        points[x + 1][y + 1].x, points[x + 1][y + 1].y,
      ])
      triangles.endFill()

      triangles.beginFill(getRandomColor())
      triangles.drawPolygon([
        points[x + 1][y].x, points[x + 1][y].y,
        points[x + 1][y + 1].x, points[x + 1][y + 1].y,
        points[x][y].x, points[x][y].y,
      ])
      triangles.endFill()
    } else {
      triangles.beginFill(getRandomColor())
      triangles.drawPolygon([
        points[x][y].x, points[x][y].y,
        points[x][y + 1].x, points[x][y + 1].y,
        points[x + 1][y].x, points[x + 1][y].y,
      ])
      triangles.endFill()

      triangles.beginFill(getRandomColor())
      triangles.drawPolygon([
        points[x + 1][y].x, points[x + 1][y].y,
        points[x + 1][y + 1].x, points[x + 1][y + 1].y,
        points[x][y + 1].x, points[x][y + 1].y,
      ])
      triangles.endFill()
    }
  }
}

app.stage.addChild(triangles)

app.ticker.add((delta) => {
  triangles.clear()
  triangles.lineStyle(4, 0xffffff)

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 9; y++) {
      if (x % 2 == 0) {
        triangles.beginFill(getRandomColor())
        triangles.drawPolygon([
          points[x][y].x, points[x][y].y,
          points[x][y + 1].x, points[x][y + 1].y,
          points[x + 1][y + 1].x, points[x + 1][y + 1].y,
        ])
        triangles.endFill()

        triangles.beginFill(getRandomColor())
        triangles.drawPolygon([
          points[x + 1][y].x, points[x + 1][y].y,
          points[x + 1][y + 1].x, points[x + 1][y + 1].y,
          points[x][y].x, points[x][y].y,
        ])
        triangles.endFill()
      } else {
        triangles.beginFill(getRandomColor())
        triangles.drawPolygon([
          points[x][y].x, points[x][y].y,
          points[x][y + 1].x, points[x][y + 1].y,
          points[x + 1][y].x, points[x + 1][y].y,
        ])
        triangles.endFill()

        triangles.beginFill(getRandomColor())
        triangles.drawPolygon([
          points[x + 1][y].x, points[x + 1][y].y,
          points[x + 1][y + 1].x, points[x + 1][y + 1].y,
          points[x][y + 1].x, points[x][y + 1].y,
        ])
        triangles.endFill()
      }
    }
  }
})

app.ticker.add((delta) => {
  const randomRow = Math.floor(Math.random() * 11)
  const randomCol = Math.floor(Math.random() * 10)

  gsap.to(points[randomRow][randomCol], {
    x: '+=' + getRandomOffset(),
    y: '+=' + getRandomOffset(),
    duration: delta,
  })
})

function getRandomElement(a: Array<any>) {
  return a[Math.floor(Math.random() * a.length)]
}

function getRandomColor(): number {
  colorCount++
  return colors[colorCount % colors.length]
}

function getRandomOffset(): number {
  return getRandomElement(offsets)
}