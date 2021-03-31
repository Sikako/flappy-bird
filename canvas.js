const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 450;

const image1 = new Image()
image1.src = 'canvas.jpg';

image1.addEventListener('load', function(){
  ctx.drawImage(image1, 0, 0);
})