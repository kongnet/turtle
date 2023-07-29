class Turtle {
  constructor (option = {}) {
    this.debug = option.debug
    this.nowProcName = '_mainproc'
    this.mainProcName = '_mainproc'
    this.proc = { [this.nowProcName]: [] }
    this.nowX = 0
    this.nowY = 0
    this.nowDir = Math.PI / 2 //初始化角度
    this.stepSize = option.stepSize || 10 // 步进比例
    this.isPenDown = true
    this.mainRunArr = []
    ctxMove(this.nowX, this.nowY)
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
    //const func = fn(me.nowX, me.nowY, me.nowDir)
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
  run () {
    this.debug &&
      console.log(
        '====',
        this.nowProcName === '_mainproc'
          ? 'main proc'
          : this.nowProcName + '过程',
        '===='
      )
    for (let task of this.proc[this.nowProcName]) {
      ;[this.nowX, this.nowY, this.nowDir] = task(
        this.nowX,
        this.nowY,
        this.nowDir
      )
    }
    ctx.stroke()
    return this
  }
  go () {
    this.run()
    this.proc[this.nowProcName].length = 0
    return this
  }

  repeat (n = 1) {
    let a = []
    for (let i = 0; i < n; i++) {
      this.proc[this.nowProcName].map(x => {
        a.push(x)
      })
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
    console.log(Object.keys(this.proc))
  }
}
