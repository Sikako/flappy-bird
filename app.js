document.addEventListener('DOMContentLoaded' , ()=> {
  
  //初始化變數 
  var minute,second;//分 秒 
  minute=second=0;//初始化 
  var millisecond=0;//毫秒 
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')
  const time = document.querySelector('.time')


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
        ((birdRight >= obstacleLeft && birdLeft < obstacleLeft+60) && ( birdBottom+45+150 >= parseInt(topObstacle.style.bottom)  || birdBottom <= 360 - (150 - obstacleBotton))) || //撞到下面 柱長-(地板高-離地)
        birdBottom === 0
        ){
          gameOver()
          clearInterval(timerObstacle)
          clearInterval(timerCloud)
        }
    }
    const timerObstacle = setInterval(moveObstacle, 20- (second/10)*0.3 - minute*1.8)
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

  
