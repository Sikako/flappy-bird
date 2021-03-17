document.addEventListener('DOMContentLoaded' , ()=> {
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
          ((birdLeft+60>=obstacleLeft && birdLeft<obstacleLeft+60) && ( birdBottom+45 >= obstacleBotton+gap-158 || birdBottom <= 360 - (150 - obstacleBotton))) || //����U�� �W��-(�a�O��-���a)
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
    isGameOver = true
    document.removeEventListener('keyup', control)
    document.querySelector('.sky').style.backgroundColor = 'black'
  }

  function counting(){
    sec[3]+=1
    if(sec[3]>9){
      sec[2] += 1
      sec[3] = 0
    }
    if(sec[2]>5){
      sec[1] += 1
      sec[2] = 0
    }

    }
  }
  if(!isGameOver){
    setInterval(counting, 17)
  } 




})

  
