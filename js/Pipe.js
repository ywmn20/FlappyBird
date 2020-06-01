(function(){
    //管子类
    var Pipe=window.Pipe=function(){
       this.imageup=game.R.pipe_up;//老师说如果k有短横即-，用[]。js不允许-的命名，不过json允许有-。
       this.imagedown=game.R.pipe_down;

       this.allHeight=game.canvas.height*0.8;//上面管子高度加管子间距加下面管子高度
       this.interspace=180;//照着老师写的，但下面的管子仍有时会露馅，改下管子的间隙
       this.picheight=320;
       this.picwidth=52;
       this.upPipe=parseInt(Math.random()*(this.picheight-100))+100;
       this.downPipe=this.allHeight-this.interspace-this.upPipe;

       this.x=game.canvas.width;
       game.pipeArr.push(this);
      // 鸟是否通过管子
       this.alreagyPass=false;
    }
    //更新    
    Pipe.prototype.update=function(){
       this.x-=2;
       //碰撞检测，检测有没有碰到鸟
       if(game.bird.R>this.x&&game.bird.L<this.x+52){//老师说不适合再&&(game.bird.T<this.upPipe||game.bird.B>this.upPipe+this.interspace)
          if(game.bird.T<this.upPipe||game.bird.B>this.upPipe+this.interspace){
            // clearInterval(game.timer);
            game.sm.enter(4);
          }
       }

       //加分
       if(game.bird.R>this.x+52&&!this.alreagyPass){
          game.score++;
          this.alreagyPass=true;//标记为已经通过
       }

       //  管子出了视口得移出
       if(this.x<-52){
          for(var i=0;i<game.pipeArr.length;i++){
             if(game.pipeArr[i]===this){
                game.pipeArr.splice(i,1);
             }
          }
       }
    }
    //渲染
    Pipe.prototype.render=function(){
       game.ctx.drawImage(this.imagedown,0,this.picheight-this.upPipe,this.picwidth,this.upPipe,this.x,0,
        this.picwidth,this.upPipe);
       game.ctx.drawImage(this.imageup,0,0,this.picwidth,this.downPipe,this.x,this.upPipe+this.interspace,
        this.picwidth,this.downPipe);
    }
    
})();