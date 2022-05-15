
export const DestinationSchema = {
    name:"Destination",
    embedded:true, // to specify that this schema is used as a field in other schema
    properties:{
        latitude:'float',
        longitude:'float',
        name:'string',
        address:'string',
    },
}

export const OriginSchema = {
    name:"Origin",
    embedded:true, // to specify that this schema is used as a field in other schema
    properties:{
        latitude:'float',
        longitude:'float',
        name:'string',
        address:'string',
    },
}

export default OrderSchema = {
    name:'Order',
    primaryKey:'_id',
    properties:{
        _id:'objectId',
        _partition:'string',
        userId:'objectId',
        destination:"Destination",
        origin:"Origin",
        carType:'string',
    }
}
