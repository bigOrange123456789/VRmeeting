function LightControl(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = LightControl.classType;
    
}

Web3DEngine.ExtendType( LightControl , Web3DEngine.MonoBehaviour, {

	Start:function(arg){
        let light = this.gameObject.getComponent(Web3DEngine.Light);
        let color = light.color.clone();
        let angle = light.gameObject.transform.localEulerAngles.clone();
        this._createLightUI(0, clickCB, slideCB, '光线强度');
        this._createLightUI(1, clickCB, slideCB, '光线冷暖');
        this._createLightUI(2, clickCB, slideCB, '光线角度');

        light.color = color;
        
        function clickCB() {

        }

        function slideCB(event) {
            let morphID = this.morphID;     //this的对象为styleProgress滑块
            let value = event.target.value;
            if(morphID === 0)
            {
                light.intensity =value/1.2+0.5;// value * 10;
            }
            else if(morphID === 1)
            {
                light.color = new THREE.Color(color.r + (value - 0.5) * 0.5,color.g,color.b - (value - 0.5) * 0.5);
            }
            else if(morphID === 2)
            {
                light.gameObject.transform.localEulerAngles = new THREE.Vector3(angle.x + (value - 0.5) * 100,angle.y, angle.z);
            }
            
            ///console.log(Number(event.target.value));
            
        }
    },
	
    _createLightUI: function (morphID, clickCB, slideCB, name) {
        let topPx = (20 + morphID * 45);

        //按钮
        let label = document.createElement('button');
        label.setAttribute('id', 'btnMorph' + morphID);
        label.innerHTML = name;
        label.style = 'position:absolute; right:160px; top:' + topPx + 'px;';
        // label.style = 'position:absolute; right:160px; top:' + topPx + 'px; height: 28px';
        label.setAttribute("class","btn btn-info")//加一个bootstrap的class
        //document.getElementById('application-canvas').appendChild(label);
        document.body.appendChild(label);

        //滑动条
        let styleProgress = document.createElement('input');
        label.setAttribute('id', 'inputMorph' + morphID);
        styleProgress.setAttribute('type', 'range');
        styleProgress.min = 0;
        styleProgress.max = 1;
        styleProgress.step = 0.01;
        styleProgress.value = 0.5;
        styleProgress.style = 'position:absolute; right:20px; top:' + topPx + 'px; height: 25px';
        document.body.appendChild(styleProgress);

        //设置ID和回调
        label.morphID = morphID;
        styleProgress.morphID = morphID;
        label.onclick = clickCB;
        styleProgress.oninput = slideCB;
    },


});

