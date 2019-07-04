module.exports = {


  friendlyName: 'Get emails',


  description: '',


  inputs: {

  },


  exits: {

  },

  fn: async function (input, exits) {

    var emailsList = await Email.find();

    sails.log('emailsList');
    sails.log(emailsList);

    // console.log('hits');
    return exits.success({
      emailsList: emailsList,

    });

  }



};
