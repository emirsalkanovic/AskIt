const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema(
    {
        text: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Like", LikeSchema);