import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

let canvas: HTMLCanvasElement = document.createElement("canvas");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
canvas.style.cssText = '    display: block;margin-top: 20px;border-style: solid'
canvas.setAttribute("width", "600");
canvas.setAttribute("height", "500");

interface protoData {
  type: string
  startPointX: string
  startPointY: string
  endPointX: string
  endPointY: string
  extraTriPointX: string
  extraTriPointY: string
  cir: string
  fill: string
  r: string
  ry: string
  rx: string
}
@Component({
  selector: 'app-mycanvas',
  templateUrl: './mycanvas.component.html',
  styles: ['mycanvas.component.scss']
})
export class MycanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ngOnInit(): void {
    document.body.appendChild(canvas);
  }
  animate(string: string): void {
    let cord = string.split(' -b ')[0].split(' -c ')[0].split(' -r2 ')[0].split(' -r1 ')[0].split(' -r ')[0].split(' -p ')[1].split(/[^a-zA-Z0-9]/)
    let filtered = cord.filter(function (el) {
     return el != '';
   });
    let data: protoData = {
      type: string.split(' -b ')[0].split(' -c ')[0].split(' -r2 ')[0].split(' -r1 ')[0].split(' -r ')[0].split(' -p ')[0],
      startPointX: filtered[0],
      startPointY: filtered[1],
      endPointX: filtered[2],
      endPointY: filtered[3],
      extraTriPointX: filtered[4],
      extraTriPointY: filtered[5],
      cir: string.split(' -b ')[0].split(' -c ')[1],
      fill: string.split(' -b ')[1],
      r: string.split(' -b ')[0].split(' -c ')[0].split(' -r2 ')[0].split(' -r1 ')[0].split(' -r ')[1],
      ry: string.split(' -b ')[0].split(' -c ')[0].split(' -r2 ')[0].split(' -r1 ')[1],
      rx: string.split(' -b ')[0].split(' -c ')[0].split(' -r2 ')[1],

    }

    string = data.type;
    if(data.type === 'line'){
      ctx.fillStyle = data.cir;
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.moveTo(+data.startPointX, +data.startPointY);
      ctx.lineTo(+data.endPointX, +data.endPointY);
      ctx.stroke();
      ctx.fill();
    } else if(data.type === 'rectangle'){
      ctx.fillStyle =  data.fill;
      ctx.fillRect(+data.startPointX, +data.startPointY, +data.endPointX - +data.startPointX, +data.endPointY - +data.startPointY);
      ctx.fill();
    } else if(data.type === 'triangle'){
      ctx.fillStyle = data.fill;
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.moveTo(+data.startPointX, +data.startPointY);
      ctx.lineTo(+data.endPointX, +data.endPointY);
      ctx.lineTo(+data.extraTriPointX, +data.extraTriPointY);
      ctx.lineTo(+data.startPointX, +data.startPointY);
      ctx.stroke();
      ctx.fill();
    } else if(data.type === 'circle'){
      ctx.fillStyle = data.fill;
      ctx.beginPath();
      ctx.arc(+data.startPointX, +data.startPointY, +data.r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    } else if(data.type === 'ellipse'){
      ctx.fillStyle = data.fill;
      ctx.beginPath();
      ctx.ellipse(+data.startPointX, +data.startPointY, +data.rx,+data.ry, Math.PI / 2, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    } 
  }
  clear(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
