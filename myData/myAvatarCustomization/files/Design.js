function Design(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType=Design.classType;
    this.attribute=null;
    this.malemodel=null;
    this.femalemodel=null;
    this.nowmodel=null;
    this.mouseX=0;
    this.saveAngle=0;

    this.maletexture7=null;
    this.maletexture6=null;
    this.maletexture5=null;
    this.maletexture4=null;
    this.maletexture3=null;
    this.maletexture2=null;
    this.maletexture1=null;
    this.femaletexture25=null;
    this.femaletexture24=null;
    this.femaletexture23=null;
    this.femaletexture22=null;
    this.femaletexture21=null;
    this.femaletexture20=null;
    this.femaletexture19=null;
    this.femaletexture18=null;
    this.femaletexture17=null;
    this.femaletexture16=null;
    this.femaletexture15=null;
    this.femaletexture14=null;
    this.femaletexture13=null;
    this.femaletexture12=null;
    this.femaletexture11=null;
    this.femaletexture10=null;
    this.femaletexture9=null;
    this.femaletexture8=null;
    this.femaletexture7=null;
    this.femaletexture6=null;
    this.femaletexture5=null;
    this.femaletexture4=null;
    this.femaletexture3=null;
    this.femaletexture2=null;
    this.femaletexture1=null;

    this.renderer=null;
    this.myAnimation=0;//'Walking','Sitting','Sitting Idle'
    this.slideCB=new Array(17);
}
var control_model=1;//1号模型为男性，2号模型为女性
var allAvatar=[];
var myBodyPanel=document.getElementById("myControlPanel1"),myArmPanel=document.getElementById("myControlPanel2");
Web3DEngine.ExtendType(Design, Web3DEngine.MonoBehaviour, {
    Awake: function (arg) {
    },
    Start: function (arg) {

        //不适合男性的贴图：femaletexture5-femaletexture14，femaletexture18-femaletexture21
        var textures=new Array(19);//男性贴图
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

        var textures_woman=new Array(25);//女性贴图
        console.log('this.femaletexture1',this.femaletexture1);
        textures_woman[0]=this.femaletexture1;
        textures_woman[1]=this.femaletexture2;
        textures_woman[2]=this.femaletexture3;
        textures_woman[3]=this.femaletexture4;
        textures_woman[4]=this.femaletexture5;
        textures_woman[5]=this.femaletexture6;
        textures_woman[6]=this.femaletexture7;
        textures_woman[7]=this.femaletexture8;
        textures_woman[8]=this.femaletexture9;
        textures_woman[9]=this.femaletexture10;
        textures_woman[10]=this.femaletexture11;
        textures_woman[11]=this.femaletexture12;
        textures_woman[12]=this.femaletexture13;
        textures_woman[13]=this.femaletexture14;
        textures_woman[14]=this.femaletexture15;
        textures_woman[15]=this.femaletexture16;
        textures_woman[16]=this.femaletexture17;
        textures_woman[17]=this.femaletexture18;
        textures_woman[18]=this.femaletexture19;
        textures_woman[19]=this.femaletexture20;
        textures_woman[20]=this.femaletexture21;
        textures_woman[21]=this.femaletexture22;
        textures_woman[22]=this.femaletexture23;
        textures_woman[23]=this.femaletexture24;
        textures_woman[24]=this.femaletexture25;

        var model = new Web3DEngine.GameObject();///模型
        var renderer = model.addComponent(Web3DEngine.SkinnedMeshRenderer);///蒙皮网格渲染器
        renderer.mesh = this.malemodel;
        this.nowmodel=model;



        var play = renderer.gameObject.addComponent(Web3DEngine.AnimationPlayer);
        //play.CrossFade('Walking', 0.1);
        this.renderer=renderer;/**/

        allAvatar.push(model);

        var model_woman=new Web3DEngine.GameObject();///模型
        var renderer_woman=model_woman.addComponent(Web3DEngine.SkinnedMeshRenderer);///蒙皮网格渲染器
        renderer_woman.mesh=this.femalemodel;
        model_woman.getComponent(Web3DEngine.Transform).localPosition=new THREE.Vector3(3,0,-1.5);
        renderer_woman.gameObject.addComponent(Web3DEngine.AnimationPlayer);

        allAvatar.push(model_woman);

        //var model=model_woman;var renderer=renderer_woman;
        //play.CrossFade('Walking', 0.1);
        //this.renderer_woman=renderer_woman;

        //存储骨骼 0小腹 1腰 23胸 4脖子 5头 7左肩 8左大臂 9左小臂 10左手腕 1112左拇指 1415左食指
        let boneArray = [];//总共有41根骨头
        for (let i = 0; i < renderer._skeletons[0].boneInverses.length; i++) {///skeletons骨骼
            let copyBoneInverses=new THREE.Matrix4().copy(renderer._skeletons[0].boneInverses[i]);///从蒙皮网格渲染器骨骼中取一根骨头
            boneArray.push(copyBoneInverses);///将取出的骨头存入到数组中
        }

        //下面是初始化的代码
        ///0小腹 1腰 23胸 4脖子 5头 7左肩 8左大臂 9左小臂 10左手腕 11、12左拇指 14、15左食指
        var myslideCB=new Array(11);
        for (var i = 0; i < 11; i++) {
            var labelText = '';
            //躯干
            //'小腹';'腰';'胸';'锁骨';'脖子';'头';'?';
            if (i === 0 )labelText = '身高';
            else if (i === 1) labelText = '衣领';
            else if (i === 2) labelText = '锁骨';
            else if (i === 3) labelText = '胸口';
            else if (i === 4) labelText = '腰部';
            else if (i === 5) labelText = '小腹';

            //四肢//手臂
            //'左肩';'左大臂';'左小臂';'左手腕';'左拇指1';'左拇指2';'左拇指3';'?';'左手指1';'左手指2';'左手指3';'?';
            else if (i === 6) labelText = '肩膀';
            else if (i === 7) labelText = '大臂';
            else if (i === 8) labelText = '小臂';
            else if (i === 9) labelText = '手腕';
            else if (i ===10) labelText = '臀部';
            //腿
            //,,臀部 。。

            myslideCB[i]=createLightUI(i, clickCB, slideCB, labelText);
        }
        var myAnimation_max,myMapping_max=18,myColour_max=8;
        var myAnimation=0;//控制动画的全局变量

        var myMapping=0;//控制贴图的全局变量
        var myMapping1=0;
        var myMapping2=0;
        var myMapping3=0;
        var myMapping4=0;
        var myMapping_woman=0;//控制女性贴图的全局变量
        var myMapping1_woman=0;
        var myMapping2_woman=0;
        var myMapping3_woman=0;
        var myMapping4_woman=0;

        var myColour=0;//控制颜色的全局变量
        var myColour1=0;
        var myColour2=0;
        var myColour3=0;
        var myColour4=0;

        if(typeof(back)!='undefined')findDBAndInit();
        //初始化的代码结束

        //各种函数开始
        function randomParameter(){
            for(var i=0;i<myslideCB.length;i++){
                myslideCB[i].value=Math.random();
                adjustBone(i,myslideCB[i].value,renderer,boneArray);
            }
            myMapping=Math.floor(Math.random()*18+1);changeMapping();
            //myColour=Math.floor(Math.random()*8+1);changeColour();
        }//randomParameter();

        myMenuDom001.addEventListener("click", changeFunction);

        function changeFunction(event) {
            let idOne = event.target.id;
            console.log(idOne);
            if (idOne == "ambassadors") {
                changeMapping();//alert("更换形象1212");
            } else if (idOne == "cloths") {
                changeMapping1();//alert("上衣形象");
            } else if (idOne == "heads") {
                changeMapping2();//alert("头部形象");
            } else if (idOne == "shoes") {
                changeMapping3();//alert("鞋子形象");
            } else if (idOne == "trouserss") {
                changeMapping4();//alert("裤子形象");
            } else if (idOne == "hues") {
                changeColour();//alert("切换色调");
            } else if (idOne == "animation") {
                changeAnimation();//alert("切换动画");
            } else if (idOne == "parameter") {
                randomParameter();//alert("随机参数");
            }
        }
        function changeColour(){
            if(myColour==9)myColour=1;
            else myColour++;
            setColour(renderer,myColour);
        }
        function changeColour1(){
            if(myColour1==9)myColour1=1;
            else myColour1++;
            setColour2(renderer,myColour1,1);
        }
        function changeColour2(){
            if(myColour2==9)myColour2=1;
            else myColour2++;
            setColour2(renderer,myColour2,2);
        }
        function changeColour3(){
            if(myColour3==9)myColour3=1;
            else myColour3++;
            setColour2(renderer,myColour3,3);
        }
        function changeColour4(){
            if(myColour4==9)myColour4=1;
            else myColour4++;
            setColour2(renderer,myColour4,4);
        }
        function changeMapping(){//1.上衣 2.头部 3.鞋子 4.裤子
                if(myMapping==18)myMapping=1;
                else myMapping++;
                setMapping(renderer,textures,myMapping,1);
        }//changeMapping
        function changeMapping1(){//1.上衣 2.头部 3.鞋子 4.裤子
                if(myMapping1==18)myMapping1=1;
                else myMapping1++;
                setMapping2(renderer,textures,myMapping1,1);
        }
        function changeMapping2(){//1.上衣 2.头部 3.鞋子 4.裤子
                if(myMapping2==18)myMapping2=1;
                else myMapping2++;
                setMapping2(renderer,textures,myMapping2,2);
        }
        function changeMapping3(){//1.上衣 2.头部 3.鞋子 4.裤子
                if(myMapping3==18)myMapping3=1;
                else myMapping3++;
                setMapping2(renderer,textures,myMapping3,3);
        }
        function changeMapping4(){//1.上衣 2.头部 3.鞋子 4.裤子
                if(myMapping4==18)myMapping4=1;
                else myMapping4++;
                setMapping2(renderer,textures,myMapping4,4);
        }
        function changeAnimation(){//'Walking','Sitting','Sitting Idle'
// Male_Sit_handclap    Male_Sitting   Male_SitToStand   Male_Stand_handclap    Male_Stand_LookAround   Male_StandToSit   Male_Walk   
//1.Male_Sit_handclap  2.Male_Sitting  3.Male_SitToStand   4.Male_Stand_handclap    5.Male_Stand_LookAround   6.Male_StandToSit   7.Male_Walk   
            if(myAnimation==8)myAnimation=1;else myAnimation++;
            if(myAnimation==1)       renderer.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Sit_handclap', 0.1);
            else if(myAnimation==2)renderer.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Sitting', 0.1);
            else if(myAnimation==3)renderer.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_SitToStand', 0.1);
            else if(myAnimation==4)renderer.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Stand_handclap', 0.1);
            else if(myAnimation==5)renderer.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Stand_LookAround', 0.1);
            else if(myAnimation==6)renderer.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_StandToSit', 0.1);
            else if(myAnimation==7)renderer.gameObject.getComponent(Web3DEngine.AnimationPlayer).CrossFade('Male_Walk', 0.1);

        }
        //
        function createLightUI(morphID, clickCB, slideCB, name) {//函数1，创建UI的函数//？、点击控制按钮、滑动控制按钮、名字
            let topPx, leftpx, slide_pos, label_pos, myPanel;
            leftpx = window.innerWidth / 12;//200;

            if (typeof(myBodyPanel) == 'undefined') {
                topPx = (20 + morphID * 40);
                myPanel = document.body;
            } else {
                if (morphID >= 0 && morphID <= 5) {
                    myPanel = myBodyPanel;
                    topPx = (0 + morphID * window.innerHeight/25)-window.innerHeight/6;
                } else if (morphID <= 11) {
                    myPanel = myArmPanel;
                    topPx = (0 + (morphID - 6) * window.innerHeight/25)-window.innerHeight/6;
                } else {
                    myPanel = myLegPanel;
                    topPx = (0 + (morphID - 12) * 70);
                }
                topPx += window.innerHeight / 4.2;
            }
            //滑动条
            let styleProgress = document.createElement('input');
            styleProgress.setAttribute('type', 'range');
            styleProgress.min = 0;
            styleProgress.max = 1;
            styleProgress.step = 0.01;
            styleProgress.value = 0.5;
            styleProgress.style = 'position:fixed; left:' + leftpx + 'px; top:' + topPx + 'px; height: 25px';
            myPanel.appendChild(styleProgress);
            //按钮
            let label;
            if (typeof(myBodyPanel) == 'undefined') label = document.createElement('button');
            else label = document.createElement('h1');
            label.type = 'text';
            label.setAttribute('id', 'btnMorph' + morphID);
            label.innerHTML = name;
            label.setAttribute('id', 'inputMorph' + morphID);
            label.style = 'position:fixed; left:' + (leftpx + 130) + 'px; top:' + topPx + 'px; height: 28px;' + 'font-size:' + 15 + 'px;';
            myPanel.appendChild(label);

            //设置ID和回调
            label.morphID = morphID;///因为通过ID决定高度，所以ID相同，两个元素的位置相同
            styleProgress.morphID = morphID;///
            //label.onclick = clickCB;///标签（按钮）的点击事件函数是clickCB
            styleProgress.oninput = slideCB;///slide滑动 滑动控制按钮（滑动条）的响应函数是slideCB

            return styleProgress;
        }
        function slideCB(event) {//函数2滑动条事件响应，为函数1（创建UI的函数）服务///slide滑动，制作滑动控制按钮的方法
            let morphID = this.morphID;//this的对象为styleProgress滑块///this即调用这个函数的对象
            var value = event.target.value;///从这个滑动条中取出的数据
            var bone_size;
            adjustBone(morphID,value,renderer,boneArray);
        }///函数结束

        function clickCB() {}
        async function findDBAndInit(){
            var result=await asyncAxios.get(url + "/myavatar/myfind",{'user_id':this_user._id});
            for(var i=0;i<result.result.length;i++){
                if(result.result[i].index==myRequest.myIndex){
                    myslideCB[0].value=result.result[i].bone0;
                    myslideCB[1].value=result.result[i].bone1;
                    myslideCB[2].value=result.result[i].bone2;
                    myslideCB[3].value=result.result[i].bone3;
                    myslideCB[4].value=result.result[i].bone4;
                    myslideCB[5].value=result.result[i].bone5;
                    myslideCB[6].value=result.result[i].bone6;
                    myslideCB[7].value=result.result[i].bone7;
                    myslideCB[8].value=result.result[i].bone8;
                    myslideCB[9].value=result.result[i].bone9;
                    myslideCB[10].value=result.result[i].bone10;
                    for(var j=0;j<myslideCB.length;j++)adjustBone(j,myslideCB[j].value,renderer,boneArray);

                    myMapping=result.result[i].mapping;
                    if(myMapping!=0){
                        if(myMapping==0)myMapping=myMapping_max;
                        else myMapping--;//退到上一个
                        changeMapping();//更新到下一个
                    }
                    myColour=result.result[i].colour;
                    if(myColour!=0){
                        if(myColour==0)myColour=myColour_max;
                        else myColour--;
                        changeColour();
                    }
                }
            }//for

        }
        //各种自制函数结束

        //开始进行鼠标点击事件的监听
        document.body.onmouseup=function(e){
            var x=e.pageX;
            var y=e.pageY;
            if (typeof(back) != 'undefined')
                if (back.pointOnImg(x, y)) window.location.href = '../myAvatarSelect/avatarSelect.html';
                else if (determine.pointOnImg(x, y)) {
                    document.getElementById("mypanel2").style.display="block";
                    insertAndUnique({
                        user_id: this_user._id,
                        index: myRequest.myIndex,
                        bone0: myslideCB[0].value,
                        bone1: myslideCB[1].value,
                        bone2: myslideCB[2].value,
                        bone3: myslideCB[3].value,
                        bone4: myslideCB[4].value,
                        bone5: myslideCB[5].value,
                        bone6: myslideCB[6].value,
                        bone7: myslideCB[7].value,
                        bone8: myslideCB[8].value,
                        bone9: myslideCB[9].value,
                        bone10: myslideCB[10].value,
                        mapping: myMapping,
                        colour: myColour
                    });
                }
        }
        //完成进行鼠标点击事件的监听

        if(typeof(mypanel10)!='undefined')mypanel10.style.display="none";
        document.getElementById("root").style.display = "block";
    },
    OnEnable: function (arg) {
    },
    OnDisable: function (arg) {
    },
    Update: function (arg) {
        var mousePosition = Web3DEngine.Application.instance.inputModuleInst.mousePosition;
        var getKey = Web3DEngine.Application.instance.inputModuleInst;
        if (getKey.getMouseButton(2)) {
            if (mousePosition.x > this.mouseX)
                this.saveAngle = this.saveAngle + 5;
            else if (mousePosition.x < this.mouseX)
                this.saveAngle = this.saveAngle - 5;
            this.nowmodel.transform.localEulerAngles = new Web3DEngine.Vector3(0, this.saveAngle, 0);
        }

        this.mouseX = mousePosition.x;
    },
    LateUpdate: function (arg) {
    },

    OnDestroy: function (dt) {
    },
});
Design.attributes.add('malemodel', {
    type: 'asset',
    title: 'malemodel'
});
Design.attributes.add('femalemodel', {
    type: 'asset',
    title: 'femalemodel'
});

Design.attributes.add('maletexture1',{
    type:'asset',
    assetType:'texture',
    title:'maletexture1'
});
Design.attributes.add('maletexture2',{
    type:'asset',
    assetType:'texture',
    title:'maletexture2'
});
Design.attributes.add('maletexture3',{
    type:'asset',
    assetType:'texture',
    title:'maletexture3'
});
Design.attributes.add('maletexture4',{
    type:'asset',
    assetType:'texture',
    title:'maletexture4'
});
Design.attributes.add('maletexture5',{
    type:'asset',
    assetType:'texture',
    title:'maletexture5'
});
Design.attributes.add('maletexture6',{
    type:'asset',
    assetType:'texture',
    title:'maletexture6'
});
Design.attributes.add('maletexture7',{
    type:'asset',
    assetType:'texture',
    title:'maletexture7'
});
Design.attributes.add('femaletexture1',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture1'
});
Design.attributes.add('femaletexture2',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture2'
});
Design.attributes.add('femaletexture3',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture3'
});
Design.attributes.add('femaletexture4',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture4'
});
Design.attributes.add('femaletexture5',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture5'
});
Design.attributes.add('femaletexture6',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture6'
});
Design.attributes.add('femaletexture7',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture7'
});
Design.attributes.add('femaletexture8',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture8'
});
Design.attributes.add('femaletexture9',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture9'
});
Design.attributes.add('femaletexture10',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture10'
});
Design.attributes.add('femaletexture11',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture11'
});
Design.attributes.add('femaletexture12',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture12'
});
Design.attributes.add('femaletexture13',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture13'
});
Design.attributes.add('femaletexture14',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture14'
});
Design.attributes.add('femaletexture15',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture15'
});
Design.attributes.add('femaletexture16',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture16'
});
Design.attributes.add('femaletexture17',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture17'
});
Design.attributes.add('femaletexture18',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture18'
});
Design.attributes.add('femaletexture19',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture19'
});
Design.attributes.add('femaletexture20',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture20'
});
Design.attributes.add('femaletexture21',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture21'
});
Design.attributes.add('femaletexture22',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture22'
});
Design.attributes.add('femaletexture23',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture23'
});
Design.attributes.add('femaletexture24',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture24'
});
Design.attributes.add('femaletexture25',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture25'
});
/*Design.attributes.add('femaletexture26',{
    type:'asset',
    assetType:'texture',
    title:'femaletexture26'
});*/
//document.onkeydown=function(){alert(event.keyCode);};


