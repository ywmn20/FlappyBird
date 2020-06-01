(function(){//从场景2到场景3鸟没偏左边载入
    var SceneManager=window.SceneManager=function(){
        this.sceneNO=1;//1表示欢迎屏幕，2表示教程，3表示游戏中，4表示游戏结束
        this.logoy=-48;
        this.buttonx=game.canvas.width/2-58;
        this.buttony=game.canvas.height;
        this.bindEvent();
        game.bg=new Background();//场景管理器负责实例化背景、大地、鸟。。。
        game.land=new Land();
        game.bird=new Bird();
        
    }

    SceneManager.prototype.update=function(){
       switch(this.sceneNO){
            case 1:
                this.logoy+=10;
               this.buttony-=10;
                if(this.logoy>200){
                    this.logoy=200;
                }
                if(this.buttony<300){
                    this.buttony=300;
                }
            break;

            case 2:
                game.bird.wing();
                // if(this.tutorialOpacityIsDown){
                //     this.tutorialOpacityIsdown-=0.1;
                // }else{
                //     this.tutorialOpacityIsDown+=0.1;
                // }
                this.tutorialOpacity += this.tutorialOpacityIsDown ? -0.05:0.05;
                if(this.tutorialOpacity<0.05||this.tutorialOpacity>0.95){
                    this.tutorialOpacityIsDown=!this.tutorialOpacityIsDown;
                }
                // console.log(this.tutorialOpacity,this.tutorialOpacityIsDown)
            break;

            case 3:
               game.bird.update();
               game.bg.update();
               game.land.update();
               game.frameNO%200==0&&new Pipe();
               for(var i=0;i<game.pipeArr.length;i++){
                   game.pipeArr[i].update(); 
               }
            break;

            case 4:
                if(game.bird.y>game.canvas.height*0.8){//越线死亡而且死亡后定时器还在更新  老师的就不会   最后又不越线死亡
                    this.isBirdBottom=true;  
                }
                this.birdNo++;
                if(!this.isBirdBottom){   
                    game.bird.y+=0.1*this.birdNo;
                }else{
                    game.frameNO%10==0&&this.bombStep++;
                    /* if(this.bombStep>11){
                        this.bombStep=11;
                    } */
                }
                this.maskOpacity-=0.1;
                if(game.ctx.maskOpacity<0){
                    game.ctx.maskOpacity=0;
                }
            
            break;
        }
    }

    SceneManager.prototype.render=function(){
        switch(this.sceneNO){//根据哪个场景决定做什么
            case 1: game.bg.render();
                    game.land.render();
                    game.bird.render();
                    game.bird.x=game.canvas.width/2-24;
                    game.bird.y=248;
                    game.ctx.drawImage(game.R["logo"],game.canvas.width/2-89,this.logoy);
                    game.ctx.drawImage(game.R["button_play"],this.buttonx,this.buttony);
            break;

            case 2: game.bg.render();
                    game.land.render();
                    game.bird.render();
                    game.bird.y=150;

                    //教程图
                    game.ctx.save();
                    game.ctx.globalAlpha=this.tutorialOpacity;// 透明度
                    game.ctx.drawImage(game.R["tutorial"],game.canvas.width/2-57,240)
                    game.ctx.restore();
            break;

            case 3: game.bg.render();
                    game.land.render();
                    game.bird.render();
                    for(var i=0;i<game.pipeArr.length;i++){
                        game.pipeArr[i]&&game.pipeArr[i].render(); 
                    } 

                    var scoreLen=game.score.toString().length;
                    for(var i=0;i<scoreLen;i++){
                        game.ctx.drawImage(game.R["shuzi"+game.score.toString().charAt(i)],game.canvas.width/2-scoreLen/2*34+34*i+5,100);
                    }
            break; 
            case 4: game.bg.render();
                    game.land.render();

                    if(!this.isBirdBottom){
                        game.bird.render();
                    }else{
                        //渲染爆炸特效
                        if(this.bombStep<=11){
                            game.ctx.drawImage(game.R["b"+this.bombStep],game.bird.x-36,game.bird.y-60,48*2,48*2);
                        }else{
                            this.enter(5);
                        }
                    }

                    for(var i=0;i<game.pipeArr.length;i++){
                        game.pipeArr[i]&&game.pipeArr[i].render(); 
                    } 

                    //渲染大白屏
                    game.ctx.fillStyle="rgba(255,255,255,"+this.maskOpacity+")";
                    game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);

                    var scoreLen=game.score.toString().length;
                    for(var i=0;i<scoreLen;i++){
                        game.ctx.drawImage(game.R["shuzi"+game.score.toString().charAt(i)],game.canvas.width/2-scoreLen/2*34+34*i+5,100);
                    }
            break;

            case 5:
                game.bg.render();
                game.land.render();

                for(var i=0;i<game.pipeArr.length;i++){
                    game.pipeArr[i]&&game.pipeArr[i].render(); 
                } 

                var scoreLen=game.score.toString().length;
                for(var i=0;i<scoreLen;i++){
                    game.ctx.drawImage(game.R["shuzi"+game.score.toString().charAt(i)],game.canvas.width/2-scoreLen/2*34+34*i+5,100);
                }
                //渲染重新再来
                game.ctx.drawImage(game.R["text_game_over"],game.canvas.width/2-102,200);
            break;
        }
    }

    SceneManager.prototype.enter=function(number){
        this.sceneNO=number;
        switch(this.sceneNO){
            case 1: this.logoy=-48;
                    this.buttony=game.canvas.height;
                    game.bird=new Bird();// 老师为了性能好  顺带可以游戏重来鸟的颜色不同
            break;
            case 2: game.bird.y=150;
                    this.tutorialOpacity=1;//tutorial的透明度为0
                    this.tutorialOpacityIsDown=true;
            break;
            case 3:
                //清空管子
                game.pipeArr=new Array();
            break;
            case 4:
                this.maskOpacity=1;//小鸟死亡后游戏界面白一下

                this.isBirdBottom=false;//小鸟是否已经触底
                this.birdNo=0;//小鸟撞到管子后计数
                this.bombStep=0;//爆炸动画
            break;
            case 5:
                
            break;
            
        }
    }
    SceneManager.prototype.bindEvent=function(){
        var self=this;
        game.canvas.onclick=function(ev){
            clickHandler(ev.clientX,ev.clientY);
        }
        game.canvas.addEventListener('touchstart',function(ev){
            var finger=ev.touches[0];
            clickHandler(finger.clientX,finger.clientY);
        },true);
        
        function clickHandler(mouseX,mouseY){
            switch(self.sceneNO){
                case 1:
                    //console.log(mouseX>self.buttonx,mouseX<self.buttonx+116,mouseY>self.buttony,mouseY<self.buttony+70)
                    if(mouseX>self.buttonx&&mouseX<self.buttonx+116&&mouseY>self.buttony&&mouseY<self.buttony+70){
                        self.enter(2);
                    }
                break;
                
                case 2:self.enter(3);     
                break;

                case 3:game.bird.fly();
                break;
                case 5:self.enter(1);game.score=0;game.bird.rad=0;game.frameNO=0;
                break;
            }
        }
    }
})();