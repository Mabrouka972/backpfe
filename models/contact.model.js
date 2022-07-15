

module.exports = mongoose => {
  
    var schema = mongoose.Schema(
        {
            username: String,
            email: String,
            phone: Number, 
            adress: String,
            problem: String,
            description: String
            

        },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Contact = mongoose.model("contact", schema);
    return Contact;
  };
  
