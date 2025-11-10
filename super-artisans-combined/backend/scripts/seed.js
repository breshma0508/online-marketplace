require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Artisan = require('../models/Artisan');
const User = require('../models/User');
const Scheme = require('../models/Scheme');
const bcrypt = require('bcryptjs');

async function seed() {
  await connectDB();
  await Artisan.deleteMany({});
  await User.deleteMany({});
  await Scheme.deleteMany({});

  const passwordHash = await bcrypt.hash('admin123', 10);
  await User.create({ name: 'Admin', email: 'admin@bk.com', passwordHash, role: 'admin' });

  // sample schemes
  const schemes = [
    { code: 'ODOP', name: 'One District One Product', description: 'Promotes district-level specialties', url: 'https://udyam.gov.in' },
    { code: 'KVIC', name: 'Khadi and Village Industries Commission', description: 'Support for khadi and village industries', url: 'https://kvic.gov.in' },
    { code: 'MSME', name: 'Micro, Small & Medium Enterprises', description: 'Support for MSMEs', url: 'https://msme.gov.in' },
    { code: 'PMV', name: 'PM Vishwakarma Yojana', description: 'Support for artisans and traditional workers', url: 'https://msme.gov.in' }
  ];
  await Scheme.insertMany(schemes);

  const samples = [
    {
      name: 'Rajesh Kumar',
      state: 'Rajasthan',
      district: 'Jaipur',
      city: 'Jaipur',
      craft: 'Blue Pottery',
      description: 'Wheel-thrown blue pottery from Jaipur',
      images: [],
      videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
      social: { instagram: 'https://instagram.com/rajesh_pottery' },
      certifications: [{ title: 'Master Potter', issuer: 'Handloom Board', issuedDate: new Date('2018-05-01'), url: '' }],
      address: { line1: 'H-12, Shastri Nagar', city: 'Jaipur', district: 'Jaipur', state: 'Rajasthan', postalCode: '302001', country: 'India' },
      location: { type: 'Point', coordinates: [75.7873, 26.9124] }, // Jaipur lng,lat
      availability: 'Available',
      schemes: ['ODOP'],
      verified: true
    },
    {
      name: 'Priya Sharma',
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      city: 'Varanasi',
      craft: 'Silk Weaving',
      description: 'Banarasi sarees, handloom weaving',
      images: [],
      videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
      social: { facebook: 'https://facebook.com/priya_weaves' },
      certifications: [{ title: 'Weaver Certificate', issuer: 'Weavers Association', issuedDate: new Date('2019-03-10'), url: '' }],
      address: { line1: 'MG Road', city: 'Varanasi', district: 'Varanasi', state: 'Uttar Pradesh', postalCode: '221001', country: 'India' },
      location: { type: 'Point', coordinates: [82.9739, 25.3176] }, // Varanasi lng,lat
      availability: 'Available',
      schemes: ['KVIC'],
      verified: false
    },
    {
      name: 'Amit Patel',
      state: 'Gujarat',
      district: 'Ahmedabad',
      city: 'Ahmedabad',
      craft: 'Jewellery',
      description: 'Gold & silver traditional jewellery',
      images: [],
      videoUrl: '',
      social: { website: 'https://amitpateljewels.example' },
      certifications: [],
      address: { line1: 'Paldi', city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat', postalCode: '380007', country: 'India' },
      location: { type: 'Point', coordinates: [72.5714, 23.0225] }, // Ahmedabad
      availability: 'Unavailable',
      schemes: ['MSME'],
      verified: true
    }
  ];

  await Artisan.insertMany(samples);
  console.log('Seeded'); process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
