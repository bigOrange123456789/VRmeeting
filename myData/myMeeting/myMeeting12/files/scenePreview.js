function PlayerControl(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = PlayerControl.classType;
    this.directionY_Ref = null;
}
var myx1=0,myy1=0,mz1=0,myx2=0,myy2=0,myz2=0,myPreviewflag=1;
var cameramove=0;//为0不移动
var this_myScreenControl;this_myScreenControl=-1;

Web3DEngine.ExtendType( scenePreview , Web3DEngine.MonoBehaviour, {
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
    }
});
scenePreview.attributes.add( 'directionY_Ref', {
    type: 'entity',
    default: null,
    title: 'directionY_Ref',
    description: 'directionY_Ref'
});
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