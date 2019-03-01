var Contact = require('../models/Contact');
contactController = {};

//contacts main site
contactController.susisiekti = (req, res) =>{
    res.render('pages/contacts', {error: null}); 
}

//issius forma ir sugris i /contacts puslapi
contactController.kontaktai = (req, res)=>{
   
    
        let newContact = Contact(
        {
        nickname: req.body.name, //userio vardas
        email: req.body.email, //email adresas
        subject: req.body.subject, //tema
        messages: req.body.messages, //zinutes 
        });
        newContact.save();
    res.redirect('/contacts');
}

module.exports = contactController;
