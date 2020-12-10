function SceneSet(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = SceneSet.classType;
    this.showtexture0=null;this.showtexture1=null;this.showtexture2=null;this.showtexture3=null;this.showtexture4=null;this.showtexture5=null;this.showtexture6=null;this.showtexture7=null;this.showtexture8=null;this.showtexture9=null;this.showtexture10=null;this.showtexture11=null;this.showtexture12=null;this.showtexture13=null;this.showtexture14=null;this.showtexture15=null;this.showtexture16=null;
    this.image=null;
    this.allImage=[this.showtexture0,this.showtexture1,this.showtexture2,this.showtexture3,this.showtexture4,this.showtexture5,this.showtexture6,this.showtexture7,this.showtexture8,this.showtexture9,this.showtexture10,this.showtexture11,this.showtexture12,this.showtexture13,this.showtexture14,this.showtexture15,this.showtexture16];
}

Web3DEngine.ExtendType( SceneSet , Web3DEngine.MonoBehaviour, {
	Awake:function(arg){
        console.log('Awake函数，我只在初始化时调用一次');
    },
	Start:function(arg){
        /*for(let i=0;i<53;i++){
            let nowImage=this.allImage._children[i].gameObject._imp.children[0].material.map;
            let num=randomNum(0,16);
        }*/
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

//图片展品资源
for(let i=0;i<17;i++){
    let newtitle='showtexture'+i;
    SceneSet.attributes.add(newtitle,{
        type:'asset',
        assetType:'texture',
        title:newtitle
    });
}

//画框资源
SceneSet.attributes.add('image',{
    type:'entity',
    default:null,
    title:'image',
    description:'image'
});

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        default: 
            return 0; 
    } 
}