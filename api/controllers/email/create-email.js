module.exports = {


  friendlyName: 'Create email',


  description: '',


  inputs: {

    name: { type: 'string' },
    message: { type: 'string' },
    email: { type: 'string' },

  },

  exits: {
    success: {
      outputDescription: 'This is the out put',
      outputType: {
        email: 'ref'
      }
    },

  },

  fn: async function (inputs, exits) {
    console.log('abc');

    // Create email
    var createEmail= await Email.create({

      "name": inputs.name,
      "message": inputs.message,
      "email": inputs.email, 


    }).fetch();


    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nipun@archmage.lk',
        pass: 'nipmaxarchmage'
      }
    });
  
    var mailOptions = {
      from: 'nipun@archmage.lk',
      to: inputs.email,
      subject: 'Welcome'+" "+inputs.name,
      text: inputs.message,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return exits.success({ email: createEmail });

  },
  

};
