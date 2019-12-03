const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    Localization: {
      type: String,
      latitude: String,
      length: String,
      country: String,
      continent: String,
      unique: true,
      trim: true,
    },
    Images: {
      type: [String]
    },
    Information: {
      type: String,
      description: String,
      hotSpots: [{
        name: String,
        location: {
          type: String,
          latitude: String,
          length: String,
        },
        images:[String],
        description: String
      }]
    }
  }, { timestamps: true })

  placeSchema.pre('save', function (next) {
    next();
  });
  
  const Place = mongoose.model('place', placeSchema);
  
  module.exports = Place;