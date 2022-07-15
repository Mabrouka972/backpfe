

module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      reference: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      sensorcode: { type: String },
      type: {
        type: String,
        required: true
      },
      site: {
        type: String,
        // `Date.now()` returns the current unix timestamp as a number
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

  const Station = mongoose.model("station", schema);
  return Station;
};



