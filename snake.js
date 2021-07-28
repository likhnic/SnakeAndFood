let inputDir={x:0,y:0};
let speed =2;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
let score=0;
let highscoreval;
let Previousctime=0;
let diff=0;
let flag=0;
let time=0;

food = {x:6,y:7};


function main(ctime) {
    window.requestAnimationFrame(main);
    if(flag===0 && (snakeArr[0].x!=13 || snakeArr[0].y!=15)){
        flag=1;
    }
    if(flag===0)diff=ctime;
    time=Math.round((ctime-diff)/1000);
    document.getElementById('time').innerHTML="Time: "+time;
    document.getElementById('speed').innerHTML="Speed: "+speed;
    if((ctime-lastPaintTime)/1000<1/speed){
        return ;
    }
    if(time-Previousctime>=8){
        speed++;
        Previousctime=time;
    }
    
    document.getElementById('score').innerHTML="Score:"+score;
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    for(let i=1;i<snakeArr.length;++i){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x>=25 || snake[0].x<=0 || snake[0].y>=25 || snake[0].y<=0){
        return true;
    }
    return false;
}

function pause(){
    let previousspeed=speed;
    let d1=new Date();
    speed=0.00000001;
    speed=prompt("Change speed",previousspeed);
    let d2=new Date();
    diff+=(d2.getTime()-d1.getTime());
    Previousctime=time;
}

function gameEngine(){


    if(isCollide(snakeArr)){
        inputDir={x:0,y:0};
        alert("Game Over!");
        snakeArr=[
            {x:13,y:15}
        ];
        score=0;
        flag=0;
        speed=2;
        Previousctime=0;
    }

    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        score+=1;
        document.getElementById('score').innerHTML="Score:"+score;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            document.getElementById('high').innerHTML="High score: "+highscoreval;
        }
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=1;
        let b=24;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    for(let i=snakeArr.length-2;i>=0;--i){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    
    document.getElementById('board').innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;       
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


let highscore=localStorage.getItem("highscore");

if(highscore==null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    // highscoreval=JSON.parse(highscoreval);
    document.getElementById('high').innerHTML="High score: "+highscore;
}




window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    switch (e.key) {
        case "ArrowUp":
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":

            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    } ;
})

