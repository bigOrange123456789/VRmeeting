function PlayerControl(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = PlayerControl.classType;
    this.speed = 1;
    this._delayTime = 9;
    this.directionY_Ref = null;

    this.mytimer=0;
}
var myPlayer;
var myx1=0,myy1=0,mz1=0,myx2=0,myy2=0,myz2=0,mystartflag=false,myPreviewflag=1;
var cameramove=0;//为0不移动
//var mouseOnChair=0;//鼠标不在椅子上
var this_myScreenControl;this_myScreenControl=-1;

Web3DEngine.ExtendType( PlayerControl , Web3DEngine.MonoBehaviour, {
    Start: function () {
        myPlayer = this;
        //添加选中光圈
        var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5});
        var square = new THREE.CylinderGeometry(0.15, 0.15, 1, 50, 50);
        var myobj = new THREE.Mesh(square, material);
        myobj.position.set(0, -10, 0);
        var scene = appInst._renderScenePass.scene;
        scene.add(myobj);
        this.updateMouse();
        ////////////////////////////////////////开始进行鼠标射线检测选座功能//////////////////////////////////////////////////////////////////////
        var this_obj = this.gameObject;
        for (var i = 0; i < chairSave.length; i++) chairSave[i] = chairSave[i]._imp;
        console.log(screen);

        function getPointer(event, domElement) {
            if (document.pointerLockElement) {
                return {
                    x: 0,
                    y: 0,
                    button: event.button || event.buttons
                };
            } else {
                var pointer = event.changedTouches ? event.changedTouches[0] : event;
                var rect = domElement.getBoundingClientRect();
                return {
                    x: ((pointer.clientX - rect.left) / rect.width) * 2 - 1,
                    y: (-(pointer.clientY - rect.top) / rect.height) * 2 + 1,
                    button: event.button || event.buttons
                };
            }
        }//function getPointer(event, domElement)
        document.body.onmousedown = function (event) {//点击事件的监听
            if (event.button === 0)
                if (document.getElementById("myVideoPanel").style.display == "block") document.getElementById("myVideoPanel").style.display = "none";
                else if (this.ray.intersectObjects(screen, true).length > 0) document.getElementById("myVideoPanel").style.display = "block";//检测三个屏幕的点击事件
                else {
                    appInst._renderer.domElement.addEventListener("mousedown", this.onPointerDown, false);
                    appInst._renderer.domElement.addEventListener("touchstart", this.onPointerDown, false);
                    //计算:
                    this.ray = new THREE.Raycaster();
                    var renderer = appInst._renderer;
                    let pointer = getPointer(event, renderer.domElement);
                    this.ray.setFromCamera(pointer, appInst._renderScenePass.camera);
                    //开始检测椅子的点击事件
                    if (myobj.position.y > -9) {//如果传送光圈不在初始位置//mouseOnChair==1
                        myx1 = myPlayer.gameObject.getComponent(Web3DEngine.Transform).localPosition.x;
                        myy1 = myPlayer.gameObject.getComponent(Web3DEngine.Transform).localPosition.y;
                        myz1 = myPlayer.gameObject.getComponent(Web3DEngine.Transform).localPosition.z;
                        myx2 = myobj.position.x;
                        myy2 = myobj.position.y + 0.1;//+0.75;
                        myz2 = myobj.position.z;
                        mystartflag = true;
                    }//完成检测椅子的点击事件
                }//if (event.button === 2)
        };//document.body.onmousedown
        //完成点击事件的监听
        document.body.onmousemove=function(event){//移动事件的监听
                appInst._renderer.domElement.addEventListener("mousedown", this.onPointerDown, false);
                appInst._renderer.domElement.addEventListener("touchstart", this.onPointerDown, false);
                //计算:
                this.ray = new THREE.Raycaster();
                var renderer = appInst._renderer;
                let pointer = getPointer(event, renderer.domElement);
                this.ray.setFromCamera(pointer, appInst._renderScenePass.camera);
                var planeIntersects = this.ray.intersectObjects(chairSave, true);
                var planeIntersect = planeIntersects[0] || false;
                if (planeIntersect)myobj.position.set(planeIntersect.object.gameObject._compoents[0].position.x,planeIntersect.object.gameObject._compoents[0].position.y+0.25,planeIntersect.object.gameObject._compoents[0].position.z);
                else myobj.position.set(0,-100,0);
        };//document.body.onmousedown
        //完成移动事件的监听
        ////////////////////////////////////////完成鼠标射线检测选座功能//////////////////////////////////////////////////////////////////////
    },

    Update: function (arg) {
        ////开始进行房间预览
        if(myPreviewflag ==0){
            this.gameObject.getComponent(Web3DEngine.Transform).localPosition=new THREE.Vector3(7.5,4.6,-1.5);//localEulerAngles
            this.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,89,0);
            this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(17.1,0,0);
            this_myScreenControl =-1;
            myPreviewflag++;
        }else if (myPreviewflag ==1&& Preview(myPreviewflag, this, 50, this.directionY_Ref)) myPreviewflag++;
        else if (myPreviewflag == 2 && Preview(myPreviewflag, this, 50, this.directionY_Ref)) {
            this_myScreenControl = 1;
            myPreviewflag++;
        }
        ////完成房间预览
        if (mystartflag && moveToPoint(this, myx1, myy1, myz1, myx2, myy2, myz2, 10, this.directionY_Ref)) mystartflag = false;

        //if (arg > 0.5) return;
        this.resetKeys();
        this.updateKeys(arg);
    },

    updateKeys: function(arg)
    {
        let getTheKey = Web3DEngine.Application.instance.inputModuleInst;//获取按键信息
        if(Web3DEngine.Application.instance.inputModuleInst.getKey("A")) this._keys.left = true;
        else if(Web3DEngine.Application.instance.inputModuleInst.getKey("D")) this._keys.right = true;
        if(Web3DEngine.Application.instance.inputModuleInst.getKey("W")) this._keys.forward = true;
        else if(Web3DEngine.Application.instance.inputModuleInst.getKey("S"))  this._keys.back = true;
        this._direction.copy(new Web3DEngine.Vector3(this._keys.right - this._keys.left,0,this._keys.back - this._keys.forward)).normalize();
        this.gameObject._imp.translateOnAxis(this._direction, arg * this.speed);

       if(Web3DEngine.Application.instance.inputModuleInst.getKey("Q"))       this.gameObject.getComponent(Web3DEngine.Transform).localPosition=new THREE.Vector3(this.gameObject.getComponent(Web3DEngine.Transform).localPosition.x,this.gameObject.getComponent(Web3DEngine.Transform).localPosition.y+0.1,this.gameObject.getComponent(Web3DEngine.Transform).localPosition.z);
       else if(Web3DEngine.Application.instance.inputModuleInst.getKey("E")) this.gameObject.getComponent(Web3DEngine.Transform).localPosition=new THREE.Vector3(this.gameObject.getComponent(Web3DEngine.Transform).localPosition.x,this.gameObject.getComponent(Web3DEngine.Transform).localPosition.y-0.1,this.gameObject.getComponent(Web3DEngine.Transform).localPosition.z);
       if(Web3DEngine.Application.instance.inputModuleInst.getKeyDown("P")) console.log(this.gameObject.getComponent(Web3DEngine.Transform).localPosition,this.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles,this.directionY_Ref.localEulerAngles);
    },
    updateMouse: function()
    {
        let canvas = !!document.getElementById('application-canvas') ? document.getElementById('application-canvas').childNodes[0] : document.getElementById('canvas');
        let scope = this;

        canvas.onmousedown = function (e) {if(event.buttons==2)this_myScreenControl*=-1;};
        canvas.onmousemove = function (e) {
            if (this_myScreenControl == 1) {
                //设置yaw偏航旋转
                scope.gameObject._imp.rotateOnWorldAxis(new Web3DEngine.Vector3(0, 1, 0), -event.movementX / 400);
                //设置pitch俯仰角
                scope.directionY_Ref.gameObject._imp.rotateOnAxis(new Web3DEngine.Vector3(1, 0, 0), -event.movementY / 400);
                //设置俯仰角度限制
                let pitchAngle = scope.directionY_Ref.gameObject.transform.localEulerAngles.x;
                let limitAngle = 85;
                if (Math.abs(pitchAngle) > limitAngle)scope.directionY_Ref.gameObject.transform.localEulerAngles = new Web3DEngine.Vector3(THREE.Math.clamp(pitchAngle, -limitAngle, limitAngle), 0, 0);
            }
        };
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );
        let lastTouchX = 0;
        let lastTouchY = 0;
        function onDocumentTouchStart( event ) {
            lastTouchX = event.touches[ 0 ].screenX;
            lastTouchY = event.touches[ 0 ].screenY;
        }
        function onDocumentTouchMove( event ) {
            let movementX = lastTouchX - event.touches[ 0 ].screenX;
            lastTouchX = event.touches[ 0 ].screenX;
            let movementY = lastTouchY - event.touches[ 0 ].screenY;
            lastTouchY = event.touches[ 0 ].screenY;

            scope.gameObject._imp.rotateOnWorldAxis(new Web3DEngine.Vector3(0,1,0), movementX / 300);//设置yaw偏航旋转
            scope.directionY_Ref.gameObject._imp.rotateOnAxis(new Web3DEngine.Vector3(1,0,0), movementY / 300);//设置pitch俯仰角
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

function moveToPoint(thisObj,x1,y1,z1,x2,y2,z2,time,mycamera,k){//已到返回true
     var x=thisObj.gameObject.getComponent(Web3DEngine.Transform).localPosition.x;
     var z=thisObj.gameObject.getComponent(Web3DEngine.Transform).localPosition.z;
     var flag=0;
     if(z1!=z2&&!(z1<=z&&z<=z2)&&!(z2<=z&&z<=z1))flag=1;
     else if(x1!=x2&&!(x1<=x&&x<=x2)&&!(x2<=x&&x<=x1))flag=1;//已到达目的地
     else if(x1==x2&&y1==y2)flag=1;
     if(flag==1){
         thisObj.gameObject.getComponent(Web3DEngine.Transform).localPosition = new THREE.Vector3(x2, y2, z2);
         thisObj.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles = new THREE.Vector3(0, -90, 0);
         mycamera.localEulerAngles = new THREE.Vector3(0, 0, 0);
         return true;
     }
     if(typeof(k)=='undefined')k=0.004;//用于视角的起伏
     k*=(Math.abs(x1-x2)+Math.abs(z1-z2));
     if((x-x1)/(x2-x1)>0.5)k*=-1;
     //if((x-x1)/(x2-x1)>0.9)time*=10;
     move(thisObj,1,(x2-x1)/time);
     move(thisObj,2,(y2-y1)/time+k);
     move(thisObj,3,(z2-z1)/time);
     return false;
}
camera.img.onclick=function(){
    mystartflag=false;
    myPreviewflag=0;
}
function Preview(mystate,thisObj,time,mycamera){//thisObj,time,mycamera,k//thisObj,x1,y1,z1,x2,y2,z2,time,mycamera,k
    var x1,y1,z1,x2,y2,z2;

    if(mystate==1){//x1,y1,z1,x2,y2,z2
        x1=7.5;y1=4.6;z1=-1.5;
        x2=-10;y2=3.8;z2=-12;
    }else if(mystate==2){
        x1=-10;y1=3.8;z1=-12;
        x2=25;y2=6;z2=-2;
    }
    var x=thisObj.gameObject.getComponent(Web3DEngine.Transform).localPosition.x;
    var z=thisObj.gameObject.getComponent(Web3DEngine.Transform).localPosition.z;
    var flag=0;
    if(z1!=z2&&!(z1<=z&&z<=z2)&&!(z2<=z&&z<=z1))flag=1;
    else if(x1!=x2&&!(x1<=x&&x<=x2)&&!(x2<=x&&x<=x1))flag=1;//已到达目的地
    else if(x1==x2&&y1==y2)flag=1;
    if(flag==1){
        if(mystate==1)thisObj.gameObject.getComponent(Web3DEngine.Transform).localPosition = new THREE.Vector3(x2, y2, z2);
        return true;
    }

    //if(typeof(k)=='undefined')k=0.004;//用于视角的起伏
    //k*=(Math.abs(x1-x2)+Math.abs(z1-z2));
    //if((x-x1)/(x2-x1)>0.5)k*=-1;
    //player控制左右，相机控制上下

    //if(flag==1)rotation1(thisObj,2,180/time);
    rotation1(thisObj,2,-180/time);
    if(mystate==1&&(x-x1)/(x2-x1)<0.5)rotation1(thisObj.directionY_Ref,1,-90/time);
    else if(mystate==1||(mystate==2&&(x-x1)/(x2-x1)>0.5))rotation1(thisObj.directionY_Ref,1,-45/time);//.directionY_Ref
    else rotation1(thisObj.directionY_Ref,1,3*45/time);
    move(thisObj,1,(x2-x1)/time);
    move(thisObj,2,(y2-y1)/time);//+k);
    move(thisObj,3,(z2-z1)/time);
    return false;
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