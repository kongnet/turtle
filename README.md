# Turtle

> Simulate Turtle Geometry
> Like logo languare fd() bk() rt() lt()
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
t.to('t0').fd(0.1).rt(2).repeat(90)
t.to('t1').fd(0.1).lt(2).repeat(90)
t.to().add('t0').add('t1').rt(90).repeat(4).rt(36).repeat(10).go()
```

- baseDemo1 regular polygon
- baseDemo2 regular star polygon
- baseDemo3 constant velocity helix + golden spiral
- baseDemo4 variable speed helix
- baseDemo5 Koch curve
- baseDemo6 Fractal Tree
- baseDemo7 Sierpinski triangle

![screenshot](https://github.com/kongnet/turtle/blob/main/screenshot/s1.png)
