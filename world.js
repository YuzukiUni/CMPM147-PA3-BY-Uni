"use strict";
/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/
function p3_preload() {}
function p3_setup() {}
let worldSeed;
function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}
function p3_tileWidth() {
  return 64;
}
function p3_tileHeight() {
  return 64;
}
let [tw, th] = [p3_tileWidth(), p3_tileHeight()];
let clicks = {};
function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}
function p3_drawBefore() {}
function p3_drawTile(i, j) {
noStroke();
// Create tile which can change it shape.
// Special Thanks: ZhiBin Huang (Provide the suggestions)
// Reference on Class video
let Top = noise(i, j - 1);
let Down = noise(i, j + 1);
let Left = noise(i - 1, j);
let Right = noise(i + 1, j);
//Original Shape
let Original = noise(i, j);
//Learn from PA2
angleMode(DEGREES);
//3 shapes, each shape nearly 1/3
//Reference from Class Sample
//Reference on https://www.geeksforgeeks.org/p5-js-translate-function/
if(Original < 0.33){
  push();
  GroupCircle();
//GroupCircle Get special shape with circle typed
if (Top >= 0.33 && Top < 0.67) {
  translate(64, 0);
  rotate(90);
  ShapeC();
}
if (Down >= 0.33 && Down< 0.67) {
  translate(0, 64);
  rotate(270);
  ShapeC();
}
if(Left >= 0.33 && Left < 0.67) {
  translate(0, 0);
  rotate(0);
  ShapeC();
}
if (Right >= 0.33 && Right < 0.67) {
  translate(64, 64);
  rotate(180);
  ShapeC();
}
 pop();
}
//Shape with white board and X
else if(Original >=0.33&&Original<0.67){
  push();
  drawX();
  pop();
}
else{   
  push();
  GroupSquares();
if(Top >= 0.33 && Top < 0.67) {
//GroupSquares get Special shape with Square typed
translate(64, 0);
rotate(90);
ShapeS();
}
if(Down >= 0.33 && Down< 0.67) {
translate(0, 64);
rotate(270);
ShapeS();
}
if(Left >= 0.33 && Left < 0.67) {
translate(0, 0);
rotate(0);
ShapeS();
}
if(Right >= 0.33 && Right < 0.67) {
translate(64, 64);
rotate(180);
ShapeS();
}
pop(); 
}
  //For Clicking
  let n = clicks[[i, j]] | 0;
  //Reference from Class Sample
  if (n % 2 == 1) {
    if(Original < 0.33){
    //clicked circle's color randomly (learned from PA2)
    fill(random(0, 255), random(0,255), random(0,255));
    noStroke();
    rect(3.5*th/8, 3.5*tw/8, 10, 10);
}
  else if(Original>=0.33&&Original<0.67){
  stroke(random(0, 255), random(0,255), random(0,255));
  strokeWeight(1);
  beginShape();
  line(22,32,42,32);
  line(32,22,32,42);
  endShape();
}
  else{
    fill(random(0, 255), random(0,255), random(0,255));
    noStroke();
    ellipse(th/2, tw/2, 10, 10);
}
}
  pop();
}
function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 102, 0, 128);
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}
function p3_drawAfter() {
}
function GroupCircle(){
  fill(204,204,204);
  noStroke();
  rect(0, 0, th, tw);
// Draw three Circle
  fill(51,51,51);
  beginShape();
  ellipse(th/2,tw/2,16,16);
  stroke(10);
  endShape(CLOSE);
  fill("rgba(51,51,51,0.75)");
  beginShape();
  ellipse(th/2,tw/2,32,32);
  stroke(10);
  endShape(CLOSE);
  fill("rgba(51,51,51,0.5)");
  beginShape();
  ellipse(th/2,tw/2,48,48);
  stroke(10);
  endShape(CLOSE);
  //drow '+'
  stroke('#333333');
  strokeWeight(1);
  strokeCap(ROUND);
  line(th/2,tw,32,32);
  line(th,tw/2,32,32);
  line(0,tw/2,32,32);
  line(tw/2,0,32,32);
}
function GroupSquares(){
  fill(204,204,204,);
  noStroke();
  rect(0, 0, th, tw);
  //Draw Groups of Squares
  beginShape();
  stroke(51,51,51);
  line(tw/8, th/8, 7*tw/8, th/8);
  line(7*tw/8, th/8, 7*tw/8, 7*th/8);
  line(7*tw/8, 7*th/8, tw/8, 7*th/8);
  line(tw/8, 7*th/8, tw/8, th/8);
  endShape(CLOSE);
  beginShape();
  stroke(51,51,51);
  line(tw/4, th/4, 3*tw/4, th/4);
  line(3*tw/4, th/4, 3*tw/4, 3*th/4);
  line(3*tw/4, 3*th/4, tw/4, 3*th/4);
  line(tw/4, 3*th/4, tw/4, th/4);
  endShape(CLOSE);
  beginShape();
  stroke(51,51,51);
  line(3*tw/8, 3*th/8, 5*tw/8, 3*th/8);
  line(5*tw/8, 3*th/8, 5*tw/8, 5*th/8);
  line(5*tw/8, 5*th/8, 3*tw/8, 5*th/8);
  line(3*tw/8, 5*th/8, 3*tw/8, 3*th/8);
  endShape(CLOSE);
  beginShape();
  stroke(51,51,51);
  line(th/2,tw,32,32);
  line(th,tw/2,32,32);
  line(0,tw/2,32,32);
  line(tw/2,0,32,32);
  endShape(CLOSE);
}
//Creating main Background
function drawX(){
  //background
  fill(204,204,204);
  noStroke();
  rect(0, 0, th, tw);
  beginShape();
  stroke('#333333');
  strokeWeight(2);
  strokeCap(ROUND);
  line(0,0,64,64);
  line(0,64,64,0);
  endShape(CLOSE);
}
//I want to make 4th shape in my plan, and finally give up lmao
/*function drawStar(){
  fill(255,204,0);
  textSize(16);
  text("☆",tw/2,th/2);
}*/
//for shaping Group Squares
//Reference on : https://www.alpharithms.com/how-to-draw-a-squiggly-line-in-p5js-or-processing-120715/
function ShapeC() {
stroke(random(0,255),random(0,255),random(0,255));
strokeWeight(5);
beginShape();
line(0,0,0,8);
line(0,8,8,8);
line(8,8,8,16);
line(8,16,0,16);
line(0,16,0,24);
line(0,24,8,24);
line(8,24,8,32);
line(8,32,0,32);
line(0,32,0,40);
line(0,40,8,40);
line(8,40,8,48);
line(8,48,0,48);
line(0,48,0,56);
line(0,56,8,56);
line(8,56,8,64);
line(8,64,0,64);
endShape();
}
//for shaping Group Circles 
//Reference:https://www.youtube.com/watch?v=VvUIOQmLdxI
function ShapeS() {
 fill(random(0,255),random(0,255),random(0,255));
  noStroke();
  beginShape();
  vertex(0,0);
  vertex(0,8);
  vertex(8, 8);
  vertex(8, 16);
  vertex(0, 16);
  vertex(0, 24);
  vertex(8, 24);
  vertex(8, 32);
  vertex(0, 32);
  vertex(0,40);
  vertex(8, 40);
  vertex(8, 48);
  vertex(0, 48);
  vertex(0, 56);
  vertex(8, 56);
  vertex(8, 64);
  vertex(0, 64);
  endShape();
}

