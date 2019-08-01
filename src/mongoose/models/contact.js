import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


// Schema
const Schema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true
    }
});

// Pagination Initialize
Schema.plugin(mongoosePaginate);

// Export
module.exports = mongoose.model('Contact', Schema);