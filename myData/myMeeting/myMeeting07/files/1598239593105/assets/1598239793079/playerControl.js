function PlayerControl(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = PlayerControl.classType;
    this.speed = 1;
    this._delayTime = 9;
    this.directionY_Ref = null;
}

Web3DEngine.ExtendType( PlayerControl , Web3DEngine.MonoBehaviour, {

    Start:function()
    {
        this.updateMouse();
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
                    console.log( this_obj.transform.localEulerAngles);
                    this_obj.transform.localEulerAngles=new THREE.Vector3(0,-90,0);///180*Math.PI
                    console.log(this_obj.getComponent(Web3DEngine.Transform).localEulerAngles);
                    //this_obj.getComponent(Web3DEngine.Transform).localPosition = new THREE.Vector3(planeIntersect.point.x, this_obj.getComponent(Web3DEngine.Transform).localPosition.y, planeIntersect.point.z);
                    this_obj.getComponent(Web3DEngine.Transform).localPosition = new THREE.Vector3(planeIntersect.point.x, planeIntersect.point.y-0.05, planeIntersect.point.z);
                }//if (planeIntersect) {//结果
            }//if (event.button === 2)
        };
        ////////////////////////////////////////开始进行鼠标射线检测选座功能//////////////////////////////////////////////////////////////////////
    },

    Update:function(arg){
        if(arg > 0.5) return;
        this.resetKeys();
        this._delayTime += arg;

        this.updateKeys(arg);
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
        let nowPos=this.gameObject.getComponent(Web3DEngine.Transform).localPosition;
        

        this._direction.copy(new Web3DEngine.Vector3(
            this._keys.right - this._keys.left,0,this._keys.back - this._keys.forward)).normalize();
        
        if(nowPos.x<1.71 || nowPos.x>3.2 || nowPos.z<-1.8 || nowPos.z>4.84)
            this.gameObject._imp.translateOnAxis(this._direction, arg * (-2));
        
        this.gameObject._imp.translateOnAxis(this._direction, arg * this.speed);
        if(nowPos.x<1.6&&nowPos.x>1.6-0.1)
            nowPos.x=1.6;
        else if(nowPos.x>3&&nowPos.x<3+0.1)
            nowPos.x=3;
        if(nowPos.z<-1.8&&nowPos.z>-1.8-0.1)
            nowPos.z=-1.8;
        else if(nowPos.z>4.84&&nowPos.z<4.84+0.1)
            nowPos.z=4.84;
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
