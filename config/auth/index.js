(function(){

    var passwordless = require('passwordless');
    var tokenStore = require('passwordless-mongostore');
    var mailer = require(_ + 'config/mailer');
    var db = require(_ + 'config/connection');
    var pathToMongoDB = process.env.DB_URL;
    var port = process.env.PORT || '1337';

    //initialize passwordless.
    passwordless.init(new tokenStore(pathToMongoDB));

    // Add a new delivery method to Passwordless used to transmit tokens to the user.
    passwordless.addDelivery(
        // Called when token needs to be delivered.
        function(tokenToSend, uidToSend, recipient, callback){

            var host = 'http://localhost:'+ port +'/';

            //send token
            mailer.sendMail({

                from: 'Ticketbox <system@ticketbox.bw>', // sender address
                to: recipient, // list of receivers
                subject: 'Login Token', // Subject line
                text: 'Hello!\nAccess your ticketbox account here: '
            + host + '?token=' + tokenToSend + '&uid='
            + encodeURIComponent(uidToSend) // plaintext body

            }, function(error, info){

                if(error){

                    console.log(error);

                }

                callback(error);

            });

        }, {'ttl': (1000*60*30)});

    module.exports = passwordless;

})();
