const mongoose=require('mongoose');
const GpsSensorsSchema= mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    SensorIdentifier: {
        type : String,
        required : true
    },
    SensorType: {
        type : String,
        required : true
    },
    Description: {
        type : String,
    },
    SensorCoordinates: [Number]
    ,
    Created_date: {
        type : Date,
       
    },
    data: []
    ,
    Rules :[
        {
            Status: {
                type : Boolean,
                default : false
            },
            StartTime: {
                type : Number,
            },
            Tmax: {
                type : Number,
            },
            Tmin: {
                type : Number,
            },
            Notifications : {
                SMS : {type : Boolean  },
                Email : {type : Boolean  },
                Push : {type : Boolean  },
            },
            Realy_ids: []
        }
    ]
});
module.exports=mongoose.model('GpsSensors',GpsSensorsSchema);
