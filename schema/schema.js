const axios = require('axios');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLList,
    GraphQLSchema
} = require('graphql');

const _ = require('lodash');

// Country
const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        Country: { type: GraphQLString },
        NewDeaths: { type: GraphQLInt },
        NewConfirmed: { type: GraphQLInt },
        NewRecovered: { type: GraphQLInt},
        TotalDeaths: { type: GraphQLInt },
        TotalConfirmed: { type: GraphQLInt },
        TotalRecovered: { type: GraphQLInt },
        Date: { type: GraphQLString }
    })
});

const GlobalType = new GraphQLObjectType({
    name: 'Global',
    fields: () => ({
        TotalConfirmed: { type: GraphQLInt},
        TotalDeaths: { type: GraphQLInt},
        TotalRecovered: { type: GraphQLInt},
        NewConfirmed: { type: GraphQLInt },
        NewDeaths: { type: GraphQLInt },
        NewRecovered: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        global: {
            type: GlobalType,
            resolve(parent, args) {
                return axios.get('https://api.covid19api.com/summary').then(res => res.data["Global"]);
            }
        },
        country: {
            type: CountryType,
            args: { Country: { type: GraphQLString } },
            resolve(parent, args) {
                return axios.get('https://api.covid19api.com/summary').then(res => _.find(res.data["Countries"], {Country: args.Country}));
            }
        },
        countries: {
            type: new GraphQLList(CountryType),
            resolve(parent, args) {
                return axios.get('https://api.covid19api.com/summary').then(res => res.data["Countries"]);
            }
        }
   }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});