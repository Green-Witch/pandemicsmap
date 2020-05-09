var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('../schema.js');

var router = express.Router();

router.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

module.exports = router;