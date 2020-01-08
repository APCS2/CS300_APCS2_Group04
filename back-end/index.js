const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require('express-graphql')
const mongoose = require("mongoose");

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolver = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is_auth')

var dotenv = require('dotenv');
dotenv.config();

var mongoDB = process.env.DB_CONNECT
console.log(mongoDB)

mongoose.connect(`${mongoDB}`, {useNewUrlParser: true})
    .then(() => {
        app.listen(8000);
    }).catch(err => {
        console.log(err);
    })

var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));
db.collections.mangas.createIndex({ name: "text", description: "text" })
mongoose.set('useFindAndModify', false);

const app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "POST,GET,OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true,
}));
