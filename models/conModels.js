const mongoose = require("mongoose")

const ConSchema = new mongoose.Schema({
    users: Array,
}, {
    timestamps: true
}
)

module.exports = mongoose.model("Con" , ConSchema)