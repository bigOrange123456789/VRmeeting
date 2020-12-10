function PlayerControl(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = PlayerControl.classType;
    this.speed = 50;
    this._delayTime = 9;
    this.directionY_Ref = null;
}
var myx1=0,myy1=0,mz1=0,myx2=0,myy2=0,myz2=0,myUserControl=false,myPreviewflag=1;
var prePointAtLine=1;//为0表示上一个节点不在线路上，为1表示上一个节点在线路上
var temp;
var moveFlag1=0,moveFlag2=0;
Web3DEngine.ExtendType( PlayerControl , Web3DEngine.MonoBehaviour, {

    Start:function()
    {
        camera.img.onclick=function(){
            if(myUserControl==true){
                myUserControl=false;
                camera2.img.style.display='none';
            }else{
                myUserControl=true;
                camera2.img.style.display='block';
            }
        };
        camera2.img.onclick=function(){
            if(myUserControl==true){
                myUserControl=false;
                camera2.img.style.display='none';
            }else{
                myUserControl=true;
                camera2.img.style.display='block';
            }
        };
        this.updateMouse();
    },

    Update:function(arg) {
        if(moveFlag1!=0){
            moveFlag2++;
            if(moveFlag2>=20){
                moveFlag1=0;
                moveFlag2=0;
            }
        }
        ////////////////////////////////////////开始进行鼠标射线检测功能//////////////////////////////////////////////////////////////////////
        var this_obj = this.gameObject;
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
            if (event.button === 0) {
                flag = 0;
                for (j = 0; j < myimgpanel.length; j++) {
                    if (myimgpanel[j].style.display == 'block') {
                        flag++;
                        myimgpanel[j].style.display = 'none';
                    }
                }//for(j=0;j<myimgpanel.length;j++)
                if (flag == 0) {
                    appInst._renderer.domElement.addEventListener("mousedown", this.onPointerDown, false);
                    appInst._renderer.domElement.addEventListener("touchstart", this.onPointerDown, false);
                    //计算:
                    this.ray = new THREE.Raycaster();
                    var renderer = appInst._renderer;
                    let pointer = getPointer(event, renderer.domElement);
                    this.ray.setFromCamera(pointer, appInst._renderScenePass.camera);
                    var myallscreen = appInst._renderScenePass.scene.children[1].children[0].children[0].children;
                    var objs = [];
                    for (var i = 0; i < myallscreen.length; i++)
                        objs.push(myallscreen[i].gameObject._imp);
                    //开始一级点击检测
                    var planeIntersects = this.ray.intersectObjects(objs, true);
                    var planeIntersect = planeIntersects[0] || false;
                    if (planeIntersect) {//点击到展板
                        myimgpanel[planeIntersect.object.parent.name].style.display = 'block';
                        console.log(planeIntersect.object.parent.name);//0-15//alert(111);
                    } else if (!camera.pointOnImg(event.pageX, event.pageY)) {//没有点击到展板，检测点击到地板的位置
                        //开始二级点击检测
                        var myroomobj=appInst._renderScenePass.scene.children[1].children[0].children[4].children[0].children[0].children[0];
                        planeIntersects = this.ray.intersectObjects([myroomobj.gameObject._imp], true);
                        planeIntersect = planeIntersects[0] || false;
                        //console.log('planeIntersect', planeIntersect);//myobj.position.set(planeIntersect.object.gameObject._compoents[0].position.x,planeIntersect.object.gameObject._compoents[0].position.y+0.25,planeIntersect.object.gameObject._compoents[0].position.z);
                        var x=planeIntersect.point.x,z=planeIntersect.point.z;
                        if(atMovableRange(x,z)){ //((-12.5<x&&x<15.7&&-8.7<z&&z<7)||(-5<x&&x<15&&-16.6<z&&z<-6.1)) {//atMovableRange(x,z)
                            moveFlag1++;
                            if(!IsPC()||moveFlag1==2){//双击检测,移动端不需要
                                this_obj.getComponent(Web3DEngine.Transform).localPosition =
                                    new THREE.Vector3(planeIntersect.point.x, this_obj.getComponent(Web3DEngine.Transform).localPosition.y, planeIntersect.point.z);
                                myUserControl = true;//切换到用户控制
                                camera2.img.style.display = 'block';//切换到用户控制,UI
                            }//if(moveFlag1==2)
                        }
                    }//if (planeIntersect)
                }//if(flag==0)
            }//if (event.button === 0)
        }//document.body.onmousedown
        //完成点击事件的监听
        ////////////////////////////////////////完成鼠标射线检测功能//////////////////////////////////////////////////////////////////////

        //rotation_level(this,-0.1);
        //自动漫游路径需要一个数组mydata
        //console.log(myPreviewflag);
        //.log(myPreviewflag);
        if(!myUserControl){
            if(myPreviewflag ==-1){
                this.gameObject.getComponent(Web3DEngine.Transform).localPosition=new THREE.Vector3(7.5,4.6,-1.5);//localEulerAngles
                this.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,89,0);
                this.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(17.1,0,0);
                myPreviewflag++;
                prePointAtLine=1;
            }else {
                for(var i=0;i<mydata.length;i++)if(myPreviewflag == i&& Preview(myPreviewflag, this, mydata, this.directionY_Ref)){
                    myPreviewflag++;
                    prePointAtLine=1;//完成了一个阶段后，上一个节点一定在默认路径上
                    if(i==mydata.length-1)myPreviewflag=0;
                    break;
                }
            }
        }else if(prePointAtLine==1)prePointAtLine=0;//上一个点不在路线上且需要更新mydata
        else if(prePointAtLine==0)prePointAtLine=-1;//上一个点不在路线上且已经修改完了mydata
        this.resetKeys();
        this.updateKeys(arg);
    },

    updateKeys: function(arg)
    {
        // if ( !document.pointerLockElement) return;  //若鼠标不在屏幕内，则暂停
        if(!myUserControl) return;
        //获取按键信息
        let getTheKey = Web3DEngine.Application.instance.inputModuleInst;
        var angle=this.gameObject.transform.localEulerAngles.y;

        if(Web3DEngine.Application.instance.inputModuleInst.getKey("W")){
            move(this,1,Math.cos(angle*Math.PI/180)*this.speed/10);
            move(this,-3,Math.sin(angle*Math.PI/180)*this.speed/10);
        } else if(Web3DEngine.Application.instance.inputModuleInst.getKey("S")){
            move(this,-1,Math.cos(angle*Math.PI/180)*this.speed/10);
            move(this,3,Math.sin(angle*Math.PI/180)*this.speed/10);
        }

        angle-=90;
        if(Web3DEngine.Application.instance.inputModuleInst.getKey("D")){
            move(this,1,Math.cos(angle*Math.PI/180)*this.speed/10);
            move(this,-3,Math.sin(angle*Math.PI/180)*this.speed/10);
        } else if(Web3DEngine.Application.instance.inputModuleInst.getKey("A")){
            move(this,-1,Math.cos(angle*Math.PI/180)*this.speed/10);
            move(this,3,Math.sin(angle*Math.PI/180)*this.speed/10);
        }

        var mypos=this.gameObject.getComponent(Web3DEngine.Transform).localPosition;
        if(Web3DEngine.Application.instance.inputModuleInst.getKeyDown("P"))
            console.log(mypos.x+'  ,  '+mypos.y+'  ,  '+mypos.z+'  ,  '+this.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.y);
    },

    updateMouse: function()
    {
        let canvas = !!document.getElementById('application-canvas') ? document.getElementById('application-canvas').childNodes[0] : document.getElementById('canvas');
        let scope = this;
        
        canvas.onmousedown = function (e) {
            if(event.buttons==2) myUserControl=!myUserControl;
        };
        
        canvas.onmousemove = function (e) {
            //console.log();
            //if(!myUserControl) return;
            if(event.buttons==1){
                rotation1(scope,2,-event.movementX/5);//设置yaw偏航旋转
                scope.directionY_Ref.gameObject._imp.rotateOnAxis(new Web3DEngine.Vector3(1,0,0),-event.movementY/300);
            }//if(event.buttons==1)
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

        function onDocumentTouchMove( event ) {//移动端
            if(!myUserControl) return;
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
function Preview(mystate,thisObj,mydata ,mycamera){//thisObj,time,mycamera,k//thisObj,x1,y1,z1,x2,y2,z2,time,mycamera,k

    var x1,y1,z1,x2,y2,z2,angle1=0,angle2=0;//a=c

    var time=mydata[mystate][4];
    //现在的错误：
    //1.直接跳到了本阶段的结束状态
    //不知道是什么原因
    //偏移路线后重启，本阶段会立即结束

    //if(mystate==1){//x1,y1,z1,x2,y2,z2

    if(mystate==0){
        x1=mydata[mydata.length-1][0];y1=mydata[mydata.length-1][1];z1=mydata[mydata.length-1][2];
        angle1=mydata[mydata.length-1][3];
    } else {
        x1=mydata[mystate-1][0];y1=mydata[mystate-1][1];z1=mydata[mystate-1][2];
        angle1=mydata[mystate-1][3];
    }
    x2=mydata[mystate][0];y2=mydata[mystate][1];z2=mydata[mystate][2];
    angle2=mydata[mystate][3];

    //console.log(mystate,x1,y1,z1);

    var x=thisObj.gameObject.getComponent(Web3DEngine.Transform).localPosition.x;
    var z=thisObj.gameObject.getComponent(Web3DEngine.Transform).localPosition.z;

    move(thisObj,1,(x2-x1)/time);
    move(thisObj,2,(y2-y1)/time);//+k);
    move(thisObj,3,(z2-z1)/time);

    //开始计算角度差
    var angle_add=angle2-angle1;
    if(angle_add>180)angle_add-=360;
    if(angle_add<-180)angle_add+=360;
    //完成计算角度差

    rotation1(thisObj,2,angle_add/time);

    //console.log(x1,x,x2,';',z1,z,z2);
    var flag=0;
    if(z1!=z2&&!(z1<=z&&z<=z2)&&!(z2<=z&&z<=z1))flag=1;
    else if(x1!=x2&&!(x1<=x&&x<=x2)&&!(x2<=x&&x<=x1))flag=1;//已到达目的地
    else if(x1==x2&&z1==z2)flag=1;//else if(x1==x2&&y1==y2)flag=1;
    //console.log((z1!=z2&&!(z1<=z&&z<=z2)&&!(z2<=z&&z<=z1)),x1!=x2&&!(x1<=x&&x<=x2)&&!(x2<=x&&x<=x1),x1==x2&&y1==y2);
    if(flag==1){
        thisObj.gameObject.getComponent(Web3DEngine.Transform).localPosition = new THREE.Vector3(x2, y2, z2);
        thisObj.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles= new THREE.Vector3(thisObj.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.x,angle2,thisObj.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles.z);
        //console.log(thisObj.directionY_Ref.gameObject);
        thisObj.directionY_Ref.gameObject.getComponent(Web3DEngine.Transform).localEulerAngles= new THREE.Vector3(0,-90,0);
        return true;
    }
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
function atMovableRange(x,z){//移动前先看目标点是否可移动，可移动时再移动//(-12.5<x&&x<15.7&&-8.7<z&&z<7)||(-5<x&&x<15&&-16.6<z&&z<-6.1)//
    //需要两个数组--全局变量
    var flag1=false,flag2=true;
    for(var i=0;i<movableRange.length;i++)
        if(movableRange[i][0]<x&&x<movableRange[i][1]&&movableRange[i][2]<z&&z<movableRange[i][3]){
            flag1=true;break;
        }
    for(var i=0;i<immovableRange.length;i++)
        if(immovableRange[i][0]<x&&x<immovableRange[i][1]&&immovableRange[i][2]<z&&z<immovableRange[i][3]){
            flag2=false;break;
        }
    return flag1&&flag2;
}
