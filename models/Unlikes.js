const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnlikeSchema = new Schema(
    {
        text: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Unlike", UnlikeSchema);