document.addEventListener('DOMContentLoaded' , ()=> {
  
  //初始化變數 
  var minute,second;//分 秒 
  minute=second=0;//初始化 
  var millisecond=0;//毫秒 
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')
  const time = document.querySelector('.time')
  
  var sec = [0,0,0,0]
  let birdLeft = 220
  let birdBottom = 100
  let gravity = 2
  let isGameOver = false
  let gap = 500
  
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
  
  document.addEventListener('keyup', control)
  
  function generateObstable(){
    let obstacleLeft = 500
    let randomHeight = Math.random() * 80
    let obstacleBotton = randomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    if(!isGameOver) {
      obstacle.classList.add('obstacle')
      topObstacle.classList.add('topObstacle')
    }
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)
    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBotton + 'px'
    topObstacle.style.bottom = obstacleBotton + gap + 'px'
    
    function moveObstacle(){
      obstacleLeft -= 2
      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'
      
      if (obstacleLeft === 10){
        clearInterval(timerId)
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
      }
      
      //bird dead
      if(
        ((birdLeft+60>=obstacleLeft && birdLeft<obstacleLeft+60) && ( birdBottom+45 >= obstacleBotton+gap-158 || birdBottom <= 360 - (150 - obstacleBotton))) || //撞到下面 柱長-(地板高-離地)
        birdBottom === 0
        ){
          gameOver()
          clearInterval(timerId)
        }
      }
      const timerId = setInterval(moveObstacle, 20)
      if(!isGameOver) setTimeout(generateObstable, 3000)
    }
    generateObstable()
    
    function gameOver(){
      clearInterval(gameTimerId)
      clearInterval(int)
      isGameOver = true
      document.removeEventListener('keyup', control)
      document.querySelector('.sky').style.backgroundColor = 'black'
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
    } //暫停函式 function stop() { window.clearInterval(int); }
    var int =setInterval(timer,50);//每隔50毫秒執行一次timer函式 
    
    
    
    
    
})

  
