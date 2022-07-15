

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
      description: {
        type: String,
        required: true
      },
      lng: {
        type: String,
        required: true
      },
      lat: {
        type: String,
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

  const Site = mongoose.model("site", schema);
  return Site;
};



