function SceneSet(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = SceneSet.classType;

    this.man=null;
    this.man_move=null;
    this.time=0;
}

Web3DEngine.ExtendType( SceneSet , Web3DEngine.MonoBehaviour, {
	Awake:function(arg){
    },
	Start:function(arg){
	    //开始加载模型//
        import('./GLTFLoader.js').then((module) => {
        // var loader = new module.GLTFLoader();
            var loader = new Web3DEngine._W3DGLTFLoader;
                loader.load(
                    'files/assets/man.glb',//'robot06.glb',//'files/assets/man.glb',//'birds.glb',//'files/assets/man.glb',
                    function ( gltf ) {//console.log(Web3DEngine.SceneManager.GetActiveScene()._imp.children);
                        let mesh = new Web3DEngine.Mesh;
                        mesh._originalAsset = gltf;
                        if(gltf.scene.transform._sceneRootGO)gltf.scene.transform._sceneRootGO.transform._removeChild(gltf.scene.transform);// 若存在于场景中，则移除
                        window.manAsset = mesh;
                    },
                    function ( xhr ) {console.log((xhr.loaded / xhr.total * 100 ) + '% loaded' );},
                    function ( error ) {console.log( 'error');}
                );
            });
        //完成加载模型



        ///完成导入女性模型
        var nowRoom=appInst._renderScenePass.scene.children[1].children[0].children[4].children[0].children[0].children[0];

        var cubeTextureLoader=new THREE.CubeTextureLoader();
        cubeTextureLoader.setPath('./files/assets/1598954894685/');
        var cubeTexture=cubeTextureLoader.load(['starsky.jpg','starsky.jpg','starsky.jpg','starsky.jpg','starsky.jpg','starsky.jpg']);
        appInst._renderScenePass.scene.background=cubeTexture;

        nowRoom.children[7].material=new THREE.MeshLambertMaterial({envMap:appInst._renderScenePass.scene.background});
        nowRoom.children[7].material.roughness=0;
        nowRoom.children[7].material.metalness=1;
        nowRoom.children[7].material.needsUpdate=true;

        //开始为全部屏幕设置贴图
        var myallscreen=appInst._renderScenePass.scene.children[1].children[0].children[0].children;
        for(var i=0;i<myallscreen.length;i++){
            var j=i%(myimgpanel_bg.length);
            myallscreen[i].name=j;
            var texture = new THREE.Texture();
            texture.image = myimgpanel_bg[j].img;//bg001.img;
            texture.needsUpdate = true;
            texture.wrapS=texture.wrapT=THREE.ClampToEdgeWrapping;
            texture.minFilter=THREE.LinearFilter;
            texture.magFilter=THREE.LinearFilter;
            texture.format=THREE.RGBFormat;
            myallscreen[i].children[0].material=
                new THREE.MeshLambertMaterial({
                    map: texture // 将材质的map属性设置为加载的图片
                });
        }//for(var i=0;i<myallscreen.length;i++)
        //完成为全部屏幕设置贴图
        ////////////////////////////////开始添加NPC////////////////////////////////
        //需要数组mansPA--全局变量

        for (var i = 0; i < 7; i++) {//上衣//1.上衣 2.头手 3.鞋子 4.裤子
            var man;
            if (typeof (firstman) == 'undefined') {
                firstman = creater(this.man);//new Web3DEngine.GameObject();
                man = firstman;
                var renderer = man.getComponent(Web3DEngine.SkinnedMeshRenderer);///蒙皮网格渲染器
                var play = renderer.gameObject.addComponent(Web3DEngine.AnimationPlayer);
            } else man = Web3DEngine.GameObject.Instantiate(firstman);//模型
            //贴图
            if (i != 0) setMapping3(renderer, i, 1);//上衣//1.上衣 2.头手 3.鞋子 4.裤子
            if (i != 0) setMapping3(renderer, i, 2);//头手
            if (i != 0) setMapping3(renderer, i, 4);//裤子
            //颜色
            setColour2(renderer, Math.floor(Math.random() * 8 + 1), 1);//上衣
            setColour2(renderer, i, 3);//鞋子
            setColour2(renderer, 7-i, 4);//裤子
            //骨骼
            var boneArray = [];//总共有41根骨头
            for (var j = 0; j < renderer._skeletons[0].boneInverses.length; j++) {///skeletons骨骼
                var copyBoneInverses = new THREE.Matrix4().copy(renderer._skeletons[0].boneInverses[j]);///从蒙皮网格渲染器骨骼中取一根骨头
                boneArray.push(copyBoneInverses);///将取出的骨头存入到数组中
            }
            for (var k = 1; k < 10; k++) adjustBone(k, Math.random(), renderer, boneArray);
            //动作//setAnimation(man,5,0.1+4*Math.random());
            renderer = man.getComponent(Web3DEngine.SkinnedMeshRenderer);
            var play = renderer.gameObject.getComponent(Web3DEngine.AnimationPlayer);
            if (i==5) play.CrossFade('Male_Walk', 0.1);
            else {
                play.CrossFade('Male_Stand_LookAround', 0.1);
                play.speed = 0.1 + Math.random();
            }
            //man.getComponent(Web3DEngine.SkinnedMeshRenderer).castShadow=true;

            man.getComponent(Web3DEngine.Transform).localScale = new THREE.Vector3(1, 1 + Math.random()/4-0.125, 1);
            if(mansPA[i][2]<-9)man.getComponent(Web3DEngine.Transform).localPosition = new THREE.Vector3(mansPA[i][0],0.17,mansPA[i][2]);
            else man.getComponent(Web3DEngine.Transform).localPosition = new THREE.Vector3(mansPA[i][0],0,mansPA[i][2]);
            man.getComponent(Web3DEngine.Transform).localEulerAngles = new THREE.Vector3(0,mansPA[i][3]+90, 0);

            if(i==5)this.man_move=man;
        }
        ////////////////////////////////完成添加NPC////////////////////////////////


        //function showtime(){alert(123);}setTimeout('showtime()',4000);
        if(typeof(mypanel10)!='undefined'){
            mypanel10.style.display="none";
        }
        //alert('右键开/关自动漫游，左键单击图片全屏显示')
    },
	OnEnable:function(arg){
    },
	OnDisable:function(arg){
    },
	Update:function(arg){
        man_move(this.man_move);
    },
    LateUpdate:function(arg){
    },
	OnDestroy:function(dt){
	}

});
SceneSet.attributes.add( 'man', {
    type: 'entity',
    title: 'man'
});
function creater(model,haveAnimation){
    var obj = new Web3DEngine.GameObject();
    var SkinnedMeshRenderer=obj.addComponent(Web3DEngine.SkinnedMeshRenderer);//为对象添加蒙皮渲染插件
    if(typeof(haveAnimation) != "undefined"&&haveAnimation)obj.addComponent(Web3DEngine.AnimationPlayer);
    SkinnedMeshRenderer.mesh = model;//将模型赋值给蒙皮组件
    //console.log('model:',model);
    SkinnedMeshRenderer.castShadow=true;
    return obj;
}
function setAnimation(mesh,myAnimation,speed){//'Walking','Sitting','Sitting Idle'
// Male_Sit_handclap    Male_Sitting   Male_SitToStand   Male_Stand_handclap    Male_Stand_LookAround   Male_StandToSit   Male_Walk
//1.Male_Sit_handclap  2.Male_Sitting  3.Male_SitToStand   4.Male_Stand_handclap    5.Male_Stand_LookAround   6.Male_StandToSit   7.Male_Walk
    if(myAnimation==1)     mesh.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Sit_handclap', 0.1);
    else if(myAnimation==2)mesh.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Sitting', 0.1);
    else if(myAnimation==3)mesh.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_SitToStand', 0.1);
    else if(myAnimation==4)mesh.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Stand_handclap', 0.1);
    else if(myAnimation==5)mesh.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Stand_LookAround', 0.1);
    else if(myAnimation==6)mesh.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_StandToSit', 0.1);
    else if(myAnimation==7)mesh.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Walk', 0.1);
    mesh.getComponent(Web3DEngine.AnimationPlayer).speed=speed;
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
function move(myTransform,direction,step){//移动游戏对象、相机、光源
    if(typeof(step) == "undefined")step=0.1;
    if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    control(myTransform.localPosition,direction,step);
}
var man_move_direction=1;
function man_move(obj){//移动游戏对象、相机、光源
    obj=obj.getComponent(Web3DEngine.Transform);
    if(man_move_direction==1&&obj.localPosition.x>13){
        man_move_direction=-1;
        obj.localEulerAngles=new THREE.Vector3(0,-90,0);
    }
    if(man_move_direction==-1&&obj.localPosition.x<-4){
        man_move_direction=1;
        obj.localEulerAngles=new THREE.Vector3(0,90,0);
    }
    move(obj,1,0.01*man_move_direction);
}
