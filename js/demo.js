function demo1 (t) {
  function drwaPolygon (n = 3) {
    t.fd(2)
      .rt(360 / n)
      .repeat(n)
      .go()
  }
  for (let i = 3; i < 10; i++) {
    t.setxy(-230 + (i - 3) * 7 * (i - 1), 200).go()
    drwaPolygon(i)
  }
}
function demo2 (t) {
  function drwaPolygon2 (n = 3) {
    t.fd(5)
      .rt(180 - 180 / n)
      .repeat(n)
      .go()
  }
  for (let i = 5; i < 18; i += 2) {
    t.setxy(-230 + (i - 5) * 30, 120).go()
    drwaPolygon2(i)
  }
  t.setxy(200, 180)
  for (let i = 0.1; i < 2; i += 0.05) {
    t.fd(i).rt(144).repeat(5).go()
    t.fd(i).rt(28).go()
  }
}
function demo3 (t) {
  t.home().setxy(-200, 80).go()
  for (let i = 0; i < 58; i++) {
    t.fd(i * 0.03).rt(30)
  }
  t.go()
  t.home().setxy(-140, 80).go()
  for (let i = 0; i < 29; i++) {
    t.fd(0.1 + i * 0.1).rt(60)
  }
  t.go()
  t.home().setxy(-80, 80).go()
  for (let i = 0; i < 20; i++) {
    t.fd(0.25 + i * 0.25).rt(90)
  }
  t.go()
  t.home().setxy(-20, 80).go()
  for (let i = 0; i < 12; i++) {
    t.fd(0.5 + i * 0.5).rt(120)
  }
  t.go()
  t.home().setxy(70, 90).go()

  t.fd(1)
    .rt(120)
    .repeat(3)
    .rt(90)
    .repeat(4)
    .pu()
    .bk(2)
    .pd()
    .rt(60)
    .repeat(6)
    .go()

  t.home().setxy(100, 60).go()
  for (let m = 16; m > 1; m--) {
    for (let i = 1; i < 12; i++) {
      t.fd(1.618 ** m / 6000).rt(5)
    }
  }

  t.go()
  t.home().setxy(210, 80).go()

  t.to('t0').fd(0.2).rt(20).repeat(9) // combine
  t.to('t1').fd(0.2).lt(20).repeat(9)
  t.to().add('t0').add('t1').rt(90).repeat(4).rt(36).repeat(10).go()
}
function demo4 (t) {
  t.home().setxy(-200, -50)
  let nn = 1
  for (let i = 0; i < 100; i++) {
    t.fd(0.8).rt(i * nn * 10)
  }
  t.go()

  t.home().setxy(-120, -50)
  nn = 7
  for (let i = 0; i < 500; i++) {
    t.fd(0.4).rt(i * nn * 1.5)
  }
  t.go()

  // t.home().setxy(0, -50)
  // nn = 19
  // for (let i = 0; i < 1000; i++) {
  //   t.fd(0.6).rt(i * nn)
  // }
  // t.go()
  t.setxy(-40, -50)
  for (let i = 0; i < 1800; i++) {
    t.fd(0.2).rt(i + 0.1)
  }
  t.setxy(50, -50)

  for (let i = 1; i <= 18; i += 2) {
    for (let m = 1; m <= 720; m++) {
      t.fd(i / 40).rt(m)
    }
    t.rt(45)
  }
  t.go()
}
function demo5 (t) {
  t.home().rt(90)

  function kochCurve (lev, size) {
    if (lev < 1) {
      t.fd(size)
      return
    }
    kochCurve(lev - 1, size / 3)
    t.lt(60)
    kochCurve(lev - 1, size / 3)
    t.rt(120)
    kochCurve(lev - 1, size / 3)
    t.lt(60)
    kochCurve(lev - 1, size / 3)
  }
  for (let i = 0; i < 5; i++) {
    t.setxy(-240 + i * 100, 10)
    kochCurve(i, 8)
    t.go()
  }

  // t.rt(120).repeat(3).go()
}
function demo6 (t) {
  t.home().setxy(140, -90).go()
  function drawTree (lev, size) {
    if (lev > 0) {
      t.fd(size).lt(20)
      drawTree(lev - 2, size * 0.7)
      t.rt(40)
      drawTree(lev - 1, size * 0.9)
      t.lt(20).pu().bk(size).pd()
    }
  }
  drawTree(13, 2)
  t.go()
}
function demo7 (t) {
  function tree2 (size, lev, ang) {
    if (lev === 0) {
      return
    }
    t.fd(size)
    tree2(size / 2, lev - 1, ang)
    t.bk(size).rt(ang).fd(size)
    tree2(size / 2, lev - 1, ang)
    t.bk(size).lt(ang).lt(ang).fd(size)
    tree2(size / 2, lev - 1, ang)
    t.bk(size).rt(ang)
  }
  t.home().setxy(-150, -230)
  tree2(6, 6, 30)
  t.home().setxy(-10, -190)
  tree2(4, 7, 120)
  t.home().setxy(150, -190)
  tree2(4, 7, 108)
  t.go()
}
function demo8 (t) {
  function leaf (size, ang) {
    if (size < 0.02) {
      return
    }
    t.fd(size).rt(70 * ang)
    leaf(size / 2, -ang)
    t.lt(70 * ang)
      .fd(size)
      .lt(70 * ang)
    leaf(size / 2, ang)
    t.rt(70 * ang).rt(7 * ang)
    leaf(size - 0.01, ang)
    t.lt(7 * ang).bk(size * 2)
  }
  t.setxy(-220, -230)
  leaf(0.25, 1)
  t.go()
}

function demo9 (t) {
  const n = 10 // times of iterate
  const [len, ang] = [180 / 2 ** n, 90]
  // Dragon Curve
  function dragon (n, len, ang) {
    if (n === 0) {
      t.fd(-len)
    } else {
      dragon(n - 1, len, 90)
      t.rt(ang)
      dragon(n - 1, len, -90)
    }
  }
  t.home().setxy(80, -140)
  dragon(n, len, ang)
  t.go()
}
