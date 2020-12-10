function Main(go) {
    if(typeof(myfirsttext)!='undefined')myfirsttext.innerHTML='资源已加载，正在布置场景！';
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = Main.classType;
    this.attribute = null;
    
    this.meetingroom=null;
    this.model=null;
    this.model2=null;
    this.model3=null;
    this.model4=null;
    this.model5=null;
    this.model6=null;
    this.room1=null;this.room2=null;
    this.man1=null;//奔跑的男人
    this.man2=null;//散步的男人
    this.man1_flag=1;
    this.table1=null;
    this.table2=null;
    this.tv=null;
    this.screen=null;
    this.maletexture1=null;this.maletexture2=null;this.maletexture3=null;this.maletexture4=null;this.maletexture5=null;this.maletexture6=null;this.maletexture7=null;
    this.femaletexture1=null;this.femaletexture2=null;this.femaletexture3=null;this.femaletexture4=null;this.femaletexture5=null;this.femaletexture6=null;this.femaletexture7=null;this.femaletexture8=null;this.femaletexture9=null;this.femaletexture10=null;
    this.femaletexture11=null;this.femaletexture12=null;this.femaletexture13=null;this.femaletexture14=null;this.femaletexture15=null;this.femaletexture16=null;this.femaletexture17=null;this.femaletexture18=null;this.femaletexture19=null;this.femaletexture20=null;
    this.femaletexture21=null;this.femaletexture22=null;this.femaletexture23=null;this.femaletexture24=null;this.femaletexture25=null;this.femaletexture26=null;
    
    this.myfoor=null;
}
var sprite_all;sprite_all=[];
Web3DEngine.ExtendType( Main , Web3DEngine.MonoBehaviour, {
	Awake:function(arg){
        console.log('Awake函数，我只在初始化时调用一次');
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
        console.log('Start函数，在脚本enable情况下才被调用，调用顺序在Awake和OnEnable之后，只调用一次');
        //设定会议人数
        var peopleNum=1000;
        //加载会议室场景
        
        var chairCount=peopleNum;
        var amplify=Math.ceil((peopleNum-4)/2);
        var chairSave=[];
        
        if(peopleNum<40){
            this.meetingroom=creater(this.room1);
            moveSet(this.meetingroom,0,0.3,0);
            if(peopleNum>12)
                chairCount=12;
            amplify=Math.ceil((chairCount-4)/2);
            var roomLen=7*(0.1+0.1*amplify);
            //添加桌子
            var table=creater(this.table1);
            table.transform.parent=this.meetingroom.transform;
            if(peopleNum>4)
                scaleSet(table,0.1+0.04*amplify,0.1,0.2);
            else{
                scaleSet(table,0.1,0.1,0.2);
            }
            moveSet(table,0,-1,0);
            table.transform.localEulerAngles=new Web3DEngine.Vector3(0,90,0);
            
            //会议室缩放
            if(peopleNum<5){
                scaleSet(this.meetingroom,0.5,1,0.4);
            }
            else{
                scaleSet(this.meetingroom,0.5,1,0.4+0.15*amplify);
            }
            
            //屏幕
            var screen=creater(this.tv);
            moveSet(screen,-0.7,-0.7,1.8+0.6*amplify);
            scaleSet(screen,0.0005,0.0005,0.0005);
            rotationSet(screen,0,90,0);
            
            //添加椅子
            var frontChair=creater(this.model);
            chairSave.push(frontChair);
            scaleSet(chairSave[0],0.1,0.1,0.1);
            moveSet(chairSave[0],0,-0.7,-roomLen/2-0.2);
            
            for(var i=1;i<chairCount;i++){
                var newChair=Web3DEngine.GameObject.Instantiate(frontChair);
                chairSave.push(newChair);
            }
            if(peopleNum%2==0 || peopleNum>12){
                //后椅子位置
                var backChair=chairSave[1];
                backChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,180,0);
                moveSet(backChair,0,-0.7,roomLen/2+0.2);
                chairCount=chairCount-2;
            }
            else
                chairCount=chairCount-1;

            for(var i=0;i<chairCount/2;i++){
                var index=0;
                if(peopleNum%2==0 || peopleNum>12)
                    index=2*(i+1);
                else
                    index=i*2+1;
                var leftX=0.6;
                var rightX=-0.6;
                //var startY=-0.25*amplify+0.13*amplify*(i-1);
                var startY=-roomLen/2+(roomLen/(chairCount/2+1))*(i+1);
                var leftChair=chairSave[index];
                var rightChair=chairSave[index+1];
                leftChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,-90,0);
                moveSet(leftChair,leftX,-0.7,startY);
                rightChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,90,0);
                moveSet(rightChair,rightX,-0.7,startY);
            }
            
            var roomWid=3;
            if(peopleNum>12){
                for(var i=0;i<7;i++){
                    var x=roomWid/2-0.5*i;
                    var y=-1.6-0.5*amplify;
                    var newChair=Web3DEngine.GameObject.Instantiate(frontChair);
                    chairSave.push(newChair);
                    moveSet(newChair,x,-0.7,y);
                }
            }
            
            if(peopleNum>19){
                for(var i=0;i<10;i++){
                    var x=roomWid/2+0.2;
                    var y=-1.6+0.4*i;
                    var newChair=Web3DEngine.GameObject.Instantiate(frontChair);
                    newChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,-90,0);
                    chairSave.push(newChair);
                    moveSet(newChair,x,-0.7,y);
                }
            }
            
            if(peopleNum>29){
                for(var i=0;i<10;i++){
                    var x=-roomWid/2-0.2;
                    var y=-1.6+0.4*i;
                    var newChair=Web3DEngine.GameObject.Instantiate(frontChair);
                    newChair.transform.localEulerAngles=new Web3DEngine.Vector3(0,90,0);
                    chairSave.push(newChair);
                    moveSet(newChair,x,-0.7,y);
                }
            }
        }
        else if(peopleNum<100){


            this.meetingroom=creater(this.room1);
            moveSet(this.meetingroom,0,0.3,0);
            
            amplify=Math.ceil(peopleNum/10);
            scaleSet(this.meetingroom,1.2,1,0.5+0.15*amplify);
            
            var table=creater(this.table2);
            scaleSet(table,0.05,0.05,0.05);
            moveSet(table,0,-0.7,amplify/2+1.5);
            
            var screen=creater(this.screen);
            scaleSet(screen,0.001,0.001,0.001);
            screen.transform.localEulerAngles=new Web3DEngine.Vector3(0,180,0);
            moveSet(screen,0,0.8,amplify/2+2.5);
            
            var firstChair=creater(this.model);
            chairSave.push(firstChair);
            scaleSet(chairSave[0],0.1,0.1,0.1);
            for(var i=1;i<amplify*10;i++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);
                chairSave.push(newChair);
            }

            for(var i=0;i<amplify;i++){
                var y=amplify/2-i;
                for(var j=0;j<10;j++){
                    var x=-3+j*0.7;
                    moveSet(chairSave[i*10+j],x,-0.7,y);
                }
            }
        }else if(peopleNum<500){
            amplify=Math.ceil(peopleNum/20);
            scaleSet(this.meetingroom,2.3,1,0.5+0.15*amplify);
            
            var table=creater(this.table2);
            scaleSet(table,0.05,0.05,0.05);
            moveSet(table,0,-0.7,amplify/2+1.5);
            
            var screen=creater(this.screen);
            scaleSet(screen,0.001,0.001,0.001);
            screen.transform.localEulerAngles=new Web3DEngine.Vector3(0,180,0);
            moveSet(screen,0,0.8,amplify/2+2.5);
            
            var firstChair=creater(this.model);
            chairSave.push(firstChair);
            scaleSet(chairSave[0],0.1,0.1,0.1);
            for(var i=1;i<amplify*20;i++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);

                chairSave.push(newChair);
            }

            for(var i=0;i<amplify;i++){
                var y=amplify/2-i;
                for(var j=0;j<20;j++){
                    var x=-7+j*0.7;
                    moveSet(chairSave[i*20+j],x,-0.7,y);
                }
            }
        }else if(peopleNum==1000){
            var seat=new Array();
            for(var i=0;i++;i<1000)seat.push(0);
            this.meetingroom=creater(this.room2);
            this.meetingroom.transform.localEulerAngles=new Web3DEngine.Vector3(0,180,0);
            scaleSet(this.meetingroom,0.05,0.008,0.015);
            moveSet(this.meetingroom,0,-0.7,0);

            var firstChair=creater(this.model);
            chairSave.push(firstChair);
            scaleSet(chairSave[0],0.1,0.1,0.1);
            for(var i=1;i<20*50;i++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);
                //newChair.getComponent(Web3DEngine.SkinnedMeshRenderer).castShadow=true;
                chairSave.push(newChair);
            }

            var positionSave=[];
            for(var i=0;i<20;i++){
                var y=20/2-i;
                for(var j=0;j<50;j++){
                    var x=-17+j*0.7;
                    moveSet(chairSave[i*50+j],x,-0.7,y);
                    positionSave.push([x,-0.7,y+0.2]);
                }
            }

            var flag=0;

            for(var i2=0;i2<11&&flag<1000;i2+=2)//头部大小
                for(var i3=0;i3<9&&flag<1000;i3++)//颜色
                for(var i1=0;i1<18&&flag<1000;i1++) {//贴图
                    flag++;
                var man = new Web3DEngine.GameObject();///模型
                var renderer = man.addComponent(Web3DEngine.SkinnedMeshRenderer);///蒙皮网格渲染器
                renderer.mesh = this.model3;

                if(i1!=0)setMapping(renderer,textures,i1);

                let boneArray = [];//总共有41根骨头
                for (let i = 0; i < renderer._skeletons[0].boneInverses.length; i++) {///skeletons骨骼
                    let copyBoneInverses = new THREE.Matrix4().copy(renderer._skeletons[0].boneInverses[i]);///从蒙皮网格渲染器骨骼中取一根骨头
                    boneArray.push(copyBoneInverses);///将取出的骨头存入到数组中
                }

                adjustBone(1,i2*0.1,renderer,boneArray);
                    for(var k=2;k<17;k++){
                        adjustBone(k,Math.random(),renderer,boneArray);
                    }

                if(i3!=0)setColour(renderer,i3);
                var play = renderer.gameObject.addComponent(Web3DEngine.AnimationPlayer);
                play.CrossFade('Sitting', 0.1);
                play.speed=0.1+1.8*Math.random();


                var getOneSeat=parseInt(Math.random()*1000);
                while(seat[getOneSeat]==1)getOneSeat=parseInt(Math.random()*1000);
                seat[getOneSeat]=1;
                var h=(Math.random()/2+0.75);
                scaleSet(man, 0.5,0.5*h, 0.5);
                scaleSet(chairSave[getOneSeat],0.1,0.08*h ,0.1);
                man.getComponent(Web3DEngine.SkinnedMeshRenderer).castShadow=true;
                chairSave[getOneSeat].getComponent(Web3DEngine.SkinnedMeshRenderer).castShadow=true;
                moveSet(man, positionSave[getOneSeat][0], positionSave[getOneSeat][1], positionSave[getOneSeat][2]-0.1);
            }
        }else if(peopleNum<5000){
            this.meetingroom=creater(this.room2);
            this.meetingroom.transform.localEulerAngles=new Web3DEngine.Vector3(0,180,0);
            scaleSet(this.meetingroom,0.05,0.008,0.015);
            moveSet(this.meetingroom,0,-0.7,0);
            
            amplify=Math.ceil(peopleNum/50);
            //scaleSet(this.meetingroom,5,1,0.5+0.15*amplify);

            
            //var sitPeople=creater(this.model3);
            var firstChair=creater(this.model);
            chairSave.push(firstChair);
            //scaleSet(sitPeople,0.5,0.5,0.5);
            scaleSet(chairSave[0],0.1,0.1,0.1);
            for(var i=1;i<amplify*50;i++){
                var newChair=Web3DEngine.GameObject.Instantiate(firstChair);
                //var newChair=creater(this.model);
                //scaleSet(newChair,0.1,0.1,0.1);
                chairSave.push(newChair);
            }
            
            var positionSave=[];
            for(var i=0;i<amplify;i++){
                var y=amplify/2-i;
                for(var j=0;j<50;j++){
                    var x=-17+j*0.7;
                    moveSet(chairSave[i*50+j],x,-0.7,y);
                    //var nowPeople=Web3DEngine.GameObject.Instantiate(sitPeople);
                    //moveSet(nowPeople,x,-0.7,y+0.2);
                    positionSave.push([x,-0.7,y+0.2]);
                }
            }
            //添加人物
            for(var i=0;i<amplify*50;i++){
                var man;
                
                var r=Math.random();
                var head;
                var changeTex;
                //随机男女性
                if(r<0.5){
                    let ra=Math.random();
                    //男
                    if(ra<0.3){
                        man=creater(this.model3,true);
                    }
                    else if(ra<0.6) {
                        man = creater(this.model4, true);
                        animationFade(man,'Bip01|Take 001|BaseLayer',0.1);
                    }
                    else {
                        man = creater(this.model6, true);
                        animationFade(man,'Bip01|Take 001|BaseLayer.002',0.1);
                    }
                    let randomNu=randomNum(1,7);
                    switch(randomNu){
                        case 1:
                            changeTex=this.maletexture1;
                            break;
                        case 2:
                            changeTex=this.maletexture2;
                            break;
                        case 3:
                            changeTex=this.maletexture3;
                            break;
                        case 4:
                            changeTex=this.maletexture4;
                            break;
                        case 5:
                            changeTex=this.maletexture5;
                            break;
                        case 6:
                            changeTex=this.maletexture6;
                            break;
                        case 7:
                            changeTex=this.maletexture7;
                            break;
                    }
                    animationSpeed(man,r*2);
                }
                else{
                    //女

                    man=creater(this.model5,true);
                    animationFade(man,'Bip01|Take 001|BaseLayer',0.1);
                    animationSpeed(man,r*2);
                    let randomNu=randomNum(1,26);
                    switch(randomNu){
                        case 1:
                            changeTex=this.femaletexture1;
                            break;
                        case 2:
                            changeTex=this.femaletexture2;
                            break;
                        case 3:
                            changeTex=this.femaletexture3;
                            break;
                        case 4:
                            changeTex=this.femaletexture4;
                            break;
                        case 5:
                            changeTex=this.femaletexture5;
                            break;
                        case 6:
                            changeTex=this.femaletexture6;
                            break;
                        case 7:
                            changeTex=this.femaletexture7;
                            break;
                        case 8:
                            changeTex=this.femaletexture8;
                            break;
                        case 9:
                            changeTex=this.femaletexture9;
                            break;
                        case 10:
                            changeTex=this.femaletexture10;
                            break;
                        case 11:
                            changeTex=this.femaletexture11;
                            break;
                        case 12:
                            changeTex=this.femaletexture12;
                            break;
                        case 13:
                            changeTex=this.femaletexture13;
                            break;
                        case 14:
                            changeTex=this.femaletexture14;
                            break;
                        case 15:
                            changeTex=this.femaletexture15;
                            break;
                        case 16:
                            changeTex=this.femaletexture16;
                            break;
                        case 17:
                            changeTex=this.femaletexture17;
                            break;
                        case 18:
                            changeTex=this.femaletexture18;
                            break;
                        case 19:
                            changeTex=this.femaletexture19;
                            break;
                        case 20:
                            changeTex=this.femaletexture20;
                            break;
                        case 21:
                            changeTex=this.femaletexture21;
                            break;
                        case 22:
                            changeTex=this.femaletexture22;
                            break;
                        case 23:
                            changeTex=this.femaletexture23;
                            break;
                        case 24:
                            changeTex=this.femaletexture24;
                            break;
                        case 25:
                            changeTex=this.femaletexture25;
                            break;
                        default:
                            changeTex=this.femaletexture26;
                            break;
                    }
                }
                var SkinnedMeshRenderer=man.getComponent(Web3DEngine.SkinnedMeshRenderer);
                SkinnedMeshRenderer._imp.traverse(node=>{
                   if(node.material){
                        let newMaterial=new node.material.constructor;
                        newMaterial.copy(node.material);
                        node.material=newMaterial;
                        changeTex._imp.flipY=false;
                        //changeTex._imp.repeat.set(1,1);
                        node.material.map=changeTex._imp;
                   }
                });
                scaleSet(man,0.5,0.5,0.5);
                moveSet(man,positionSave[i][0],positionSave[i][1],positionSave[i][2]);
                
            }
        }

        this.meetingroom.getComponent(Web3DEngine.SkinnedMeshRenderer).receiveShadow=true;
        
        if(typeof(mypanel10)!='undefined')mypanel10.style.display="none"; 
//////////////////开始生成的精灵名片///////////////////
        for(var i=0;i<chairSave.length;i++){
            var scene =appInst._renderScenePass.scene;// new THREE.Scene();
            var sprite = makeTextSprite('参会者');//new THREE.Sprite(spriteMaterial);
            sprite.scale.set(0.5,0.5,0.5);
            sprite.position.set(chairSave[i].getComponent(Web3DEngine.Transform).localPosition.x-0.2, 0.15, chairSave[i].getComponent(Web3DEngine.Transform).localPosition.z);
            sprite_all.push(sprite);
        }
        function makeTextSprite(message, parameters) {//创建字体精灵 
            if ( parameters === undefined ) parameters = {};
            var fontface = parameters.hasOwnProperty("fontface") ?
                parameters["fontface"] : "Arial";
            /* 字体大小 */
            var fontsize = parameters.hasOwnProperty("fontsize") ?
                parameters["fontsize"] : 18;
            /* 边框厚度 */
            var borderThickness = parameters.hasOwnProperty("borderThickness") ?
                parameters["borderThickness"] : 4;
            /* 边框颜色 */
            var borderColor = parameters.hasOwnProperty("borderColor") ?
                parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
            /* 背景颜色 */
            var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
                parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
            /* 创建画布 */
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            /* 字体加粗 */
            context.font = "Bold " + fontsize + "px " + fontface;
            /* 获取文字的大小数据，高度取决于文字的大小 */
            var metrics = context.measureText( message );
            var textWidth = metrics.width;
            /* 背景颜色 */
            context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                + backgroundColor.b + "," + backgroundColor.a + ")";
            /* 边框的颜色 */
            context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                + borderColor.b + "," + borderColor.a + ")";
            context.lineWidth = borderThickness;
            /* 绘制圆角矩形 */
            roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
            /* 字体颜色 */
            context.fillStyle = "rgba(0, 0, 0, 1.0)";
            context.fillText( message, borderThickness, fontsize + borderThickness);
            /* 画布内容用于纹理贴图 */
            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            var spriteMaterial = new THREE.SpriteMaterial({map: texture});
            var sprite = new THREE.Sprite( spriteMaterial );
            console.log(sprite);
            return sprite;
        }//function makeTextSprite(message, parameters)
        function roundRect(ctx, x, y, w, h, r) {//绘制圆角矩形
            ctx.beginPath();
            ctx.moveTo(x+r, y);
            ctx.lineTo(x+w-r, y);
            ctx.quadraticCurveTo(x+w, y, x+w, y+r);
            ctx.lineTo(x+w, y+h-r);
            ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
            ctx.lineTo(x+r, y+h);
            ctx.quadraticCurveTo(x, y+h, x, y+h-r);
            ctx.lineTo(x, y+r);
            ctx.quadraticCurveTo(x, y, x+r, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }//function roundRect(ctx, x, y, w, h, r)
//////////////////完成生成的精灵名片///////////////////

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
        console.log('LateUpdate函数，游戏非暂停时每帧调用，晚于Update');
    },

	OnDestroy:function(dt){
        console.log('OnDestroy函数，绑定的游戏对象或脚本销毁时调用');
	}


});

Main.attributes.add( 'attribute', {
    type: 'string',
    default: 'hello , world',
    title: 'attribute',
    description: 'open attribute name attribute ; type - string ;'
});
Main.attributes.add( 'model', {
    type: 'asset',
    title: 'model'
});
Main.attributes.add( 'model2', {
    type: 'asset',
    title: 'model2'
});
Main.attributes.add( 'model3', {
    type: 'asset',
    title: 'model3'
});
Main.attributes.add( 'model4', {
    type: 'asset',
    title: 'model4'
});
Main.attributes.add( 'model5', {
    type: 'asset',
    title: 'model5'
});
Main.attributes.add( 'model6', {
    type: 'asset',
    title: 'model6'
});
Main.attributes.add( 'room1', {
    type: 'asset',
    title: 'room1'
});
Main.attributes.add( 'room2', {
    type: 'asset',
    title: 'room2'
});
Main.attributes.add( 'table1', {
    type: 'asset',
    title: 'table1'
});
Main.attributes.add( 'table2', {
    type: 'asset',
    title: 'table2'
});
Main.attributes.add( 'tv', {
    type: 'asset',
    title: 'tv'
});
Main.attributes.add( 'screen', {
    type: 'asset',
    title: 'screen'
});
Main.attributes.add( 'man1', {//这种方法对摄像机、光线也有效
    type: 'entity',
    title: 'man1',
});
Main.attributes.add('maletexture1',{
    type:'asset',
    assetType:'texture',
    title:'maletexture1'
});
Main.attributes.add('maletexture2',{
    type:'asset',
    assetType:'texture',
    title:'maletexture2'
});
Main.attributes.add('maletexture3',{
    type:'asset',
    assetType:'texture',
    title:'maletexture3'
});
Main.attributes.add('maletexture4',{
    type:'asset',
    assetType:'texture',
    title:'maletexture4'
});
Main.attributes.add('maletexture5',{
    type:'asset',
    assetType:'texture',
    title:'maletexture5'
});
Main.attributes.add('maletexture6',{
    type:'asset',
    assetType:'texture',
    title:'maletexture6'
});
Main.attributes.add('maletexture7',{
    type:'asset',
    assetType:'texture',
    title:'maletexture7'
});
Main.attributes.add('femaletexture1',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture1'
});
Main.attributes.add('femaletexture2',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture2'
});
Main.attributes.add('femaletexture3',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture3'
});
Main.attributes.add('femaletexture4',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture4'
});
Main.attributes.add('femaletexture5',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture5'
});
Main.attributes.add('femaletexture6',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture6'
});
Main.attributes.add('femaletexture7',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture7'
});
Main.attributes.add('femaletexture8',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture8'
});
Main.attributes.add('femaletexture9',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture9'
});
Main.attributes.add('femaletexture10',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture10'
});
Main.attributes.add('femaletexture11',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture11'
});
Main.attributes.add('femaletexture12',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture12'
});
Main.attributes.add('femaletexture13',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture13'
});
Main.attributes.add('femaletexture14',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture14'
});
Main.attributes.add('femaletexture15',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture15'
});
Main.attributes.add('femaletexture16',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture16'
});
Main.attributes.add('femaletexture17',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture17'
});
Main.attributes.add('femaletexture18',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture18'
});
Main.attributes.add('femaletexture19',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture19'
});
Main.attributes.add('femaletexture20',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture20'
});
Main.attributes.add('femaletexture21',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture21'
});
Main.attributes.add('femaletexture22',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture22'
});
Main.attributes.add('femaletexture23',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture23'
});
Main.attributes.add('femaletexture24',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture24'
});
Main.attributes.add('femaletexture25',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture25'
});
Main.attributes.add('femaletexture26',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture26'
});
Main.attributes.add( 'myfloor', {//这种方法对摄像机、光线也有效
    type: 'asset',
    title: 'myfloor',
});

function scaleSet(myTransform,x,y,z){//调整游戏对象的尺寸
    //if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    //myTransform.localScale=new THREE.Vector3(x,y,z);
    myTransform.transform.localScale.set(x,y,z);
}
function moveSet(myTransform,x,y,z){//调整游戏对象的位置
    //if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    //myTransform.localPosition=new THREE.Vector3(x,y,z);
    myTransform.transform.localPosition.set(x,y,z);
}
function creater(model,haveAnimation){
    var obj = new Web3DEngine.GameObject();
    var SkinnedMeshRenderer=obj.addComponent(Web3DEngine.SkinnedMeshRenderer);//为对象添加蒙皮渲染插件
    if(typeof(haveAnimation) != "undefined"&&haveAnimation)obj.addComponent(Web3DEngine.AnimationPlayer);
    SkinnedMeshRenderer.mesh = model;//将模型赋值给蒙皮组件
    //SkinnedMeshRenderer.castShadow=true;//不能让房间产生影子
    //.getComponent(Web3DEngine.SkinnedMeshRenderer).receiveShadow=true;
    return obj;
}
function animationFade(obj,animationName,time){//切换动画
    obj=obj.getComponent(Web3DEngine.SkinnedMeshRenderer);
    if(typeof(time) == "undefined")time=0.1;
    var play=obj.gameObject.getComponent(Web3DEngine.AnimationPlayer);
    play.CrossFade(animationName,0.1);
}
function animationSpeed(obj,step){//调整动画的播放速度
    var myAnimation= obj.getComponent( Web3DEngine.AnimationPlayer);
    if(typeof(step) == "undefined"||step=='change'||step=='pause')myAnimation.paused=!myAnimation.paused;
    else myAnimation.speed+=step;
}
function man1_move(myTransform0,direction,step){//移动游戏对象、相机、光源
    if(typeof(step) == "undefined")step=0.02;
    var myTransform;
    if(typeof(myTransform0.x) == "undefined")myTransform=myTransform0.gameObject.getComponent(Web3DEngine.Transform);
    else myTransform=myTransform0;
    
    if(myTransform.localPosition.z>1.85){this.man1_flag=2;}
    else if(myTransform.localPosition.z<-0.75){this.man1_flag=1;}
    
    if(this.man1_flag==1){
        direction=3;
        //rotationSet(myTransform0,0,0,0);
        myTransform0.localEulerAngles=new THREE.Vector3(0,0,0);
    }
    else {
        direction=-3;
        //rotationSet(myTransform0,0,180,0);
        myTransform0.localEulerAngles=new THREE.Vector3(0,180,0);
    }
    control(myTransform.localPosition,direction,step);	
}
function rotation1(myTransform,direction,step){//旋转游戏对象、相机、光源
    if(typeof(step) == "undefined")step=0.1;
    if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    if(direction<0){//字母与数字比较大小结果始终为false
	    step*=-1;
	    direction*=-1;
	}
    //var dx=myTransform.localEulerAngles.x,dy=myTransform.localEulerAngles.y,dz=myTransform.localEulerAngles.z;
    var test=myTransform.transform.localEulerAngles;
    var dx=test.x,dy=test.y,dz=test.z;
    if(direction=='x'||direction==1){dx+=step;dx=tool(dx);}
    else if(direction=='y'||direction==2){dy+=step;dy=tool(dy);}
    else if(direction=='z'||direction==3){dz+=step;dz=tool(dz);}
    myTransform.transform.localEulerAngles=new THREE.Vector3(dx,dy,dz);
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
function rotationSet(myTransform,x,y,z){//旋转游戏对象、相机、光源
    //if(typeof(myTransform.x) == "undefined")myTransform=myTransform.gameObject.getComponent(Web3DEngine.Transform);
    myTransform.transform.localEulerAngles=new THREE.Vector3(x,y,z);
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