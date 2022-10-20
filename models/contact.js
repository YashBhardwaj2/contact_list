const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

//defining the name for the collection for the db

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;