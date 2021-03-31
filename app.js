
document.addEventListener('DOMContentLoaded' , ()=> {
  
  //��l���ܼ� 
  var minute,second;//�� �� 
  minute=second=0;//��l�� 
  var millisecond=0;//�@�� 
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')
  const time = document.querySelector('.time')
  const audio = document.getElementById("audio");
  const Daudio = document.getElementById("Daudio");


  let birdLeft = 220
  let birdRight = birdLeft+60
  let birdBottom = 100
  let gravity = 2
  let isGameOver = false
  let gap = 150
  
  function startGame(){
    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
  }
  let gameTimerId = setInterval(startGame, 20)
  
  function control(e){
    if(e.keyCode === 32){
      for(let i=0; i<10; i++){
        setInterval(jump(),100)
      }
    }
  }
  
  
  function jump(){
    if(birdBottom < 500)birdBottom += 5
    bird.style.bottom = birdBottom
  }
  
  function randomValue(v){
    return Math.floor((Math.random() * v) + 1)
  }

  document.addEventListener('keyup', control)
  
  function generateObstable(){
    let obstacleLeft = 500
    let cloudLeft = 600
    let cloudTop = 100 + randomValue(100)
    
    let randomHeight = randomValue(80)
    let obstacleBotton = randomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    const cloud = document.createElement('div')

    if(!isGameOver) {
      obstacle.classList.add('obstacle')
      topObstacle.classList.add('topObstacle')
      cloud.classList.add('cloud')
    }
    gameDisplay.appendChild(cloud)
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)

    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBotton + 'px'
    topObstacle.style.bottom = 360 + obstacleBotton + gap + randomValue(60) + 'px'
    cloud.style.top = cloudTop + 'px'
    cloud.style.left = cloudLeft + 'px'
    
    console.log("bird top: "+ (birdBottom+45+150).toString())
    console.log("topobstacle: " + topObstacle.style.bottom)
    console.log("opstacleLeft: " + obstacleLeft)
    console.log("birdLeft: " + birdLeft)
    console.log("random: " + randomValue(10))

    function moveCloud(){
      cloudLeft -= 1
      cloud.style.left = cloudLeft + 'px'

      if (cloudLeft === 0){
        gameDisplay.removeChild(cloud)
      }
    }

    function moveObstacle(){
      obstacleLeft -= 2

      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'

      if (obstacleLeft === 0){
        gameDisplay.removeChild(topObstacle)
        gameDisplay.removeChild(obstacle)
        
      }
      

      //bird dead
      if(
        ((birdRight+15 >= obstacleLeft && birdLeft+10 < obstacleLeft+60) && ( birdBottom+45+150+17 >= parseInt(topObstacle.style.bottom)  || birdBottom +20 <= 360 - (150 - obstacleBotton))) || //����U�� �W��-(�a�O��-���a)
        birdBottom+20 === 0
        ){
          gameOver()
          clearInterval(timerObstacle)
          clearInterval(timerCloud)
        }
    }
    // �C���t��
    const timerObstacle = setInterval(moveObstacle, 20- (second/10)*0.5 - minute*2.9)
    const timerCloud = setInterval(moveCloud, 30 - randomValue(20))
    if(!isGameOver){
      setTimeout(generateObstable, 3000)
    } 
  }
  generateObstable()
    
  function gameOver(){
      clearInterval(gameTimerId)
      clearInterval(int)
      isGameOver = true
      document.removeEventListener('keyup', control)
      let ch = setInterval(changeSky, 50); 
      // document.querySelector('.sky').style.backgroundColor = 'black'
      audio.pause()
      Daudio.play();
      setTimeout(() => { Daudio.pause(); clearInterval(ch);}, 5000);
  }
  
  function timer() { 
    millisecond=millisecond+50;
    if(millisecond>=1000) { 
      millisecond=0; 
      second=second+1; 
    }if(second>=60) { 
      second=0; 
      minute=minute+1; 
    }if(minute>=60) { 
      minute=0;
    }
    time.innerHTML = minute+':'+second+':'+millisecond;
  } //�Ȱ��禡 function stop() { window.clearInterval(int); }
  var int =setInterval(timer,50);//�C�j50�@�����@��timer�禡 
  
  
  
  function changeSky(){
    const sky = document.querySelector('.sky');
    var color = 'rgb('+randomValue(255).toString()+','+randomValue(255).toString()+','+randomValue(255).toString()+')';
    sky.style.backgroundColor = color;//ffffff
    console.log(color)
  }
    
    
})

var isStart = false;
document.addEventListener('keypress', ()=>{
  const audio = document.getElementById("audio");
  if(!isStart){
    audio.currentTime = 30;
    audio.play();
    isStart = true;
  }
})
  