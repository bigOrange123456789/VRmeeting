function SceneSet(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = SceneSet.classType;
    this.chair=null;
    this.screen=null;
}

var chairSave;
chairSave=[];

Web3DEngine.ExtendType( SceneSet , Web3DEngine.MonoBehaviour, {
	Awake:function(arg){
    },
	Start:function(arg){
	    var vedio=document.getElementById('video');
	    var texture=new THREE.VideoTexture(vedio);
	    texture.wrapS=texture.wrapT=THREE.ClampToEdgeWrapping;
	    texture.minFilter=THREE.LinearFilter;
	    texture.magFilter=THREE.LinearFilter;
	    texture.format=THREE.RGBFormat;
	    this.screen.gameObject._imp.children[0].material.map=texture;

        var firstChair=creater(this.chair);
        firstChair.transform.localScale.set(0.025,0.025,0.025);
        firstChair.transform.localEulerAngles=new THREE.Vector3(0,-90,0);
        firstChair.getComponent(Web3DEngine.Transform).localPosition.set(0,-10,0);
        for(var i=0;i<8;i++){
            for(var j=0;j<23;j++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);//console.log(newChair._compoents[1]);
                firstChair.getComponent(Web3DEngine.Transform).localPosition.set(0.8-1.5*i,0.18+0.15*i,2.8-0.33*j);
                chairSave.push(newChair);
            }
        }
        if(typeof(mypanel10)!='undefined')mypanel10.style.display="none";
    },
	OnEnable:function(arg){
        console.log('OnEnable函数，游戏对象激活或者脚本激活时调用，在Start之前');
    },
	OnDisable:function(arg){
        console.log('OnDisable函数，游戏对象隐藏或者脚本隐藏时调用');
    },
	Update:function(arg){
    },
    LateUpdate:function(arg){
    },

	OnDestroy:function(dt){
        console.log('OnDestroy函数，绑定的游戏对象或脚本销毁时调用');
	}
    
});

SceneSet.attributes.add( 'chair', {
    type: 'asset',
    title: 'chair'
});
SceneSet.attributes.add( 'screen', {
    type: 'entity',
    title: 'screen'
});


function creater(model,haveAnimation){
    var obj = new Web3DEngine.GameObject();
    var SkinnedMeshRenderer=obj.addComponent(Web3DEngine.SkinnedMeshRenderer);//为对象添加蒙皮渲染插件
    if(typeof(haveAnimation) != "undefined"&&haveAnimation)obj.addComponent(Web3DEngine.AnimationPlayer);
    SkinnedMeshRenderer.mesh = model;//将模型赋值给蒙皮组件
    SkinnedMeshRenderer.castShadow=true;
    return obj;
}