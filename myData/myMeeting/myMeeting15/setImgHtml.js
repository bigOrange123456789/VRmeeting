var myimgpanel=[];
var myimgpanel_bg=[];
for(var i=1;i<16;i++){
    myimgpanel.push( document.createElement('div'));
    myimgpanel[i-1].style = 'position:fixed;left:0px;top:0px;margin-top:0px;border:0px solid #0ff;width:1197px;height:700px;display:none;';
    document.body.appendChild(myimgpanel[i-1]);
    myimgpanel_bg.push(new ImageMove('pic/'+i+'.jpg',myW,myH,0,0,myimgpanel[i-1]));
    //var bg001=new ImageMove('pic/1.jpg',myW,myH,0,0,myimgpanel[i-1]);
}
let panel001 = document.createElement('div');
panel001.style = 'position:fixed;left:0px;top:0px;margin-top:0px;border:0px solid #0ff;width:1197px;height:700px;display:none;';
document.body.appendChild(panel001);
var bg001=new ImageMove('pic/male/1.jpg',myW,myH,0,0,panel001);//new ImageMove('../meeting/1.png',myW,myH,0,0,mypanel10);
/////////////用于playerControl.js中的数组开始////////////////
//自动漫游路径
var mydata = [//自动漫游路径
    //x         y      z      angel       time
    [-14.14   ,1.1   , 0       ,0         ,200]
    ,[-9.14   ,1.1   , 0       ,0         ,200]//拉近镜头
    ,[-9.1    ,1.3   , 4     ,270       ,200]//旋转
    ,[5.6     ,1.3   ,3.8      ,270       ,300]
    ,[10.1    ,1.3   ,3        ,359.9     ,300]
    ,[10.1    ,1.3   ,-13.5      ,359.9     ,300]
    ,[10.0    ,1.3   ,-13.5      ,90        ,300]
    ,[-1.5    ,1.3   ,-13.5      ,90        ,300]
    ,[-1.5    ,1.3   ,-13.5      ,175       ,300]
    ,[-1.5    ,1.3   ,-7.6     ,100       ,100]
    ,[-9      ,1.3   ,-4       ,90        ,100]/**/
    //  ,[12 ,1.1,-10,3.8  ,359.9 ,200]
];
//可移动的范围
var movableRange=[
    [-12.5  ,  15.7  ,  -8.7  ,  7]
    ,[-5  ,  15  ,  -16.6  ,  -6.1]
    ,[-12.7  , -4.8  ,  5.58  , 11]
    ,[-15.9  , -12  ,  -8.68 ,4.6]
];
var immovableRange=[
    [4.33  ,  7.33  ,  -1.33  ,  1.28]
];
/////////////用于playerControl.js中的数组结束////////////////
/////////////用于sceneSet.js中的数组开始/////////////////////
//所有NPC的初始位置
var mansPA=[
    //x,y,z,angel
    [-10.484498774344397,0,9.08756591581523,181.60000000000022]
    ,[3.4506545152258834  ,  1.1578718447325231  ,  7.723192480438149  ,  270.2000000000017]
    ,[14.330649041648911  ,  1.1578718447325231  ,  6.365655735169074  ,  358.80000000000206]
    ,[-4.764373339591165  ,  1.3  ,  -13.241801541638669  ,  180]//
    ,[8.66264149751766  ,  1.3  ,  -6.979814676689706  ,  133.39999999999995]
    ,[-5.549427255404518  ,  1.3  ,  -16.4  ,  0]
    ,[13.222493672367955  ,  1.3  ,  7.509904782764141  ,  227.8783333333327]
];
/////////////用于sceneSet.js中的数组结束/////////////////////