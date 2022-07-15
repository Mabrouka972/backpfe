module.exports = mongoose => {
  
    var schema = mongoose.Schema(
        {
            
            temperature: String,
            humidity: String, 
            sensorcode: String,
            type: String,
            latitude: String,
            longitude: String

        },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Devicedata = mongoose.model("devicedata", schema);
    return Devicedata;
  };
  


