function Test(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = Test.classType;
    this.attribute = null;
}

Web3DEngine.ExtendType( Test , Web3DEngine.MonoBehaviour, {
	Awake:function(arg){
        console.log('Awake函数，我只在初始化时调用一次');
    },
	Start:function(arg){
        console.log('Start函数，在脚本enable情况下才被调用，调用顺序在Awake和OnEnable之后，只调用一次');
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

Test.attributes.add( 'attribute', {
    type: 'string',
    default: 'hello , world',
    title: 'attribute',
    description: 'open attribute name attribute ; type - string ;'
});