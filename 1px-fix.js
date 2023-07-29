const canvas = document.querySelector('#canvas') //确定页面有canvas dom
let ctx = canvas.getContext ? canvas.getContext('2d') : null
let [dx, dy] = [250, 250] // 注意坐标在左上,海龟坐标在中间
// 修复1px渲染问题
let oldWidth = canvas.width
let oldHeight = canvas.height
let scaleRatio = window.devicePixelRatio
canvas.width = Math.round(oldWidth * scaleRatio)
canvas.height = Math.round(oldHeight * scaleRatio)
canvas.style.width = oldWidth + 'px'
canvas.style.height = oldHeight + 'px'
ctx.scale(scaleRatio, scaleRatio)
ctx.translate(-0.5, -0.5)
ctx.lineWidth = 0.5
ctx.strokeStyle = 'rgb(0, 0, 0)'
// 下面是坐标变换,将左上(0,0),转移到 250,250
function ctxMove (x, y) {
  ctx.moveTo(x + dx, dy - y)
}
function ctxlineTo (x, y) {
  ctx.lineTo(x + dx, dy - y)
}
function ctxMoveTo (x, y) {
  ctx.moveTo(x + dx, dy - y)
}
