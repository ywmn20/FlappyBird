(function(){
    // 大地类
    var Land=window.Land=function(){
        this.image=game.R.land;//game是index里实例化的那个game
        this.y=0.8*game.canvas.height;

        this.x=0;
        this.width=336;//336是land的宽度
    }
    //更新    
    Land.prototype.update=function(){
        this.x-=2;
        if(this.x<-this.width){
            this.x=0;
        }
    }
    //渲染
    Land.prototype.render=function(){
        game.ctx.drawImage(this.image,this.x,this.y);
        game.ctx.drawImage(this.image,this.x+this.width,this.y);
        game.ctx.drawImage(this.image,this.x+2*this.width,this.y);
        game.ctx.fillStyle='#ded895';
        game.ctx.fillRect(0,this.y+112,game.canvas.width,game.canvas.height*0.2-112);
    }
    
})();