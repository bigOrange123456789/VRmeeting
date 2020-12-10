function Changecolor(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = Changecolor.classType;
    
    //if(Changecolor.instance) return;
    //Changecolor.instance=this;
    
    this.attribute = 1;
    this.man1=null;
}

Web3DEngine.ExtendType( Changecolor , Web3DEngine.MonoBehaviour, {
	Awake:function(arg){
        console.log('Awake函数，我只在初始化时调用一次');
    },
	Start:function(arg){
        console.log('Start函数，在脚本enable情况下才被调用，调用顺序在Awake和OnEnable之后，只调用一次');
        console.log(this.attribute);
        var renderer=this.man1.gameObject.getComponent(Web3DEngine.SkinnedMeshRenderer);
        renderer._imp.traverse(node => {
           if(node.material){
               let newMaterial=new node.material.constructor;
               newMaterial.copy(node.material);
               node.material=newMaterial;
               
               //node.material.mainTexture=new Web3DEngine.Texture();
               //var rand=Math.random();
               if(this.attribute==1){
                   //alert(1); 
                   node.material.color.set(0xff1d1d);
               }else{
                   //alert(0);
                   node.material.color.set(0xffffff);
               }
           }
        });
    },
	OnEnable:function(arg){
        console.log('OnEnable函数，游戏对象激活或者脚本激活时调用，在Start之前');
    },
	OnDisable:function(arg){
        console.log('OnDisable函数，游戏对象隐藏或者脚本隐藏时调用');
    },
	Update:function(arg){
        console.log('Update函数，游戏非暂停时每帧调用');
    },
    LateUpdate:function(arg){
        console.log('LateUpdate函数，游戏非暂停时每帧调用，晚于Update');
    },

	OnDestroy:function(dt){
        console.log('OnDestroy函数，绑定的游戏对象或脚本销毁时调用');
	}


});

Changecolor.attributes.add( 'attribute', {
    type: 'number',
    default: 1,
    title: 'attribute',
    description: 'open attribute name attribute ; type - string ;'
});

Changecolor.attributes.add( 'man1', {//这种方法对摄像机、光线也有效
    type: 'entity',
    title: 'man1',
});