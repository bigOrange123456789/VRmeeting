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
	    var vedio=document.getElementById('video');
	    var texture=new THREE.VideoTexture(vedio);
	    var material= new THREE.MeshBasicMaterial({color:0xffffff});
	    material.map=texture;
	    var square = new THREE.CubeGeometry(0.004,2.2,3.0);

	    var myobj= new THREE.Mesh(square, material);
	    myobj.position.set(5 ,1 ,-13);
	    //myobj.rotation.set(0,-45*3.1415/180,0);
	    appInst._renderScenePass.scene.add(myobj);
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
