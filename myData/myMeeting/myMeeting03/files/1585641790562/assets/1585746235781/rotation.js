function Rotation(go) {
    Web3DEngine.MonoBehaviour.call(this, go);
    this.instClassType = Rotation.classType;
    this.speed = null;
}

Web3DEngine.ExtendType( Rotation , Web3DEngine.MonoBehaviour, {
	Update:function(arg){
        if(arg > 0.1) return;
        this.gameObject.transform.localEulerAngles = new Web3DEngine.Vector3(0,this.gameObject.transform.localEulerAngles.y + this.speed / 30,0);
    },
});

Rotation.attributes.add( 'speed', {
    type: 'number',
    default: 'hello , world',
    title: 'speed',
    description: 'open attribute name attribute ; type - string ;'
});