module.exports = {


  friendlyName: 'Create email',


  description: '',


  inputs: {

    name: {
      type: 'string',
      required: true
    },
    message: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },

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
    console.log('inputs');
    console.log(inputs);


    if (inputs.name == '' || inputs.email == '' || inputs.message == '') {

      console.log('false');
      return exits.success({ status: false});

    } else {

      // Create email
      var createEmail = await Email.create({

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
        subject: 'Welcome' + " " + inputs.name,
        text: inputs.message,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return exits.success({ status: true, email: createEmail });

    }

  },
};
