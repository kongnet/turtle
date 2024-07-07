class Turtle {
  constructor (option = {}) {
    const defOption = {
      debug: false,
      nowProcName: '_mainproc',
      mainProcName: '_mainproc',
      stepSize: 10,
      nowX: 0,
      nowY: 0,
      nowDir: Math.PI / 2, //初始化角度
      isPenDown: true,
      animate: 0 // 每毫秒执行多少次
    }
    Object.assign(defOption, option)
    Object.assign(this, defOption)

    this.proc = { [this.nowProcName]: [], runQueue: [] }
    ctxMove(this.nowX, this.nowY)
    const me = this
    const drawTurtle = (
      nowX = this.nowX,
      nowY = this.nowY,
      nowDir = this.nowDir
    ) => {
      ctxTurtle.clearRect(0, 0, canvasTurtle.width, canvasTurtle.height)
      ctxTurtle.beginPath()
      ctxMoveTo(nowX, nowY, ctxTurtle)
      let dir1 = nowDir - (((20 * Math.PI) / 180) % (2 * Math.PI))
      let x1 = nowX + Math.cos(dir1) * -10
      let y1 = nowY + Math.sin(dir1) * -10
      ctxlineTo(x1, y1, ctxTurtle)

      ctxMoveTo(nowX, nowY, ctxTurtle)
      let dir2 = nowDir
      let x2 = nowX + Math.cos(dir2) * -15
      let y2 = nowY + Math.sin(dir2) * -15
      ctxlineTo(x2, y2, ctxTurtle)

      ctxMoveTo(nowX, nowY, ctxTurtle)
      let dir3 = nowDir - (((-20 * Math.PI) / 180) % (2 * Math.PI))
      let x3 = nowX + Math.cos(dir3) * -10
      let y3 = nowY + Math.sin(dir3) * -10
      ctxlineTo(x3, y3, ctxTurtle)
      ctxTurtle.closePath()
      ctxTurtle.stroke()
    }
    this.drawTurtle = drawTurtle
    if (this.animate && this.animate > 0) {
      let nn = 0
      setInterval(function () {
        nn++
        for (let i = 0; i < me.animate; i++) {
          let task = me.proc['runQueue'].shift()
          if (!task) {
            return
          }
          ;[me.nowX, me.nowY, me.nowDir] = task(me.nowX, me.nowY, me.nowDir)
        }
        nn %= 10000
        ctx.stroke()
        drawTurtle()
      }, 1)
    }
  }
  fd (n) {
    const me = this
    let fn = function (x0, y0, dir0) {
      me.debug && console.log(n > 0 ? '前进' : '后退', Math.abs(n), '步')
      let x1 = x0 + Math.cos(dir0) * n * me.stepSize
      let y1 = y0 + Math.sin(dir0) * n * me.stepSize
      me.isPenDown ? ctxlineTo(x1, y1) : ctxMoveTo(x1, y1)
      return [x1, y1, dir0]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  bk (n) {
    return this.fd(-n)
  }
  rt (n) {
    const me = this
    let fn = function (x0, y0, dir0) {
      me.debug && console.log(n > 0 ? '顺时针' : '逆时针', Math.abs(n), '度')
      dir0 -= ((n * Math.PI) / 180) % (2 * Math.PI)
      return [x0, y0, dir0]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  lt (n) {
    return this.rt(-n)
  }
  pd () {
    const me = this
    let fn = function (x0, y0, dir0) {
      me.debug && console.log('落笔')
      me.isPenDown = true
      return [x0, y0, dir0]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  pu () {
    const me = this
    let fn = function (x0, y0, dir0) {
      me.debug && console.log('抬笔')
      me.isPenDown = false
      return [x0, y0, dir0]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  color (col = '#000000') {
    const me = this
    let fn = function () {
      me.debug && console.log('设置颜色为', col)
      ctx.strokeStyle = col
      ctx.beginPath()
      return [x0, y0, me.nowDir]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  fill (col = '#000000') {
    const me = this
    let fn = function () {
      me.debug && console.log('填充颜色为', col)
      ctx.fillStyle = col
      ctx.fill()
      ctx.beginPath()
      return [x0, y0, me.nowDir]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  setxy (x0, y0) {
    const me = this
    let fn = function () {
      me.debug && console.log('移动到', x0, y0)
      ctxMove(x0, y0)
      return [x0, y0, me.nowDir]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  move (x0, y0) {
    const me = this
    let fn = function () {
      me.debug && console.log('移动到', x0, y0)
      ctxlineTo(x0, y0)
      return [x0, y0, me.nowDir]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  home () {
    const me = this
    let fn = function () {
      me.debug && console.log('回家')
      me.nowDir = Math.PI / 2
      me.nowX = 0
      me.nowY = 0
      me.isPenDown = true
      ctxMove(0, 0)
      return [0, 0, me.nowDir]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  cs () {
    const me = this
    let fn = function () {
      me.debug && console.log('clear')
      ctx.beginPath()
      ctx.closePath()
      ctx.stroke()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctxMove(me.nowX, me.nowY)
      return [me.nowX, me.nowY, me.nowDir]
    }
    this.proc[this.nowProcName].push(fn)
    return this
  }
  run () {
    this.debug &&
      console.log(
        '====',
        this.nowProcName === '_mainproc'
          ? 'main proc'
          : this.nowProcName + '过程',
        '===='
      )
    if (this.animate && this.animate > 0) {
      this.proc['runQueue'] = [
        ...this.proc['runQueue'],
        ...this.proc[this.nowProcName]
      ]
    } else {
      for (let i = 0; i < this.proc[this.nowProcName].length; i++) {
        ;[this.nowX, this.nowY, this.nowDir] = this.proc[this.nowProcName][i](
          this.nowX,
          this.nowY,
          this.nowDir
        )
      }
      ctx.stroke()
    }

    let me = this
    return this
  }
  go () {
    this.run()
    this.proc[this.nowProcName].length = 0
    if (this.animate && this.animate > 0) {
      this.drawTurtle(this.nowX, this.nowY, this.nowDir)
    }
    return this
  }
  add (procName) {
    if (!this.proc[procName]) {
      return this
    }
    this.proc[this.nowProcName] = [
      ...this.proc[this.nowProcName],
      ...this.proc[procName]
    ]
    return this
  }
  repeat (n = 1) {
    let a = []
    for (let i = 0; i < n; i++) {
      a.push(...this.proc[this.nowProcName])
    }
    this.proc[this.nowProcName] = a
    return this
  }

  to (procName = '_mainproc') {
    this.nowProcName = procName
    this.proc[procName] = this.proc[procName] || []
    return this
  }
  get list () {
    return Object.keys(this.proc)
  }
}
