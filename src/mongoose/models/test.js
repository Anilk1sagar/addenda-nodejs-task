import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

// Schema
const TestSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    }
});

// Pagination Initialize
TestSchema.plugin(mongoosePaginate);

// Export
const Test = module.exports = mongoose.model('Test', TestSchema);