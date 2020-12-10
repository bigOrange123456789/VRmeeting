function PlayerControl(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = PlayerControl.classType;
    this.speed = 1;
    this._delayTime = 9;
    this.directionY_Ref = null;
    
    this.man1=null;
    this.table2=null;
    
    this.all_user_id=new Array();
    this.all_user=new Array();

    this.mytimer=0;
    this.mytimer2=0;
    this.flag1=1;
    this.flag2=1;
    this.main_user=null;
    
    this.mylight=null;
    this.own=null;
    //this.pre_animation='Walking';
    this.pre_positon_x=0;//this.gameObject.getComponent(Web3DEngine.Transform).localPosition;
    this.pre_positon_z=0;
    this.animation='Idle';
}

Web3DEngine.ExtendType( PlayerControl , Web3DEngine.MonoBehaviour, {

    Start:function()
    {

        if(typeof(myfirsttext)!='undefined'){
            tellOtherMyselfArrive();//通过后台数据库告诉其它人我来了
            this.updateMouse();
            move(this.mylight,2,-10.15);
            //move(this.own,0,-100,0);
        }
        this.updateMouse();
        //this.own.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Bip01|Take 001|BaseLayer',0.1);
        //生成一个在讲台上的人
        var main_user= creater(this.man1, true);
        //animationFade(this_user, 'Bip01|Take 001|BaseLayer.001', 0.1);///针对模型man_run专门的动画
        moveSet(main_user,0,0.101,15);
        scaleSet(main_user,0.6,0.7,0.6);//人的缩放尺寸
        main_user.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,180,0);
        this.main_user=main_user;

        ////////////////////////////////////////开始进行鼠标射线检测选座功能//////////////////////////////////////////////////////////////////////
        var this_obj=this.gameObject;
        for(var i=0;i<chairSave.length;i++)chairSave[i]=chairSave[i]._imp;
        document.body.onmousedown=function(event){
            function getPointer(event, domElement) {
                if (document.pointerLockElement) {
                    return {
                        x: 0,
                        y: 0,
                        button: event.button||event.buttons
                    };
                } else {
                    var pointer = event.changedTouches ? event.changedTouches[0] : event;
                    var rect = domElement.getBoundingClientRect();
                    return {
                        x: ((pointer.clientX - rect.left) / rect.width) * 2 - 1,
                        y: (-(pointer.clientY - rect.top) / rect.height) * 2 + 1,
                        button: event.button||event.buttons
                    };
                }
            }//function getPointer(event, domElement)
            if (event.button === 2) {
                appInst._renderer.domElement.addEventListener("mousedown", this.onPointerDown, false);
                appInst._renderer.domElement.addEventListener("touchstart", this.onPointerDown, false);
                //计算:
                this.ray = new THREE.Raycaster();
                var renderer = appInst._renderer;
                let pointer = getPointer(event, renderer.domElement);
                this.ray.setFromCamera(pointer, appInst._renderScenePass.camera);
                var planeIntersects = this.ray.intersectObjects(chairSave, true);
                var planeIntersect = planeIntersects[0] || false;
                if (planeIntersect) {//结果
                    this_obj.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,planeIntersect.object.gameObject.transform.eulerAngles.y*180/Math.PI+180,0);
                    this_obj.getComponent(Web3DEngine.Transform).localPosition = new THREE.Vector3(planeIntersect.point.x, this_obj.getComponent(Web3DEngine.Transform).localPosition.y, planeIntersect.point.z);
                }//if (planeIntersect) {//结果
            }//if (event.button === 2)
        };
        ////////////////////////////////////////开始进行鼠标射线检测选座功能//////////////////////////////////////////////////////////////////////
    },

    Update:function(arg){
        if(this.main_user.getComponent(Web3DEngine.Transform).localPosition.x>4)this.flag1=-1;
        if(this.main_user.getComponent(Web3DEngine.Transform).localPosition.x<-4)this.flag1=1;
        if(this.flag1==0.5){
            this.flag2++;
            var play=this.main_user.getComponent(Web3DEngine.AnimationPlayer);
            play.CrossFade('Idle',0.1);
            if(this.flag2>5){
                this.flag1=1;
                play.CrossFade('Walking',0.1);
                this.flag2=1;
            }

        }else if(this.flag1==-0.5){
            this.flag2++;
            var play=this.main_user.getComponent(Web3DEngine.AnimationPlayer);
            play.CrossFade('Idle',0.1);
            if(this.flag2>5){
                this.flag1=1;this.flag1=-1;
                play.CrossFade('Walking',0.1);
                this.flag2=1;
            }
        }else if(this.flag1==1){//x:6 ,-6
            this.main_user.getComponent(Web3DEngine.Transform).localPosition=new THREE.Vector3(this.main_user.getComponent(Web3DEngine.Transform).localPosition.x+0.05,0.101,15);
            //this.main_user.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,this.main_user.getComponent(Web3DEngine.Transform).localEulerAngles.y+0.05,0);
            //main_user.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,180,0);
            if(this.main_user.getComponent(Web3DEngine.Transform).localPosition.x>-0.03&&this.main_user.getComponent(Web3DEngine.Transform).localPosition.x<0.03)this.flag1=0.5;
            this.main_user.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,this.main_user.getComponent(Web3DEngine.Transform).localEulerAngles.y+1,0);
        }else{
            this.main_user.getComponent(Web3DEngine.Transform).localPosition=new THREE.Vector3(this.main_user.getComponent(Web3DEngine.Transform).localPosition.x-0.05,0.101,15);
            //this.main_user.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,this.main_user.getComponent(Web3DEngine.Transform).localEulerAngles.y+0.05,0);
            if(this.main_user.getComponent(Web3DEngine.Transform).localPosition.x>-0.03&&this.main_user.getComponent(Web3DEngine.Transform).localPosition.x<0.03)this.flag1=-0.5;
            this.main_user.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,this.main_user.getComponent(Web3DEngine.Transform).localEulerAngles.y-1,0);
        }/**/
        //this.main_user.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,180+4*this.main_user.getComponent(Web3DEngine.Transform).localPosition.x,0);



        var room_x=64,room_z=64;


        var frame_num=200;
        var step_x=room_x/frame_num;//0.8;
        var step_z=room_z/frame_num;//0.8;
        var step_angle=360/frame_num;
        var step_y=1.5*8/frame_num;//0.1
        var Y_Ref_Angles=this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles;

        if(this.mytimer<frame_num/8){//0-10
            move(this.directionY_Ref,2,step_y);
            move(this.directionY_Ref,3,step_z);
            move(this.directionY_Ref,1,step_x);
            this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.y+step_angle,this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.z-2);
        }else if(this.mytimer<frame_num*3/8){//10-30
            move(this.directionY_Ref,-3,step_z);
            this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.y+step_angle,this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.z+1);
        }else if(this.mytimer<frame_num*5/8){//30-50
            move(this.directionY_Ref,-1,step_x);
            this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.y+step_angle,0);
        }else if(this.mytimer<frame_num*7/8){//50-70
            move(this.directionY_Ref,3,step_z);
            this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.x-1,this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.y+step_angle,0);
        }else if(this.mytimer<frame_num){//70-80
            move(this.directionY_Ref,1,step_x);
            this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.x+2,this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.y+step_angle,0);
            move(this.directionY_Ref,2,-step_y);
            move(this.directionY_Ref,-3,step_z);
        }else{
            if(this.pre_positon_x==this.gameObject.getComponent(Web3DEngine.Transform).localPosition.x&&this.pre_positon_z==this.gameObject.getComponent(Web3DEngine.Transform).localPosition.z){
                if(this.animation=='Walking')this.own.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Idle',0.1);
                this.animation='Idle';
            }else{
                if(this.animation=='Idle')this.own.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Walking',0.1);
                this.animation='Walking';
                this.pre_positon_x=this.gameObject.getComponent(Web3DEngine.Transform).localPosition.x;
                this.pre_positon_z=this.gameObject.getComponent(Web3DEngine.Transform).localPosition.z;
            }

            if(arg > 0.5) return;
            this.resetKeys();
            this._delayTime += arg;
            /*if(this._delayTime > 3)this.gameObject._imp.rotateOnWorldAxis(new Web3DEngine.Vector3(0,1,0), this.speed / 2000);*/
            this.updateKeys(arg);

            if(typeof(myfirsttext)!='undefined'){
                var myx=this.gameObject.getComponent(Web3DEngine.Transform).localPosition.x;
                var myz=this.gameObject.getComponent(Web3DEngine.Transform).localPosition.z;
                var myangle1=this.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.x;
                var myangle2=this.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.y;
                var myangle3=this.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.z;
                //console.log(myangle1,myangle2,myangle3);
                tellOtherMyselfMove(myx,myz,myangle1,myangle2,myangle3,this.animation);
                find_all_user(this.man1,this.all_user,this.all_user_id);
            }
        }
        if(this.mytimer<frame_num)this.mytimer++;
        else if(this.mytimer==frame_num)this.own.gameObject.getComponent(Web3DEngine.Transform).localPosition=new THREE.Vector3(0,-0.7,0);
    },

    updateKeys: function(arg)
    {
        // if ( !document.pointerLockElement) return;  //若鼠标不在屏幕内，则暂停
        //获取按键信息
        let getTheKey = Web3DEngine.Application.instance.inputModuleInst;

        if(Web3DEngine.Application.instance.inputModuleInst.getKey("A")){
            this._keys.left = true;
            this._delayTime = 0;
        }
        if(Web3DEngine.Application.instance.inputModuleInst.getKey("D")){
            this._keys.right = true;
            this._delayTime = 0;
        }
        if(Web3DEngine.Application.instance.inputModuleInst.getKey("W")){
            this._keys.forward = true;
            this._delayTime = 0;
        }
        if(Web3DEngine.Application.instance.inputModuleInst.getKey("S")){
            this._keys.back = true;
            this._delayTime = 0;
        }
        this.mylight.gameObject.getComponent(Web3DEngine.Transform).localPosition=
            new THREE.Vector3(this.gameObject.getComponent(Web3DEngine.Transform).localPosition.x-2,this.gameObject.getComponent(Web3DEngine.Transform).localPosition.y-3.5,this.gameObject.getComponent(Web3DEngine.Transform).localPosition.z);
        
        
        this._direction.copy(new Web3DEngine.Vector3(
            this._keys.right - this._keys.left,0,this._keys.back - this._keys.forward)).normalize();

        this.gameObject._imp.translateOnAxis(this._direction, arg * this.speed);
    },

    updateMouse: function()
    {
        let canvas = !!document.getElementById('application-canvas') ? document.getElementById('application-canvas').childNodes[0] : document.getElementById('canvas');
        let scope = this;

        // document.onpointerlockchange = function (e) {
        //     if ( document.pointerLockElement)
        //         {
        //             console.log('pointerLockIn');
        //         }
        //     else
        //         {
        //             console.log('pointerLockOut');
        //         }
        // };
        
        canvas.onmousedown = function (e) {
            // this.requestPointerLock();
        };
        
        canvas.onmousemove = function (e) {
            // if ( !document.pointerLockElement) return;
            if(event.buttons != 1 || this.requestPointerLock()) return;
            scope._delayTime =0;

            //设置yaw偏航旋转
            scope.gameObject._imp.rotateOnWorldAxis(new Web3DEngine.Vector3(0,1,0), -event.movementX / 300);
            //设置pitch俯仰角
            scope.directionY_Ref.gameObject._imp.rotateOnAxis(new Web3DEngine.Vector3(1,0,0), -event.movementY / 300);

            //设置俯仰角度限制
            let pitchAngle = scope.directionY_Ref.gameObject.transform.localEulerAngles.x;
            let limitAngle = 85;
            if(Math.abs(pitchAngle) > limitAngle)
            {
                scope.directionY_Ref.gameObject.transform.localEulerAngles = new Web3DEngine.Vector3(THREE.Math.clamp(pitchAngle, -limitAngle, limitAngle) ,0,0);
            }
        };

        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        let lastTouchX = 0;
        let lastTouchY = 0;

        function onDocumentTouchStart( event ) {
            scope._delayTime =0;
            lastTouchX = event.touches[ 0 ].screenX;
            lastTouchY = event.touches[ 0 ].screenY;
        }

        function onDocumentTouchMove( event ) {
            scope._delayTime =0;
            let movementX = lastTouchX - event.touches[ 0 ].screenX;
            lastTouchX = event.touches[ 0 ].screenX;
            let movementY = lastTouchY - event.touches[ 0 ].screenY;
            lastTouchY = event.touches[ 0 ].screenY;


            //设置yaw偏航旋转
            scope.gameObject._imp.rotateOnWorldAxis(new Web3DEngine.Vector3(0,1,0), movementX / 300);
            //设置pitch俯仰角
            scope.directionY_Ref.gameObject._imp.rotateOnAxis(new Web3DEngine.Vector3(1,0,0), movementY / 300);

            //设置俯仰角度限制
            let pitchAngle = scope.directionY_Ref.gameObject.transform.localEulerAngles.x;
            let limitAngle = 85;
            if(Math.abs(pitchAngle) > limitAngle)
            {
                scope.directionY_Ref.gameObject.transform.localEulerAngles = new Web3DEngine.Vector3(THREE.Math.clamp(pitchAngle, -limitAngle, limitAngle) ,0,0);
            }
        }

    },

    resetKeys: function () {
        this._keys = {
            forward: false,
            left: false,
            back: false,
            right: false,
        };
        this._direction = new Web3DEngine.Vector3(0,0,0);
    },

});

PlayerControl.attributes.add( 'speed', {
    type: 'number',
    default: 1,
    title: 'speed'
});


PlayerControl.attributes.add( 'directionY_Ref', {
    type: 'entity',
    default: null,
    title: 'directionY_Ref',
    description: 'directionY_Ref'
});
PlayerControl.attributes.add( 'man1', {//这种方法对摄像机、光线也有效
    type: 'asset',
    title: 'man1',
});

PlayerControl.attributes.add( 'own', {//这种方法对摄像机、光线也有效
    type: 'entity',
    title: 'own',
});

PlayerControl.attributes.add( 'table2', {
    type: 'asset',
    title: 'table2'
});
PlayerControl.attributes.add( 'mylight', {//这种方法对摄像机、光线也有效
    type: 'entity',
    title: 'mylight',
});

///////////////////////////以下为一些自制函数//////////////////////////////////////////////////////////////////////
function tellOtherMyselfArrive(){
    //console.log({'room_id':room_id,'user_id':user_id, 'room_type': '001', 'x': '0', 'y': '0','angle1': '0','angle2': '0','angle3': '0', 'head_angle1':'0','head_angle2': '0','head_angle3': '0'});
    drop({'user_id':user_id},4);
    insert({'room_id':room_id,'user_id':user_id, 'room_type': '001', 'x': '0', 'y': '0','angle1': '0','angle2': '0','angle3': '0', 'head_angle1':'0','head_angle2': '0','head_angle3': '0','animation':'Idle'},4);
}
function tellOtherMyselfLeave(){
    drop({'user_id':user_id},4);
}
function tellOtherMyselfMove(x,y,angle1,angle2,angle3,animation){
    updateRoom_numberUser_id(user_id,'x',x);
    updateRoom_numberUser_id(user_id,'y',y);
    updateRoom_numberUser_id(user_id,'angle1',angle1);
    updateRoom_numberUser_id(user_id,'angle2',angle2);
    updateRoom_numberUser_id(user_id,'angle3',angle3);
    updateRoom_numberUser_id(user_id,'animation',animation);
}
async  function find_all_user(myman1,all_user,all_user_id){//找到房间中所有用户的位置，并把他们渲染出来
    var result=await asyncAxios.get(url + "/myroom_number/myfind",{'room_id':room_id});
    var atThisHouse=new Array();
    for(var i=0;i<all_user.length;i++)atThisHouse.push(0);//atThisHouse的长度比result.result小1
    for(var i=0;i<result.result.length;i++){
        //console.log(result.result[i]);
        var updateOne_user_flag=updateOne_user(myman1,all_user,all_user_id,result.result[i].user_id,result.result[i].x,result.result[i].y,result.result[i].angle1,result.result[i].angle2,result.result[i].angle3,result.result[i].animation);
        if(updateOne_user_flag==-2);
        else if(updateOne_user_flag==-1)atThisHouse.push(0);
        else atThisHouse[updateOne_user_flag]=1;
    }
    for(var i=atThisHouse.length-1;i>=0;i--)
        if(atThisHouse[i]==0){//如果数据库中没有这个人
        moveSet(all_user[i],0,-100,0);
    }
}

function updateOne_user(myman1, all_user, all_user_id, this_user_id, this_user_x, this_user_y, this_user_angle1, this_user_angle2, this_user_angle3,animation) {
    var updateOne_user_flag = -1;
    for (var i = 0; i < all_user_id.length && updateOne_user_flag == -1; i++)
        if (all_user_id[i] == this_user_id) updateOne_user_flag = i;
    if (this_user_id != user_id)//不是自己的信息
        if (updateOne_user_flag == -1) {//如果是新来的成员
            all_user_id.push(this_user_id);
            var this_user = creater(myman1, true);
            //animationFade(this_user, 'Bip01|Take 001|BaseLayer.001', 0.1);///针对模型man_run专门的动画
            moveSet(this_user,parseFloat(this_user_x),0,parseFloat(this_user_y));
            scaleSet(this_user,0.5,0.5,0.5);//人的缩放尺寸
            all_user.push(this_user);
        } else {
            moveSet(all_user[updateOne_user_flag], this_user_x,-0.7, this_user_y);
            all_user[updateOne_user_flag].getComponent(Web3DEngine.Transform).localEulerAngles = new THREE.Vector3(this_user_angle1, '' + (180 + Number(this_user_angle2)), this_user_angle3);//由于人物模型与相机的方向刚开始是相反的，因此这里需要旋转一下
            animationFade(all_user[updateOne_user_flag],animation,0.1);
        }
    if (this_user_id == user_id) return -2;
    else return updateOne_user_flag;
}
//////////////////////////////////////////////////////////////////////////
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
function move(myTransform,direction,step){//移动游戏对象、相机、光源
    if(typeof(step) == "undefined")step=0.1;
    if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    control(myTransform.localPosition,direction,step);
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
function creater(model,haveAnimation){
    var obj = new Web3DEngine.GameObject();
    var SkinnedMeshRenderer=obj.addComponent(Web3DEngine.SkinnedMeshRenderer);//为对象添加蒙皮渲染插件
    if(typeof(haveAnimation) != "undefined"&&haveAnimation){
        var myAnimation=obj.addComponent(Web3DEngine.AnimationPlayer);
        myAnimation.speed=0.1;
    }
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
        myTransform0.localEulerAngles=new THREE.Vector3(0,0,0);
    }
    else {
        direction=-3;
        myTransform0.localEulerAngles=new THREE.Vector3(0,180,0);
    }
    control(myTransform.localPosition,direction,step);
}
function rotation1(myTransform,direction,step){//旋转游戏对象、相机、光源
    if(typeof(step) == "undefined")step=0.1;
    //if(typeof(myTransform.x) == "undefined")
        myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
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
