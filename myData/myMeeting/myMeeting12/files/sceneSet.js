function SceneSet(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = SceneSet.classType;
    this.chair=null;
    this.screen=null;
    this.man=null;

    if(typeof(mypanel10)!='undefined')mypanel10.style.display="none";


    this.maletexture1=null;this.maletexture2=null;this.maletexture3=null;this.maletexture4=null;this.maletexture5=null;this.maletexture6=null;this.maletexture7=null;
    this.femaletexture1=null;this.femaletexture2=null;this.femaletexture3=null;this.femaletexture4=null;this.femaletexture5=null;this.femaletexture6=null;this.femaletexture7=null;this.femaletexture8=null;this.femaletexture9=null;this.femaletexture10=null;
    this.femaletexture11=null;this.femaletexture12=null;this.femaletexture13=null;this.femaletexture14=null;this.femaletexture15=null;this.femaletexture16=null;this.femaletexture17=null;this.femaletexture18=null;this.femaletexture19=null;this.femaletexture20=null;
    this.femaletexture21=null;this.femaletexture22=null;this.femaletexture23=null;this.femaletexture24=null;this.femaletexture25=null;this.femaletexture26=null;
}

var chairSave;
chairSave=[];
var screen;
screen=[];

Web3DEngine.ExtendType( SceneSet , Web3DEngine.MonoBehaviour, {
	Awake:function(arg){
    },
	Start:function(arg){

        var textures=new Array(19);
        textures[0]=this.maletexture1;
        textures[1]=this.maletexture1;
        textures[2]=this.maletexture2;
        textures[3]=this.maletexture3;
        textures[4]=this.maletexture4;
        textures[5]=this.maletexture5;
        textures[6]=this.maletexture6;
        textures[7]=this.maletexture7;
        textures[8]=this.femaletexture1;
        textures[9]=this.femaletexture2;
        textures[10]=this.femaletexture3;
        textures[11]=this.femaletexture4;
        textures[12]=this.femaletexture15;
        textures[13]=this.femaletexture16;
        textures[14]=this.femaletexture17;
        textures[15]=this.femaletexture22;
        textures[16]=this.femaletexture23;
        textures[17]=this.femaletexture24;
        textures[18]=this.femaletexture25;

        var textures_woman=new Array(26);

	    var vedio=document.getElementById('video');
	    var texture=new THREE.VideoTexture(vedio);
	    texture.wrapS=texture.wrapT=THREE.ClampToEdgeWrapping;
	    texture.minFilter=THREE.LinearFilter;
	    texture.magFilter=THREE.LinearFilter;
	    texture.format=THREE.RGBFormat;
	    this.screen.gameObject._imp.children[0].material.map=texture;
        //开始摆放椅子
        var firstChair=creater(this.chair);
        firstChair.transform.localScale.set(0.025,0.025,0.025);
        firstChair.transform.localEulerAngles=new THREE.Vector3(0,-90,0);
        firstChair.getComponent(Web3DEngine.Transform).localPosition.set(-11,-2,15);
        for(var k=0;k<3;k++)//一楼前部分
        for(var i=0;i<12;i++)
            for(var j=0;j<11;j++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);
                firstChair.getComponent(Web3DEngine.Transform).localPosition.set(10-0.5*i,0.15+i*0.03,8.5-0.5*j-k*7.5);//前后、上下、左右
                chairSave.push(newChair);
            }
        for(var k=0;k<3;k++)//一楼后部分
        for(var i=0;i<15;i++)
            for(var j=0;j<11;j++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);
                if(i<2)newChair.getComponent(Web3DEngine.Transform).localPosition.set(3.2-0.9*i,0.55+i*0.145,8.5-0.5*j-k*7.5);//前后、上下、左右
                else newChair.getComponent(Web3DEngine.Transform).localPosition.set(3.2-0.9*i,0.5+i*0.145,8.5-0.5*j-k*7.5);//前后、上下、左右
                chairSave.push(newChair);
            }
        for(var k=0;k<3;k++)//二楼//
        for(var i=0;i<11;i++)
            for(var j=0;j<11;j++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);
                firstChair.getComponent(Web3DEngine.Transform).localPosition.set(-1.6-0.9*i,9.00+i*0.5,8.5-0.5*j-k*7.5);//前后、上下、左右
                chairSave.push(newChair);
            }
            console.log(3*(12+17+14)*11,chairSave.length);
        //完成摆放椅子
        //开始摆放侧屏幕
	    var vedio=document.getElementById('video');
	    var texture=new THREE.VideoTexture(vedio);
	    var material= new THREE.MeshBasicMaterial({color:0xffffff});
	    material.map=texture;
	    var square = new THREE.CubeGeometry(0.004,2.2,3.0);

	    var myobj= new THREE.Mesh(square, material);
	    myobj.position.set(14.5 ,4.31 ,7.66);
	    myobj.rotation.set(0,-45*3.1415/180,0);
	    appInst._renderScenePass.scene.add(myobj);
	    screen.push(myobj);         

	    var myobj2= new THREE.Mesh(square, material);
	    myobj2.position.set(14.5 ,4.31 ,-10.66);
	    myobj2.rotation.set(0,45*3.1415/180,0);
	    appInst._renderScenePass.scene.add(myobj2);
	    screen.push(myobj2);
                    screen.push(this.screen.gameObject._imp);//将大屏幕添加到数组中
        //完成摆放侧屏幕
        //开始布置NPC
        var seat=[];//new Array(chairSave.length);
        for(var i=0;i<chairSave.length;i++)seat.push(0);
        //console.log(seat.length,seat);

        var flag=0;
        //for(var i2=0;i2<1000;i2+=1)
        //for(var i2=0;i2<11&&flag<1000;i2+=2)//头部大小
                for(var i4=0;i4<18&&flag<chairSave.length;i4++)//裤子
                    for(var i2=0;i2<18&&flag<chairSave.length;i2++)//头手
                    for(var i1=0;i1<18&&flag<chairSave.length&&flag<500;i1++) {//上衣//1.上衣 2.头手 3.鞋子 4.裤子
                    flag++;
                    var man;
                    if(typeof(firstman)=='undefined'){
                        firstman=creater(this.man);//new Web3DEngine.GameObject();
                        man=firstman;
                        var renderer =man.getComponent(Web3DEngine.SkinnedMeshRenderer);///蒙皮网格渲染器
                        var play = renderer.gameObject.addComponent(Web3DEngine.AnimationPlayer);
                    }else man=Web3DEngine.GameObject.Instantiate(firstman);//模型

                    if(i1!=0)setMapping2(renderer,textures,i1,1);//1.上衣 2.头手 3.鞋子 4.裤子
                    if(i2!=0)setMapping2(renderer,textures,i2,2);
                    if(i4!=0)setMapping2(renderer,textures,i4,4);
                    setColour2(renderer,Math.floor(Math.random()*8+1),1);
                    setColour2(renderer,Math.floor(Math.random()*8+1),3);
                    setColour2(renderer,Math.floor(Math.random()*8+1),4);

                    renderer=man.getComponent(Web3DEngine.SkinnedMeshRenderer);
                    var play = renderer.gameObject.getComponent(Web3DEngine.AnimationPlayer);
                    if(Math.random()<0.2)play.CrossFade('Male_Sitting', 0.1);
                    else{
                        play.CrossFade('Male_Sit_handclap', 0.1);
                        play.speed=0.1+4*Math.random();
                    }

    var boneArray = [];//总共有41根骨头
    for (var i = 0; i < renderer._skeletons[0].boneInverses.length; i++) {///skeletons骨骼
        var copyBoneInverses = new THREE.Matrix4().copy(renderer._skeletons[0].boneInverses[i]);///从蒙皮网格渲染器骨骼中取一根骨头
        boneArray.push(copyBoneInverses);///将取出的骨头存入到数组中
    }
    //adjustBone(1,i2*0.1,renderer,boneArray);
    for(var k=1;k<10;k++)adjustBone(k,Math.random(),renderer,boneArray);


                    var getOneSeat=parseInt(Math.random()*chairSave.length);
                    while(seat[getOneSeat]==1)getOneSeat=parseInt(Math.random()*chairSave.length);
                    seat[getOneSeat]++;
                    //var h=(Math.random()/2+0.75);
                    //scaleSet(man, 0.5,0.5*h, 0.5);
                    //scaleSet(chairSave[getOneSeat],0.1,0.08*h ,0.1);
                    man.getComponent(Web3DEngine.SkinnedMeshRenderer).castShadow=true;
                    chairSave[getOneSeat].getComponent(Web3DEngine.SkinnedMeshRenderer).castShadow=true;
                    man.getComponent(Web3DEngine.Transform).localScale=new THREE.Vector3(0.5,0.5,0.5);
                    man.getComponent(Web3DEngine.Transform).localEulerAngles=new THREE.Vector3(0,90,0);
                    man.getComponent(Web3DEngine.Transform).localPosition=new THREE.Vector3(0.2+chairSave[getOneSeat].getComponent(Web3DEngine.Transform).localPosition.x,chairSave[getOneSeat].getComponent(Web3DEngine.Transform).localPosition.y,chairSave[getOneSeat].getComponent(Web3DEngine.Transform).localPosition.z);
                }
        //完成布置NPC
        //console.log(seat);
        //if(typeof(mypanel10)!='undefined')mypanel10.style.display="none";
        //this_myScreenControl=1;
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
SceneSet.attributes.add( 'man', {
    type: 'entity',
    title: 'man'
});
SceneSet.attributes.add('maletexture1',{
    type:'asset',
    assetType:'texture',
    title:'maletexture1'
});
SceneSet.attributes.add('maletexture2',{
    type:'asset',
    assetType:'texture',
    title:'maletexture2'
});
SceneSet.attributes.add('maletexture3',{
    type:'asset',
    assetType:'texture',
    title:'maletexture3'
});
SceneSet.attributes.add('maletexture4',{
    type:'asset',
    assetType:'texture',
    title:'maletexture4'
});
SceneSet.attributes.add('maletexture5',{
    type:'asset',
    assetType:'texture',
    title:'maletexture5'
});
SceneSet.attributes.add('maletexture6',{
    type:'asset',
    assetType:'texture',
    title:'maletexture6'
});
SceneSet.attributes.add('maletexture7',{
    type:'asset',
    assetType:'texture',
    title:'maletexture7'
});
SceneSet.attributes.add('femaletexture1',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture1'
});
SceneSet.attributes.add('femaletexture2',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture2'
});
SceneSet.attributes.add('femaletexture3',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture3'
});
SceneSet.attributes.add('femaletexture4',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture4'
});
SceneSet.attributes.add('femaletexture5',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture5'
});
SceneSet.attributes.add('femaletexture6',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture6'
});
SceneSet.attributes.add('femaletexture7',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture7'
});
SceneSet.attributes.add('femaletexture8',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture8'
});
SceneSet.attributes.add('femaletexture9',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture9'
});
SceneSet.attributes.add('femaletexture10',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture10'
});
SceneSet.attributes.add('femaletexture11',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture11'
});
SceneSet.attributes.add('femaletexture12',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture12'
});
SceneSet.attributes.add('femaletexture13',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture13'
});
SceneSet.attributes.add('femaletexture14',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture14'
});
SceneSet.attributes.add('femaletexture15',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture15'
});
SceneSet.attributes.add('femaletexture16',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture16'
});
SceneSet.attributes.add('femaletexture17',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture17'
});
SceneSet.attributes.add('femaletexture18',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture18'
});
SceneSet.attributes.add('femaletexture19',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture19'
});
SceneSet.attributes.add('femaletexture20',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture20'
});
SceneSet.attributes.add('femaletexture21',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture21'
});
SceneSet.attributes.add('femaletexture22',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture22'
});
SceneSet.attributes.add('femaletexture23',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture23'
});
SceneSet.attributes.add('femaletexture24',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture24'
});
SceneSet.attributes.add('femaletexture25',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture25'
});
SceneSet.attributes.add('femaletexture26',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture26'
});


function creater(model,haveAnimation){
    var obj = new Web3DEngine.GameObject();
    var SkinnedMeshRenderer=obj.addComponent(Web3DEngine.SkinnedMeshRenderer);//为对象添加蒙皮渲染插件
    if(typeof(haveAnimation) != "undefined"&&haveAnimation)obj.addComponent(Web3DEngine.AnimationPlayer);
    SkinnedMeshRenderer.mesh = model;//将模型赋值给蒙皮组件
    SkinnedMeshRenderer.castShadow=true;
    return obj;
}