(function(){
    var Game=window.Game=function(params){
        this.canvas=document.querySelector(params.id);
        this.ctx=this.canvas.getContext('2d');

        //资源文件地址
        this.Rjsonurl=params.Rjsonurl;
        //帧编号
        this.frameNO=0;
        //设置画布的宽度和高度
        this.init();
        //读取资源
        var self=this;
        this.loadAllResource(function(){
            self.start();
        });

    }
    //初始化，设置画布的宽度和高度
    Game.prototype.init=function() {
        //读取是扣的宽度和高度
        var windowW=document.documentElement.clientWidth;
        var windowH=document.documentElement.clientHeight;
        //验收
        if(windowW>414){
            windowW=414;
        }else if(windowW<320){
            windowW=320;
        }
        if(windowH>736){
            windowH=736;
        }else if(windowH<500){
            windowH=500;
        }
        //让canvas匹配视口
        this.canvas.width=windowW;
        this.canvas.height=windowH;
    }

    //读取资源
    Game.prototype.loadAllResource=function(callback){//callback  回调函数形参
        //准备一个R对象
        this.R={};
        var self=this;//备份
        var alreadyDoneNumber=0;//计数器
        //发出请求，请求JSON文件
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){//少写个=  排bug半天
                var Robj=JSON.parse(xhr.responseText);//转换为可读取的json
                // console.log(typeof Robj)
                for(var i=0;i<Robj.images.length;i++){
                    self.R[Robj.images[i].name]=new Image();//创建同名的k
                    self.R[Robj.images[i].name].src=Robj.images[i].url;//发出http请求
                    self.R[Robj.images[i].name].onload=function(){
                        alreadyDoneNumber++;
                        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                        var txt='loading '+parseInt(alreadyDoneNumber/Robj.images.length)*100+'%'+', please wait';
                        self.ctx.textAlign='center';
                        self.ctx.font = "20px 微软雅黑";
                        self.ctx.fillText(txt,self.canvas.width/2,self.canvas.height*(1-0.618));//fillText后面没有=   排错又半天
                        if(alreadyDoneNumber==Robj.images.length){
                            // callback.call(self);
                            callback();
                        }
                    }
                };
            }
        }
        xhr.open('get',this.Rjsonurl,true);
        xhr.send(null);
    }

    //开始游戏
    Game.prototype.start=function(){
        var self=this;
        var timer=setInterval(function(){
            self.frameNO++;
            self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
            self.ctx.fillStyle='red';
            self.ctx.font='15px consolas';
            self.ctx.textalign='left';
            self.ctx.fillText('Frame:'+self.frameNO,50,20);

        },20)
    }
})();