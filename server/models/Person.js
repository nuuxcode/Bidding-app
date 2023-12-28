const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    currentBid: Number,
}, { timestamps: true });

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
