(function(){
    //背景类
    var Background=window.Background=function(){
        this.image=game.R.bg_day;//game是index里实例化的那个game
        this.y=0.8*game.canvas.height-396;
        //背景图片的尺寸
        this.width=288;
        this.height=512;

        this.x=0;
        this.speed=1;
    }
    //运动
    Background.prototype.update=function(){
        this.x-=this.speed;
        if(this.x<-this.width){//无缝连续滚动原理
            this.x=0;
        }
    }
    //渲染
    Background.prototype.render=function(){
        game.ctx.drawImage(this.image,this.x,this.y);//渲染图片
        game.ctx.drawImage(this.image,this.x+this.width,this.y);//渲染图片
        game.ctx.drawImage(this.image,this.x+2*this.width,this.y);//渲染图片
        //渲染天空矩形猫腻
        game.ctx.fillStyle='#4ec0ca';
        game.ctx.fillRect(0,0,game.canvas.width,this.y+10);
        //渲染草丛矩形猫腻
        game.ctx.fillStyle='#5ee270';
        game.ctx.fillRect(0,this.y+this.height,game.canvas.width,game.canvas.height-this.y-this.height);
        
    }
    
})();