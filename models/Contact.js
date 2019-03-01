const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    nickname: String, //userio vardas
    email: String, //email adresas
    subject: String, //tema
    messages: String, //zinutes
});



const Contact = mongoose.model('Contact', ContactSchema);


module.exports = Contact;