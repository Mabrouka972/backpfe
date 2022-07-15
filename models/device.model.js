

module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      sensorcode: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      station: {
        type: String,
        default: "",
        required: true
      },
      site: {
        type: String,
        default: "",
        required: true

      },
      iduser: {
        type: String,
        required: true
      }

    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Device = mongoose.model("device", schema);
  return Device;
};



