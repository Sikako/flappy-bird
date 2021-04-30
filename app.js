
document.addEventListener('DOMContentLoaded' , ()=> {                 //�����[�����}�l����
  
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


  let birdLeft = 220                                      //�D������ضZ��
  let birdRight = birdLeft+60                             //+ num (num : �D���e��)
  let birdBottom = 100                                    //���a����
  let gravity = 2                                         //���O�j��
  let isGameOver = false
  let gap = 150                                           //�W�U���ު��Ż�
  
  function startGame(){
    birdBottom -= gravity                                 //�D�����U��   
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
  }
  let gameTimerId = setInterval(startGame, 20)            //�C20�@�����@��
  
  function control(e){
    if(e.keyCode === 32){                                 //����F�ť���
      for(let i=0; i<50; i++){                            //���W��
        setTimeout(jump(),1000)
        
      }
    }
  }
  
  
  function jump(){
    if(birdBottom < 500)birdBottom += 1                 //�P�_�D�����S���W�X�ù�
    bird.style.bottom = birdBottom
  }
  
  function randomValue(v){
    return Math.floor((Math.random() * v) + 1)          //��X 1~v���H����
  }

  document.addEventListener('keyup', control)           //��������L�ƥ�
  
  function generateObstable(){                          //�ͦ��I��
    let obstacleLeft = 500                              //���ު�l��m
    let cloudLeft = 600                                 //����l��m
    let cloudTop = 100 + randomValue(100)               //������ 101 ~ 200
    
    let randomHeight = randomValue(80)                  //���ް��� 1~80
    let obstacleBotton = randomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    const cloud = document.createElement('div')
    
    //�[class
    if(!isGameOver) {
      obstacle.classList.add('obstacle')
      topObstacle.classList.add('topObstacle')
      cloud.classList.add('cloud')
    }
    //�Ыت���
    gameDisplay.appendChild(cloud)
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)


    //�]�w�Ѽ�
    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBotton + 'px'
    topObstacle.style.bottom = 360 + obstacleBotton + gap + randomValue(60) + 'px'
    cloud.style.top = cloudTop + 'px'
    cloud.style.left = cloudLeft + 'px'
    


    // �L�X���խ� F12 console
    console.log("bird top: "+ (birdBottom+45+150).toString())
    console.log("topobstacle: " + topObstacle.style.bottom)
    console.log("opstacleLeft: " + obstacleLeft)
    console.log("birdLeft: " + birdLeft)
    console.log("random: " + randomValue(10))


    //������
    function moveCloud(){
      cloudLeft -= 1
      cloud.style.left = cloudLeft + 'px'

      // ���X�̹��Nremove��
      if (cloudLeft === 0){
        gameDisplay.removeChild(cloud)
      }
    }

    //�����ް�
    function moveObstacle(){
      obstacleLeft -= 2

      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'

 
      // ���ޥX�̹��Nremove��     
      if (obstacleLeft === 0){
        gameDisplay.removeChild(topObstacle)
        gameDisplay.removeChild(obstacle)
        
      }
      

      //bird dead
      if(
        ((birdRight+15 >= obstacleLeft && birdLeft+10 < obstacleLeft+60) && ( birdBottom+45+150+17 >= parseInt(topObstacle.style.bottom)  || birdBottom +20 <= 360 - (150 - obstacleBotton))) || //����U�� �W��-(�a�O��-���a)
        // �Y������� || ���Ѽ������ || ���Ѽ��a�O
        birdBottom+20 === 0
        ){
          gameOver()
          clearInterval(timerObstacle)    //�M��INTERVAL
          clearInterval(timerCloud)
        }
    }
    // �C���t��
    const timerObstacle = setInterval(moveObstacle, 20- (second/10)*0.5 - minute*2.9) //�H�C���ɶ��ܧ�
    const timerCloud = setInterval(moveCloud, 30 - randomValue(20))                   //�C�Ӷ��t�פ��P 10~29
    if(!isGameOver){
      setTimeout(generateObstable, 3000)                                              //�C3��ͦ�����
    } 
  }
  generateObstable()
    
  function gameOver(){
      clearInterval(gameTimerId)                //�M��INTERVAL
      clearInterval(int)
      isGameOver = true
      document.removeEventListener('keyup', control)    //���ť���]���|����
      let ch = setInterval(changeSky, 50);              //�C50�@���Ѫ��C��
      // document.querySelector('.sky').style.backgroundColor = 'black'
      audio.pause()                                     //�}�l���ּȰ�
      Daudio.play();                                    //���`���ּ���
      setTimeout(() => { Daudio.pause(); clearInterval(ch);}, 5000);    //���`���ּ�5��
  }
  

  // �p��
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
    var color = 'rgb('+randomValue(255).toString()+','+randomValue(255).toString()+','+randomValue(255).toString()+')';         //�H���ͦ��Ѫ��C��
    sky.style.backgroundColor = color;//rgb(r,g,b)
    console.log(color)
  }
    
    
})

var isStart = false;
document.addEventListener('keypress', ()=>{         //������}�l����
  const audio = document.getElementById("audio");
  if(!isStart){
    audio.currentTime = 30;                         //�q��30��}�l����
    audio.play();
    isStart = true;
  }
})
  