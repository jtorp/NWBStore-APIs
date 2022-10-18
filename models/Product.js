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
    condition:
    {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    gender: {
      type: String,
    },
    image: {
      type: Array,
      required: true,
    },
    category: {
      type: Array,
      required: [true, 'Please provide product category'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide brand name or Unknown'],
    },
    color: {
      type: Array,
      required: false,
    },
    material: {
      type: String,
      required: [true, 'Please provide material desc or Unknown'],
    },
    type: {
      type: String,
      required: [true, 'Please provide type or Unknown'],
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
