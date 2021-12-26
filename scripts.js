let x1, y1;
// let isPainting = false;
// let penSize = 10;

// ctx.font = "30px Arial";
//let currentSize = document.getElementById("pen-size").value;
//let currentColor = document.getElementById("color-tab").value;
//  let isPainting = false;

//get access to canvas element
let canvas = document.getElementById("canvas");
let itemSelected = false;
//create drawing object
let ctx = canvas.getContext("2d");
//condition that mouse clicked or not
let isPainting = false;
//for soft brush paint
ctx.lineJoin = "round";
ctx.lineCap = "round";
//pensize
let penSize = document.getElementById("pen-size");
ctx.lineWidth = penSize.value;
console.log(penSize.value);
//mouse position tracking on canvas
let positionX, positionY;

//html element
let brush = document.getElementById("brush");
let eraser = document.getElementById("eraser");
let resetBtn = document.getElementById("reset-btn");
let downloadLink = document.getElementById("btn-uploadImage-url");
let btnUploadImage = document.getElementById("btn-uploadImage-uri");
let circleMaker = document.getElementById("circleMaker");
let penColor = document.getElementById("colorTab");
let lineralMaker = document.getElementById("lineralMaker");
let recMaker = document.getElementById("recMaker");
let txtMaker = document.getElementById("txtMaker");
let txtMakerInput = document.getElementById("txtMakerInput");
let txtMakerFontSelect = document.getElementById("txtMakerFontSelect");
let txtMakerFontSize = document.getElementById("txtMakerFontSize");

//get coordination from
const getCoordinates = (canvas, e) => {
  //get positions from canvas ,not viewPort
  let rect = canvas.getBoundingClientRect();
  //returns x,y in object to mouseDown event
  return {
    x: parseInt(e.clientX - rect.left),
    y: parseInt(e.clientY - rect.top),
  };
};

const mouseDown = (e) => {
  isPainting = true;
  //find coordinates
  var coord = getCoordinates(canvas, e);
  //get local positions to global poss
  positionX = coord.x;
  positionY = coord.y;

  let penColor = document.getElementById("colorTab");
  // canvas.style.cursor = "auto";
  ctx.beginPath();
  ctx.moveTo(positionX, positionY);
  ctx.lineTo(positionX, positionY);
  ctx.lineWidth = penSize.value;
  // ctx.fillRect(positionX,positionY,20,20);
  // ctx.arc(positionX,positionY,50,0,Math.PI*2,false);
  // ctx.strokeStyle = penColor.value;
  ctx.stroke();
  console.log(positionX, positionY);
  // console.log(penColor.value);
};

const brushDown = (canvas, posx, posy) => {
  if (isPainting) {
    ctx.lineTo(posx, posy);
    ctx.stroke();
    canvas.style.cursor = "pointer";
  }
};

const mouseMove = (e) => {
  var coord = getCoordinates(canvas, e);
  positionX = coord.x;
  positionY = coord.y;
  brushDown(canvas, positionX, positionY);
};
const mouseUp = (e) => {
  isPainting = false;
  e.preventDefault();
};
const cancelBrush = (e) => {
  canvas.style.cursor = "auto";
  e.preventDefault();
  console.log("cancel brush called");
};

//draw circle
const circleDown = (e) => {
  let coord = getCoordinates(canvas, e);
  if (isPainting == false) {
    canvas.style.cursor = "move";
    x1 = coord.x;
    y1 = coord.y;
    isPainting = true;
  } else if (isPainting) {
    //ctx.clearRect(x1,y1,canvas.width,canvas.height);
    positionX = coord.x;
    positionY = coord.y;
    ctx.save();
    ctx.beginPath();
    let scaleX = 1 * ((positionX - x1) / 2);
    let scaleY = 1 * ((positionY - y1) / 2);
    ctx.scale(scaleX, scaleY);
    let centerX = x1 / scaleX + 1;
    let centerY = y1 / scaleY + 1;
    ctx.arc(centerX, centerY, 1, 0, 2 * Math.PI);
    ctx.restore();
    ctx.lineWidth = penSize.value / 10;
    ctx.strokeStyle = penColor.value;
    ctx.stroke();
    isPainting = false;
  }

  //console.log(positionX, positionY);
};

const circleUp = (e) => {
  // isPainting = false;
};

//line Start
const lineStart = (e) => {
  let coord = getCoordinates(canvas, e);
  if (isPainting == false) {
    x1 = coord.x;
    y1 = coord.y;
    canvas.style.cursor = "move";
    isPainting = true;
  } else if (isPainting == true) {
    positionX = coord.x;
    positionY = coord.y;
    ctx.beginPath();
    ctx.lineWidth = penSize.vale;
    ctx.moveTo(x1, y1);
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
    ctx.closePath();
    isPainting = false;
  }
};

const recDown = (e) => {
  let coord = getCoordinates(canvas, e);
  if (isPainting == false) {
    x1 = coord.x;
    y1 = coord.y;
    canvas.style.cursor = "move";
    isPainting = true;
  } else if (isPainting == true) {
    positionX = coord.x;
    positionY = coord.y;
    ctx.beginPath();
    ctx.lineWidth = penSize.vale / 10;
    ctx.rect(x1, y1, positionX - x1, positionY - y1);
    ctx.stroke();
    isPainting = false;
  }
};

const txtDown = (e) => {
  let coord = getCoordinates(canvas, e);

  positionX = coord.x;
  positionY = coord.y;
  let txt = txtMakerInput.value;
  let txtSize = parseInt(txtMakerFontSize.value);
  ctx.font = `${txtSize}px  ${txtMakerFontSelect.value}`;
  ctx.fillText(txt, positionX, positionY);
};
//tools event listener

//brusher
function addBrush(e) {
  itemSelected = !itemSelected;
  if (itemSelected) {
    ctx.strokeStyle = penColor.value;
    brush.style.border = `3px solid ${penColor.value}`;
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    console.log(itemSelected);
  } else if (itemSelected == false) {
    console.log(itemSelected, "item deselected");
    brush.style.border = ``;
    brush.removeEventListener("click", addBrush, true);
    brush.removeEventListener("click", mouseMove);
    brush.removeEventListener("click", mouseUp);
    canvas.removeEventListener("mousedown", mouseDown, false);
    canvas.removeEventListener("mousemove", mouseMove, false);
    canvas.removeEventListener("mouseup", mouseUp, false);
    canvas.style.cursor = "auto";
    brush.removeAttribute("click");
  }
}

brush.addEventListener("click", addBrush);
brush.removeEventListener("dblclick", mouseDown);
brush.removeEventListener("dblclick", addBrush);

//create a line
lineralMaker.addEventListener("click", (e) => {
  itemSelected = !itemSelected;
  if (itemSelected) {
    ctx.strokeStyle = penColor.value;
    lineralMaker.style.border = `3px solid ${penColor.value}`;
    canvas.addEventListener("mousedown", lineStart, false);
  } else if (itemSelected == false) {
    canvas.style.cursor = "auto";
    lineralMaker.style.border = ``;
    canvas.removeEventListener("mousedown", lineStart, false);
    e.preventDefault();
  }
});

//eraser
eraser.addEventListener("click", () => {
  itemSelected = !itemSelected;
  if (itemSelected) {
    let eraserColor = "#ffffff";
    ctx.strokeStyle = eraserColor;
    eraser.style.border = "3px solid #ffffff";
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("mouseup", mouseUp, false);
  } else if (itemSelected == false) {
    eraser.style.border = "";
    canvas.style.cursor = "auto";
    canvas.removeEventListener("mousedown", mouseDown, false);
    canvas.removeEventListener("mousemove", mouseMove, false);
    canvas.removeEventListener("mouseup", mouseUp, false);
  }
});

//eventlistener for circle making
circleMaker.addEventListener("click", (e) => {
  itemSelected = !itemSelected;
  if (itemSelected) {
    ctx.strokeStyle = penColor.value;
    circleMaker.style.border = `3px solid ${penColor.value}`;
    canvas.addEventListener("mousedown", circleDown, false);
    // canvas.addEventListener("mousemove", circleMove, false);
    canvas.addEventListener("mouseup", circleUp, false);
  } else if (itemSelected == false) {
    e.stopPropagation();
    circleMaker.style.border = ``;
    canvas.style.cursor = "auto";
    canvas.removeEventListener("mousedown", circleDown, false);
    canvas.removeEventListener("mouseup", circleUp, false);
  }
});

//rectangle maker listenner
recMaker.addEventListener("click", () => {
  itemSelected = !itemSelected;
  if (itemSelected) {
    ctx.strokeStyle = penColor.value;
    recMaker.style.border = `3px solid ${penColor.value}`;
    canvas.addEventListener("mousedown", recDown, false);
    //canvas.addEventListener("mouseup", recUp, false);
  } else if (itemSelected == false) {
    canvas.style.cursor = "auto";
    recMaker.style.border = "";
    canvas.removeEventListener("mousedown", recDown, false);
  }
});

//create text from input to canvas
txtMaker.addEventListener("click", () => {
  itemSelected = !itemSelected;
  if (itemSelected) {
    ctx.strokeStyle = penColor.value;
    txtMaker.style.border = `3px solid ${penColor.value}`;
    canvas.addEventListener("mousedown", txtDown, false);
  } else if (itemSelected == false) {
    canvas.style.cursor = "auto";
    txtMaker.style.border = "";
    canvas.removeEventListener("mousedown", txtDown, false);
  }
});

// show pensize change value
const penSizeValue = () => {
  document.getElementById("pen-size-label").innerHTML = `Pen-size : ${
    document.getElementById("pen-size").value
  }px `;
};

//reset button
resetBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
});

//get image backgorund from local address
downloadLink.addEventListener("click", () => {
  let imgAddress = prompt("آدرس محلی عکس خود را وارد کنید.");
  canvas.style.backgroundImage = `url(${imgAddress})`;
});
//get image background from internet address
btnUploadImage.addEventListener("click", () => {
  let imgAddress = prompt("آدرس اینترنتی عکس خود را وارد کنید.");
  canvas.style.backgroundImage = `url(${imgAddress})`;
});

// const mousePosition = (canvas,event)=>{
// let rec = canvas.getBoundingClientRect();
// let x = event.clientX  - rec.left;
// let y = event.clientY - rec.top;
// console.log(x,y);
// ctx.beginPath();
// //ctx.moveTo(10, 10);
// ctx.lineTo(x, y);
// ctx.strokeStyle = "red";
// ctx.stroke();
// ctx.closePath();
// }
//let canvasElem = document.querySelector("canvas");
//canvasElem.addEventListener('mousedown',function(e){mousePosition(canvasElem,e)})

//draw shapes with canvas
// function drawPolly() {
//   ctx.beginPath();
//   ctx.moveTo(10, 10);
//   ctx.lineTo(20, 20);
//   ctx.strokeStyle = "red";
//   ctx.stroke();
//   ctx.closePath();
//   ctx.beginPath();
//   ctx.arc(30,30,10,0,Math.PI*2,false)
//   ctx.fill();
//   ctx.closePath();

// }
