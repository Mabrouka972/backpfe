module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      sensorcode: {
        type: String,
        required: true
      },
      data: {
        type: String,
        required: true
      },
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true

      },
      iduser: {
        type: String,
        required: true
      }
      ,
      email: String,
      reference: {
        type: String,
        required: true
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Alert = mongoose.model("alert", schema);
  return Alert;
};



