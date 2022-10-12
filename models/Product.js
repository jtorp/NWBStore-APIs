const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name can not be more than 50 characters'],
    },
    desc: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: [true, 'Please provide product category'],
      // enum: ['newin','shoes','girls', 'boys', 'baby', 'toys'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide brand name or Unknown'],
    },
    color: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      trim: true,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model('Product', ProductSchema);
