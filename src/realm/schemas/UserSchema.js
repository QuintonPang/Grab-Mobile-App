export default UserSchema = {
    name:'User',
    primaryKey:'_id',
    properties:{
        _id:'objectId',
        _partition:'string',
        username:'string',
    },
}