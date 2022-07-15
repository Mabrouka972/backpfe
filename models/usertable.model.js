

module.exports = mongoose => {
  
    var schema = mongoose.Schema(
        {
          
            name: String,
            email: String,
            password: String,
            confirm_password:String,
            code: Boolean,
            status: String,

        },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Usertable = mongoose.model("usertable", schema);
    return Usertable;
  };
  


