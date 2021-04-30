
document.addEventListener('DOMContentLoaded' , ()=> {                 //網頁加載完開始執行
  
  //初始化變數 
  var minute,second;//分 秒 
  minute=second=0;//初始化 
  var millisecond=0;//毫秒 
  const bird = document.querySelector('.bird')                        
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')
  const time = document.querySelector('.time')
  const audio = document.getElementById("audio");
  const Daudio = document.getElementById("Daudio");


  let birdLeft = 220                                      //主角跟左邊框距離
  let birdRight = birdLeft+60                             //+ num (num : 主角寬度)
  let birdBottom = 100                                    //離地高度
  let gravity = 2                                         //重力強度
  let isGameOver = false
  let gap = 150                                           //上下水管的空隙
  
  function startGame(){
    birdBottom -= gravity                                 //主角往下掉   
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
  }
  let gameTimerId = setInterval(startGame, 20)            //每20毫秒執行一次
  
  function control(e){
    if(e.keyCode === 32){                                 //當按了空白鍵
      for(let i=0; i<50; i++){                            //往上跳
        setTimeout(jump(),1000)
        
      }
    }
  }
  
  
  function jump(){
    if(birdBottom < 500)birdBottom += 1                 //判斷主角有沒有超出螢幕
    bird.style.bottom = birdBottom
  }
  
  function randomValue(v){
    return Math.floor((Math.random() * v) + 1)          //輸出 1~v的隨機數
  }

  document.addEventListener('keyup', control)           //偵測按鍵盤事件
  
  function generateObstable(){                          //生成背景
    let obstacleLeft = 500                              //水管初始位置
    let cloudLeft = 600                                 //雲初始位置
    let cloudTop = 100 + randomValue(100)               //雲高度 101 ~ 200
    
    let randomHeight = randomValue(80)                  //水管高度 1~80
    let obstacleBotton = randomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    const cloud = document.createElement('div')
    
    //加class
    if(!isGameOver) {
      obstacle.classList.add('obstacle')
      topObstacle.classList.add('topObstacle')
      cloud.classList.add('cloud')
    }
    //創建物件
    gameDisplay.appendChild(cloud)
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)


    //設定參數
    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBotton + 'px'
    topObstacle.style.bottom = 360 + obstacleBotton + gap + randomValue(60) + 'px'
    cloud.style.top = cloudTop + 'px'
    cloud.style.left = cloudLeft + 'px'
    


    // 印出測試值 F12 console
    console.log("bird top: "+ (birdBottom+45+150).toString())
    console.log("topobstacle: " + topObstacle.style.bottom)
    console.log("opstacleLeft: " + obstacleLeft)
    console.log("birdLeft: " + birdLeft)
    console.log("random: " + randomValue(10))


    //讓雲動
    function moveCloud(){
      cloudLeft -= 1
      cloud.style.left = cloudLeft + 'px'

      // 雲出屏幕就remove掉
      if (cloudLeft === 0){
        gameDisplay.removeChild(cloud)
      }
    }

    //讓水管動
    function moveObstacle(){
      obstacleLeft -= 2

      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'

 
      // 水管出屏幕就remove掉     
      if (obstacleLeft === 0){
        gameDisplay.removeChild(topObstacle)
        gameDisplay.removeChild(obstacle)
        
      }
      

      //bird dead
      if(
        ((birdRight+15 >= obstacleLeft && birdLeft+10 < obstacleLeft+60) && ( birdBottom+45+150+17 >= parseInt(topObstacle.style.bottom)  || birdBottom +20 <= 360 - (150 - obstacleBotton))) || //撞到下面 柱長-(地板高-離地)
        // 頭撞到水管 || 屁股撞到水管 || 屁股撞地板
        birdBottom+20 === 0
        ){
          gameOver()
          clearInterval(timerObstacle)    //清除INTERVAL
          clearInterval(timerCloud)
        }
    }
    // 遊戲速度
    const timerObstacle = setInterval(moveObstacle, 20- (second/10)*0.5 - minute*2.9) //隨遊戲時間變快
    const timerCloud = setInterval(moveCloud, 30 - randomValue(20))                   //每個雲速度不同 10~29
    if(!isGameOver){
      setTimeout(generateObstable, 3000)                                              //每3秒生成水管
    } 
  }
  generateObstable()
    
  function gameOver(){
      clearInterval(gameTimerId)                //清除INTERVAL
      clearInterval(int)
      isGameOver = true
      document.removeEventListener('keyup', control)    //按空白鍵也不會反應
      let ch = setInterval(changeSky, 50);              //每50毫秒換天空顏色
      // document.querySelector('.sky').style.backgroundColor = 'black'
      audio.pause()                                     //開始音樂暫停
      Daudio.play();                                    //死亡音樂播放
      setTimeout(() => { Daudio.pause(); clearInterval(ch);}, 5000);    //死亡音樂播5秒
  }
  

  // 計時
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
  
  
  
  function changeSky(){
    const sky = document.querySelector('.sky');
    var color = 'rgb('+randomValue(255).toString()+','+randomValue(255).toString()+','+randomValue(255).toString()+')';         //隨機生成天空顏色
    sky.style.backgroundColor = color;//rgb(r,g,b)
    console.log(color)
  }
    
    
})

var isStart = false;
document.addEventListener('keypress', ()=>{         //按按鍵開始撥放
  const audio = document.getElementById("audio");
  if(!isStart){
    audio.currentTime = 30;                         //從第30秒開始撥放
    audio.play();
    isStart = true;
  }
})
  