
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        id: Number,
        message: String,
        user: String,
        likes: [],
        unlikes: [],
        comments: []
    },
    { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);



