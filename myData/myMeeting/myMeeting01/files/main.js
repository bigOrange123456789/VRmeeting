function Main(go) {
    myfirsttext.innerHTML='资源已加载，正在布置场景！';

    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = Main.classType;
    this.attribute = null;
    
    this.meetingroom=null;
    this.model=null;
    this.model2=null;
    this.room1=null;
    this.man1=null;//奔跑的男人
    this.man2=null;//散步的男人
    this.man1_flag=1;
    this.table1=null;
    this.table2=null;
    this.tv=null;
    this.screen=null;

    this.all_user_id=new Array();
    this.all_user=new Array();
    //console.log(this.all_user_id);
    //console.log(this.all_user_id.length);

    this.mytimer=0;
}
var chairSave;chairSave=[];
Web3DEngine.ExtendType( Main , Web3DEngine.MonoBehaviour, {
	Awake:function(arg){
        console.log('Awake函数，我只在初始化时调用一次');
    },
	Start:function(arg){
        tellOtherMyselfArrive();//通过后台数据库告诉其它人我来了
        console.log('Start函数，在脚本enable情况下才被调用，调用顺序在Awake和OnEnable之后，只调用一次');

        //设定会议人数
        var peopleNum=member_num;

        //加载会议室场景
        this.meetingroom=creater(this.room1);
        moveSet(this.meetingroom,0,0.3,0);
        var chairCount=peopleNum;
        var amplify=Math.ceil((peopleNum-4)/2);
        //var chairSave=[];

        if(peopleNum<40){
            if(peopleNum>12)
                chairCount=12;
            amplify=Math.ceil((chairCount-4)/2);
            var roomLen=7*(0.1+0.1*amplify);
            //添加桌子
            var table=creater(this.table1);
            table.transform.parent=this.meetingroom.transform;
            if(peopleNum>4)
                scaleSet(table,0.1+0.04*amplify,0.1,0.2);
            else{
                scaleSet(table,0.1,0.1,0.2);
            }
            moveSet(table,0,-1,0);
            table.transform.localEulerAngles=new Web3DEngine.Vector3(0,90,0);
            
            //会议室缩放
            if(peopleNum<5){
                scaleSet(this.meetingroom,0.5,1,0.4);
            }
            else{
                scaleSet(this.meetingroom,0.5,1,0.4+0.15*amplify);
            }
            
            //屏幕
            var screen=creater(this.tv);
            moveSet(screen,-0.7,-0.7,1.8+0.6*amplify);
            scaleSet(screen,0.0005,0.0005,0.0005);
            rotationSet(screen,0,90,0);
            
            //添加椅子
            var frontChair=creater(this.model);
            chairSave.push(frontChair);
            scaleSet(chairSave[0],0.1,0.1,0.1);
            moveSet(chairSave[0],0,-0.7,-roomLen/2-0.2);
            
            for(var i=1;i<chairCount;i++){
                var newChair=Web3DEngine.GameObject.Instantiate(frontChair);
                chairSave.push(newChair);
            }
            if(peopleNum%2==0 || peopleNum>12){
                //后椅子位置
                var backChair=chairSave[1];
                backChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,180,0);
                moveSet(backChair,0,-0.7,roomLen/2+0.2);
                chairCount=chairCount-2;
            }
            else
                chairCount=chairCount-1;

            for(var i=0;i<chairCount/2;i++){
                var index=0;
                if(peopleNum%2==0 || peopleNum>12)
                    index=2*(i+1);
                else
                    index=i*2+1;
                var leftX=0.6;
                var rightX=-0.6;
                //var startY=-0.25*amplify+0.13*amplify*(i-1);
                var startY=-roomLen/2+(roomLen/(chairCount/2+1))*(i+1);
                var leftChair=chairSave[index];
                var rightChair=chairSave[index+1];
                leftChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,-90,0);
                moveSet(leftChair,leftX,-0.7,startY);
                rightChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,90,0);
                moveSet(rightChair,rightX,-0.7,startY);
            }
            
            var roomWid=3;
            if(peopleNum>12){
                for(var i=0;i<7;i++){
                    var x=roomWid/2-0.5*i;
                    var y=-1.6-0.5*amplify;
                    var newChair=Web3DEngine.GameObject.Instantiate(frontChair);
                    chairSave.push(newChair);
                    moveSet(newChair,x,-0.7,y);
                }
            }
            
            if(peopleNum>19){
                for(var i=0;i<10;i++){
                    var x=roomWid/2+0.2;
                    var y=-1.6+0.4*i;
                    var newChair=Web3DEngine.GameObject.Instantiate(frontChair);
                    newChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,-90,0);
                    chairSave.push(newChair);
                    moveSet(newChair,x,-0.7,y);
                }
            }
            
            if(peopleNum>29){
                for(var i=0;i<10;i++){
                    var x=-roomWid/2-0.2;
                    var y=-1.6+0.4*i;
                    var newChair=Web3DEngine.GameObject.Instantiate(frontChair);
                    newChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,90,0);
                    chairSave.push(newChair);
                    moveSet(newChair,x,-0.7,y);
                }
            }
        }
        else if(peopleNum<100){
            amplify=Math.ceil(peopleNum/10);
            scaleSet(this.meetingroom,1.2,1,0.5+0.15*amplify);
            
            var table=creater(this.table2);
            scaleSet(table,0.05,0.05,0.05);
            moveSet(table,0,-0.7,amplify/2+1.5);
            
            var screen=creater(this.screen);
            scaleSet(screen,0.001,0.001,0.001);
            screen.transform.localEulerAngles=new Web3DEngine.Vector3(0,180,0);
            moveSet(screen,0,0.8,amplify/2+2.5);
            
            var firstChair=creater(this.model);
            chairSave.push(firstChair);
            scaleSet(chairSave[0],0.1,0.1,0.1);
            for(var i=1;i<amplify*10;i++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);
                chairSave.push(newChair);
            }

            for(var i=0;i<amplify;i++){
                var y=amplify/2-i;
                for(var j=0;j<10;j++){
                    var x=-3+j*0.7;
                    moveSet(chairSave[i*10+j],x,-0.7,y);
                }
            }
        }
        else if(peopleNum<500){
            amplify=Math.ceil(peopleNum/20);
            scaleSet(this.meetingroom,2.3,1,0.5+0.15*amplify);
            
            var table=creater(this.table2);
            scaleSet(table,0.05,0.05,0.05);
            moveSet(table,0,-0.7,amplify/2+1.5);
            
            var screen=creater(this.screen);
            scaleSet(screen,0.001,0.001,0.001);
            screen.transform.localEulerAngles=new Web3DEngine.Vector3(0,180,0);
            moveSet(screen,0,0.8,amplify/2+2.5);
            
            var firstChair=creater(this.model);
            chairSave.push(firstChair);
            scaleSet(chairSave[0],0.1,0.1,0.1);
            for(var i=1;i<amplify*20;i++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);
                chairSave.push(newChair);
            }

            for(var i=0;i<amplify;i++){
                var y=amplify/2-i;
                for(var j=0;j<20;j++){
                    var x=-7+j*0.7;
                    moveSet(chairSave[i*20+j],x,-0.7,y);
                }
            }
        }
        else{
            amplify=Math.ceil(peopleNum/50);
            scaleSet(this.meetingroom,5,1,0.5+0.15*amplify);
            
            var table=creater(this.table2);
            scaleSet(table,0.05,0.05,0.05);
            moveSet(table,0,-0.7,amplify/2+1.5);
            
            var screen=creater(this.screen);
            scaleSet(screen,0.001,0.001,0.001);
            screen.transform.localEulerAngles=new Web3DEngine.Vector3(0,180,0);
            moveSet(screen,0,0.8,amplify/2+2.5);
            
            var firstChair=creater(this.model);
            chairSave.push(firstChair);
            scaleSet(chairSave[0],0.1,0.1,0.1);
            for(var i=1;i<amplify*50;i++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);
                chairSave.push(newChair);
            }

            for(var i=0;i<amplify;i++){
                var y=amplify/2-i;
                for(var j=0;j<50;j++){
                    var x=-17+j*0.7;
                    moveSet(chairSave[i*50+j],x,-0.7,y);
                }
            }
        }
        if(peopleNum<=2)chairSave[0].transform.localPosition.set(chairSave[0].transform.localPosition.x,chairSave[0].transform.localPosition.y,chairSave[0].transform.localPosition.z-0.5);
        else{// if(peopleNum<=15)
            scaleSet(screen,screen.transform.localScale.x*2,screen.transform.localScale.y*2,screen.transform.localScale.z*2.2);
            screen.transform.localPosition.set(screen.transform.localPosition.x-0.8,screen.transform.localPosition.y,screen.transform.localPosition.z);
        }
        if(peopleNum==2){
            screen.transform.localPosition.set(screen.transform.localPosition.x,screen.transform.localPosition.y,screen.transform.localPosition.z+0.5);
            chairSave[1].transform.localPosition.set(chairSave[1].transform.localPosition.x,chairSave[1].transform.localPosition.y,chairSave[1].transform.localPosition.z+0.5);
        }

        
        //操作奔跑的男人
        animationFade(this.man1,'Bip01|Take 001|BaseLayer.001',0.1);
        mypanel10.style.display="none";
        this.man1.gameObject.transform.localPosition.set(0,-10,0);

        if(typeof(screen)!=undefined){
	    var vedio=document.getElementById('video');
	    var texture=new THREE.VideoTexture(vedio);
	    var material= new THREE.MeshBasicMaterial({color:0xffffff});
	    material.map=texture;
	    var square = new THREE.CubeGeometry(3.2,1.5,0.05);
	    var myobj= new THREE.Mesh(square, material);
	    myobj.position.set(screen.transform.localPosition.x+1.7,0.63,screen.transform.localPosition.z-1);
	    var scene=appInst._renderScenePass.scene;
	    scene.add(myobj);
                    console.log(screen);//screen._imp.children[0].material.map=texture;
	    //this.screen.gameObject._imp.children[0].material.map=texture;
}//if(typeof(screen)!=undefined)
    },
	OnEnable:function(arg){
        console.log('OnEnable函数，游戏对象激活或者脚本激活时调用，在Start之前');
    },
	OnDisable:function(arg){
        console.log('OnDisable函数，游戏对象隐藏或者脚本隐藏时调用');
    },
	Update:function(arg){

        man1_move(this.man1);//移动奔跑的男人
    },
    LateUpdate:function(arg){
    },

	OnDestroy:function(dt){
        console.log('OnDestroy函数，绑定的游戏对象或脚本销毁时调用');
	}


});
/*document.body.timer=setInterval(function(){//计时器
    //find_all_user(this.table2,this.all_user,this.all_user_id);
    creater(mytable2);
},1000);*/
/*function mytest(mytable2){d
    //var table2=
        creater(mytable2);
    //moveSet(table2,0,0,0);
    //return table2;
}*/
function tellOtherMyselfArrive(){
    //{room_id: "",user_id: "", room_type: "", x: "", y: "",angel: "", head_angel1: "",head_angel2: ""}
    insert({'room_id':room_id,'user_id':user_id, 'room_type': '001', 'x': '0', 'y': '0','angel': '', 'head_angel1':'','head_angel2': ''},4);
}
function tellOtherMyselfLeave(){
    drop({'user_id':user_id},4);
}
function tellOtherMyselfMove(x,y){
    updateRoom_numberUser_id(user_id,'x',x);
    updateRoom_numberUser_id(user_id,'y',y);
}
async  function find_all_user(myman1,all_user,all_user_id){//找到房间中所有用户的位置，并把他们渲染出来
    var condition={};
    var result;
    result=await asyncAxios.get(url + "/myroom_number/myfind",condition);
    for(var i=0;i<result.result.length;i++)updateOne_user(myman1,all_user,all_user_id,result.result[i].user_id,result.result[i].x,result.result[i].y)
}
function updateOne_user(myman1,all_user,all_user_id,this_user_id,this_user_x,this_user_y){
    var updateOne_user_flag=-1;
    for(var i=0;i<all_user_id.length&&updateOne_user_flag==-1;i++)
        if(all_user_id[i]==this_user_id)updateOne_user_flag=i;
    if(updateOne_user_flag==-1){
        all_user_id.push(this_user_id);
        var this_user=creater(myman1,true);
        moveSet(this_user,this_user_x,-0.8,this_user_y);
        scaleSet(this_user,0.05,0.05,0.05);
        all_user.push(this_user);
    }else{
        moveSet(all_user[updateOne_user_flag],this_user_x,-0.8,this_user_y);
    }
}


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
Main.attributes.add( 'model2', {
    type: 'asset',
    title: 'model2'
});
Main.attributes.add( 'room1', {
    type: 'asset',
    title: 'room1'
});
Main.attributes.add( 'table1', {
    type: 'asset',
    title: 'table1'
});
Main.attributes.add( 'table2', {
    type: 'asset',
    title: 'table2'
});
Main.attributes.add( 'tv', {
    type: 'asset',
    title: 'tv'
});
Main.attributes.add( 'screen', {
    type: 'asset',
    title: 'screen'
});
Main.attributes.add( 'man1', {//这种方法对摄像机、光线也有效
    type: 'entity',
    title: 'man1',
});
function scaleSet(myTransform,x,y,z){//调整游戏对象的尺寸
    //if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    //myTransform.localScale=new THREE.Vector3(x,y,z);
    myTransform.transform.localScale.set(x,y,z);
}
function moveSet(myTransform,x,y,z){//调整游戏对象的位置
    //if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    //myTransform.localPosition=new THREE.Vector3(x,y,z);
    myTransform.transform.localPosition.set(x,y,z);
}
function creater(model,haveAnimation){
    var obj = new Web3DEngine.GameObject();
    var SkinnedMeshRenderer=obj.addComponent(Web3DEngine.SkinnedMeshRenderer);//为对象添加蒙皮渲染插件
    if(typeof(haveAnimation) != "undefined"&&haveAnimation)obj.addComponent(Web3DEngine.AnimationPlayer);
    SkinnedMeshRenderer.mesh = model;//将模型赋值给蒙皮组件
    return obj;
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
    if(typeof(step) == "undefined")step=0.02;
    var myTransform;
    if(typeof(myTransform0.x) == "undefined")myTransform=myTransform0.gameObject.getComponent(Web3DEngine.Transform);
    else myTransform=myTransform0;
    
    if(myTransform.localPosition.z>1.85){this.man1_flag=2;}
    else if(myTransform.localPosition.z<-0.75){this.man1_flag=1;}
    
    if(this.man1_flag==1){
        direction=3;
        //rotationSet(myTransform0,0,0,0);
        myTransform0.localEulerAngles=new THREE.Vector3(0,0,0);
    }
    else {
        direction=-3;
        //rotationSet(myTransform0,0,180,0);
        myTransform0.localEulerAngles=new THREE.Vector3(0,180,0);
    }
    control(myTransform.localPosition,direction,step);	
}
function rotation1(myTransform,direction,step){//旋转游戏对象、相机、光源
    if(typeof(step) == "undefined")step=0.1;
    if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    if(direction<0){//字母与数字比较大小结果始终为false
	    step*=-1;
	    direction*=-1;
	}
    //var dx=myTransform.localEulerAngles.x,dy=myTransform.localEulerAngles.y,dz=myTransform.localEulerAngles.z;
    var test=myTransform.transform.localEulerAngles;
    var dx=test.x,dy=test.y,dz=test.z;
    if(direction=='x'||direction==1){dx+=step;dx=tool(dx);}
    else if(direction=='y'||direction==2){dy+=step;dy=tool(dy);}
    else if(direction=='z'||direction==3){dz+=step;dz=tool(dz);}
    myTransform.transform.localEulerAngles=new THREE.Vector3(dx,dy,dz);
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
    //if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    myTransform.transform.localEulerAngles=new THREE.Vector3(x,y,z);
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
