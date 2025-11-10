const mongoose = require('mongoose');
const reviewSchema = require('./Review');

const addressSchema = new mongoose.Schema({
  line1: String,
  line2: String,
  city: String,
  district: String,
  state: String,
  postalCode: String,
  country: String
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  issuedDate: Date,
  url: String
}, { _id: false });

const socialSchema = new mongoose.Schema({
  facebook: String,
  instagram: String,
  twitter: String,
  youtube: String,
  website: String
}, { _id: false });

const artisanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: String,
  district: String,
  city: String,
  craft: String,
  description: String,
  images: [String],
  videoUrl: String,
  social: socialSchema,
  certifications: [certificationSchema],
  address: addressSchema,
  location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] }, // [lng, lat]
  availability: { type: String, enum: ['Available','Unavailable'], default: 'Available' },
  schemes: [{ type: String }], // scheme codes e.g., 'ODOP'
  verified: { type: Boolean, default: false },
  verifiedIdProof: String,
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [reviewSchema]
}, { timestamps: true });

artisanSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Artisan', artisanSchema);
