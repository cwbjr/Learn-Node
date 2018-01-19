const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Please enter a store name!",
    },
    slug: String,
    description: {
        type: String,
        trim: true,
    },
    tags: [String],
});

storeSchema.pre("save", function(next) {
    if(!this.isModified("name")) {
        next(); // skitp it
        return; // stop this function from running
        // to do make more resiliant so slugs are unique
    }
    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model("Store", storeSchema);