# Turtle

> I enjoy the turtle geometry, so I implemented a simplified version using vanilla JavaScript.

> Simulate Turtle Geometry

- fd() forward
- bk() backward
- rt() right
- lt() left
- pu() penup
- pd() pendown
- repeat()
- setxy() put the turtle at coordinate(x, y)
- home() bring the turtle at the center
- cs() clearscreen

> run() vs go(), go() can clear atction queue, run() not

```javascript
const t = new Turtle({ debug: false })
t.fd(10).rt(90).repeat(4).go() // draw a square
```

```javascript
/*
  combine t0, t1
  t0,t1 can play solo, use t.to('t0').run()
*/
const t = new Turtle({ debug: false })

t.to('t0').fd(0.1).rt(2).repeat(90)
t.to('t1').fd(0.1).lt(2).repeat(90)
t.to().add('t0').add('t1').rt(90).repeat(4).rt(36).repeat(10).go()

console.log(t.list) // ['_mainproc', 't0', 't1']
```

- demo1 regular polygon
- demo2 regular star polygon
- demo3 constant velocity helix + golden spiral
- demo4 variable speed helix
- demo5 Koch curve
- demo6 Fractal Tree
- demo7 Sierpinski triangle
- demo8 Leaf

![screenshot](https://github.com/kongnet/turtle/blob/main/screenshot/s1.png)

## Animation

```javascript
let t = new Turtle({ debug: false, animate: 2 }) // draw speed
t.to('t0').fd(0.1).rt(2).repeat(90) // combine
t.to('t1').fd(0.1).lt(2).repeat(90)
t.to().add('t0').add('t1').rt(90).repeat(4).rt(36).repeat(10).go()
```

![Animation](https://github.com/kongnet/turtle/blob/main/screenshot/s3.gif)

## turtle-maze.html

![Maze](https://github.com/kongnet/turtle/blob/main/screenshot/s2.jpg)

## Programming Learning Syllabus for Elementary Students

![Maze](https://github.com/kongnet/turtle/blob/main/screenshot/s4.png)