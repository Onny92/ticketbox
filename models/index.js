(function(){

    //avoid namespace pollution.
    var ticketbox = ticketbox || {};
    ticketbox.models = ticketbox.models || {};
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId;
    var db = require(_ + 'config/connection');

    //define middleware

    //create schemas and model compilations.

    //export models object.
    module.exports = ticketbox.models;


})();
