const [w, h] = [500, 500]

const canvas = createCanvas(
  'canvas',
  w,
  h,
  'position: absolute;border: 1px solid'
)
const canvasTurtle = createCanvas('canvasTurtle', w, h, 'position: absolute')

const ctx = canvas.getContext ? canvas.getContext('2d') : null
const ctxTurtle = canvasTurtle.getContext ? canvasTurtle.getContext('2d') : null
// 创建canvas
function createCanvas (id = 'canvas', w, h, style) {
  let canvas = document.createElement('canvas')
  canvas.id = id
  canvas.width = w
  canvas.height = h
  canvas.style = style
  document.body.appendChild(canvas)
  return canvas
}
// 修复1px渲染问题
function fix1px (hCanvas, hCtx) {
  const oldWidth = hCanvas.width
  const oldHeight = hCanvas.height
  const scaleRatio = window.devicePixelRatio
  hCanvas.width = Math.round(oldWidth * scaleRatio)
  hCanvas.height = Math.round(oldHeight * scaleRatio)
  hCanvas.style.width = oldWidth + 'px'
  hCanvas.style.height = oldHeight + 'px'
  hCtx.scale(scaleRatio, scaleRatio)
  hCtx.translate(-0.5, -0.5)
}
fix1px(canvas, ctx)
fix1px(canvasTurtle, ctxTurtle)

const [dx, dy] = [w / 2, h / 2] // 注意坐标在左上,海龟坐标在中间
ctx.strokeStyle = 'rgb(0, 0, 0)'
ctx.lineWidth = 0.5

ctxTurtle.strokeStyle = 'rgb(250, 0, 0)'
ctxTurtle.lineWidth = 2

// 下面是坐标变换,将左上(0,0),转移到 250,250
function ctxMove (x, y, drawCtx = ctx) {
  drawCtx.moveTo(x + dx, dy - y)
  return ctx
}
function ctxlineTo (x, y, drawCtx = ctx) {
  drawCtx.lineTo(x + dx, dy - y)
  return ctx
}
function ctxMoveTo (x, y, drawCtx = ctx) {
  drawCtx.moveTo(x + dx, dy - y)
  return ctx
}
const wait = function (t) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}
