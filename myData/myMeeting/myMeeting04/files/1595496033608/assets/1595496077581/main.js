function Main(go) {
    myfirsttext.innerHTML='资源已加载，正在布置场景！';
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = Main.classType;
    this.attribute = null;
    
    this.model=null;
    this.man1=null;
    this.man1_flag=1;
}

Web3DEngine.ExtendType( Main , Web3DEngine.MonoBehaviour, {
	Awake:function(arg){
        console.log('Awake函数，我只在初始化时调用一次');
    },
	Start:function(arg){
        console.log('Start函数，在脚本enable情况下才被调用，调用顺序在Awake和OnEnable之后，只调用一次');
        animationFade(this.man1,'Bip01|Take 001|BaseLayer.001',0.1);
        //animationSpeed(this.man1);
        for(var n1=0;n1<20;n1++)
            for(var n2=0;n2<20;n2++){
                var obj=creater(this.model);
                scaleSet(obj,0.001,0.001,0.001);
                moveSet(obj,n1,0,n2);
            }
        mypanel10.style.display="none";
    },
	OnEnable:function(arg){
        console.log('OnEnable函数，游戏对象激活或者脚本激活时调用，在Start之前');
    },
	OnDisable:function(arg){
        console.log('OnDisable函数，游戏对象隐藏或者脚本隐藏时调用');
    },
	Update:function(arg){
        console.log('Update函数，游戏非暂停时每帧调用');
        man1_move(this.man1);
    },
    LateUpdate:function(arg){
        console.log('LateUpdate函数，游戏非暂停时每帧调用，晚于Update');
    },

	OnDestroy:function(dt){
        console.log('OnDestroy函数，绑定的游戏对象或脚本销毁时调用');
	}


});

Main.attributes.add( 'attribute', {
    type: 'string',
    default: 'hello , world',
    title: 'attribute',
    description: 'open attribute name attribute ; type - string ;'
});
Main.attributes.add( 'model', {
    type: 'asset',
    title: 'model'
});
Main.attributes.add( 'man1', {//这种方法对摄像机、光线也有效
    type: 'entity',
    title: 'man1',
});
function scaleSet(myTransform,x,y,z){//调整游戏对象的尺寸
    if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    myTransform.localScale=new THREE.Vector3(x,y,z);
}
function moveSet(myTransform,x,y,z){//调整游戏对象的位置
    if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    myTransform.localPosition=new THREE.Vector3(x,y,z);
}
function creater(model){
    var obj = new Web3DEngine.GameObject();
    var SkinnedMeshRenderer=obj.addComponent(Web3DEngine.SkinnedMeshRenderer);//为对象添加蒙皮渲染插件
    SkinnedMeshRenderer.mesh = model;//将模型赋值给蒙皮组件
    return SkinnedMeshRenderer;
}
function animationFade(obj,animationName,time){//切换动画
    if(typeof(time) == "undefined")time=0.1;
    var play=obj.gameObject.getComponent(Web3DEngine.AnimationPlayer);
    play.CrossFade(animationName,0.1);
}
function animationSpeed(obj,step){//调整动画的播放速度
    var myAnimation= obj.gameObject.getComponent( Web3DEngine.AnimationPlayer);
    if(typeof(step) == "undefined"||step=='change'||step=='pause')myAnimation.paused=!myAnimation.paused;
    else myAnimation.speed+=step;
}
function man1_move(myTransform0,direction,step){//移动游戏对象、相机、光源
    if(typeof(step) == "undefined")step=0.05;
    var myTransform;
    if(typeof(myTransform0.x) == "undefined")myTransform=myTransform0.gameObject.getComponent(Web3DEngine.Transform);
    else myTransform=myTransform0;
    if(myTransform.localPosition.z>6){this.man1_flag=2;}
    else if(myTransform.localPosition.z<-2){this.man1_flag=1;}
    if(this.man1_flag==1){direction=3;rotationSet(myTransform0,0,0,0);}
    else {direction=-3;rotationSet(myTransform0,0,180,0);}
    control(myTransform.localPosition,direction,step);	
}
function rotation1(myTransform,direction,step){//旋转游戏对象、相机、光源
    if(typeof(step) == "undefined")step=0.1;
    if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    if(direction<0){//字母与数字比较大小结果始终为false
	    step*=-1;
	    direction*=-1;
	}
    var dx=myTransform.localEulerAngles.x,dy=myTransform.localEulerAngles.y,dz=myTransform.localEulerAngles.z;
    if(direction=='x'||direction==1){dx+=step;dx=tool(dx);}
    else if(direction=='y'||direction==2){dy+=step;dy=tool(dy);}
    else if(direction=='z'||direction==3){dz+=step;dz=tool(dz);}
    myTransform.localEulerAngles=new THREE.Vector3(dx,dy,dz);
    function tool(n){
        if(n<0){
            n+=360;
            n=tool(n);
        }else if(n>=360){
            n-=360;
            n=tool(n);
        }return n;
    }
}
function rotationSet(myTransform,x,y,z){//旋转游戏对象、相机、光源
    if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    myTransform.localEulerAngles=new THREE.Vector3(x,y,z);
}
function control(control,direction,step){//为其它几个函数提供服务
    if(direction<0){//字母与数字比较大小结果始终为false
	    step*=-1;
	    direction*=-1;
	}
    if(direction=='x'||direction==1)control.x+=step;
    else if(direction=='y'||direction==2)control.y+=step;
    else if(direction=='z'||direction==3)control.z+=step;
}