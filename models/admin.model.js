

module.exports = mongoose => {
  
    var schema = mongoose.Schema(
        {
          
            firstname: String,
            lastname: String,
            phone: String,
            email: String,
            cin: String,
            password: String
        },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Admin = mongoose.model("admin", schema);
    return Admin;
  };
  


