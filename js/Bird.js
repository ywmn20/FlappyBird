(function(){
    var Bird=window.Bird=function(){
        this.color=parseInt(Math.random()*3);//三种颜色的鸟
        this.imageArr=[//鸟有三种形态
            game.R['bird'+this.color+'_0'],
            game.R['bird'+this.color+'_1'],
            game.R['bird'+this.color+'_2']
        ];

        this.wingStep=0;//鸟的翅 膀形态 
        this.x=game.canvas.width*(1-0.618)-24;//24是小鸟图片的半个宽度
        this.y=100;

        this.fno=0;
        this.rad=0;
        this.haveEnergy=false;
    }  
    
    Bird.prototype.update=function(){
        this.wing();

        if(!this.haveEnergy){
            this.y+=parseInt(this.fno*0.53);
        }else{
            this.y-=parseInt(0.51*(20-this.fno));
            if(this.fno>20){
                this.haveEnergy=false;
                this.fno=0;
            }

            if(this.y<0){
                this.y=0;
            }
        }
       
        this.rad+=0.04;
        this.fno++;

        this.T=this.y+24-12;//T是小鸟的检测边的上边
        this.B=this.y+24+12;
        this.L=this.x+24-17;
        this.R=this.x+24+17;

        if(this.B>game.canvas.height*0.8){
            // clearInterval(game.timer);
            game.sm.enter(4)
        }
    }
    
    Bird.prototype.render=function(){
        game.ctx.save();
        game.ctx.translate(this.x+24,this.y+24);
        game.ctx.rotate(this.rad);
        game.ctx.drawImage(this.imageArr[this.wingStep],-24,-24);
        game.ctx.restore();
    }

    Bird.prototype.fly=function(){
        this.rad=-0.5;
        this.fno=-6;//老师这里写零也能飞的很好，而我只能修改成负数
        this.haverEnergy=true;
    }

    Bird.prototype.wing=function(){
        game.frameNO%20 == 0 && this.wingStep++;

        if(this.wingStep>2){
            this.wingStep=0;
        }
    }
})();