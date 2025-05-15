const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true
  },
  category: {
    type: String,
    enum: ['Amazing views', 'Castles', 'Beachfronts', 'Lake', 'New', 'Mansions', 'OMG!','Rooms','Top cities','Top of the world'],
    required: true
  },
  propertyType: {
    type: String,
    enum: ['Apartment','Farm stay','House', 'Villa', 'Cabin', 'Hotel', 'Guesthouse', 'Unique','Tree House'],
    required: true
  },
  roomType: {
    type: String,
    enum: ['entire', 'private', 'shared'],
    required: true
  },
  location: {
    type: String,
    required: true

  },
  amenities: [{
    type: String,
    enum: [
      'wifi', 'kitchen', 'washer', 'dryer', 'ac', 'heating', 
      'tv', 'pool', 'parking', 'elevator', 'workspace', 
      'hot_tub', 'breakfast', 'gym', 'fireplace', 'iron'
    ]
  }],
    capacity: {
      guests: { type: Number, required: true },
      bedrooms: { type: Number, required: true },
      beds: { type: Number, required: true },
      bathrooms: { type: Number, required: true }
    },
  images:{
    type:[String]
  },
  price: {
   type: Number, required: true ,
  },
  // availability: {
  //   calendar: [{
  //     date: Date,
  //     available: Boolean,
  //     price: Number
  //   }],
  //   minStay: { type: Number, default: 1 },
  //   maxStay: { type: Number, default: 30 },
  //   checkInTime: String,
  //   checkOutTime: String
  // },

  rules: {
    petsAllowed: { type: Boolean, default: false },
    smokingAllowed: { type: Boolean, default: false },
    partiesAllowed: { type: Boolean, default: false },
    childrenAllowed: { type: Boolean, default: true }
  },

  // reviews: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Review'
  // }],
  // rating: {
  //   average: { type: Number, default: 0 },
  //   cleanliness: { type: Number, default: 0 },
  //   accuracy: { type: Number, default: 0 },
  //   communication: { type: Number, default: 0 },
  //   location: { type: Number, default: 0 },
  //   checkIn: { type: Number, default: 0 },
  //   value: { type: Number, default: 0 }
  // },
  
  // status: {
  //   type: String,
  //   enum: ['draft', 'published', 'unavailable'],
  //   default: 'draft'
  // },

 
},{
  timestamps:true,
  versionKey:false
});

// Update coordinates index
// propertySchema.index({ 'location.coordinates': '2dsphere' });

const PropertyModel= mongoose.model('Property', propertySchema);
module.exports=PropertyModel