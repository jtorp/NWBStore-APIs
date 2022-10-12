const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    tax: {
      type: Number,
      default: .25,
    },
    shippingFee: {
      type: Number,
      default: 49.99,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    products: [{
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }
    ],
    total: {
      type: Number,
      required: true,
    },
    address:{
      type: Object, 
      required:true
    },
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    // clientSecret: {
    //   type: String,
    //   required: true,
    // },
    paymentIntentId: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
