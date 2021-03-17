document.addEventListener('DOMContentLoaded' , ()=> {
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')

  let birdLeft = 220
  let birdBottom = 100
  let gravity = 2
  let isGameOver = false

  function startGame(){
    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
  }
  let gameTimerId = setInterval(startGame, 20)

  function control(e){
    if(e.keyCode === 32){
      jump()
    }
  }


  function jump(){
    if(birdBottom < 500)birdBottom += 50
    bird.style.bottom = birdBottom
  }

  document.addEventListener('keyup', control)

  function generateObstable(){
    let obstacleLeft = 500
    let randomHeight = Math.random() * 60
    let obstacleBotton = randomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    if(!isGameOver) {
      obstacle.classList.add('obstacle')
      topObstacle.classList.add('topObstacle')
    }
    gameDisplay.appendChild(obstacle)
    obstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBotton + 'px'
    
    function moveObstacle(){
      obstacleLeft -= 2
      obstacle.style.left = obstacleLeft + 'px'

      if (obstacleLeft === -60){
        clearInterval(timerId)
        gameDisplay.removeChild(obstacle)
      }
      
      //bird dead
      if(
          ((birdLeft+60>=obstacleLeft && birdLeft<obstacleLeft+60) && birdBottom <= 360 - (150 - obstacleBotton)) || //柱長-(地板高-離地)
           
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
})

  
  