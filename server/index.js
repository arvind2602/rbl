const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./controllers/route'));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
}
);


const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config();

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const indexName = 'rbl-sdnohw2';
const host = 'https://rbl-sdnohw2.svc.aped-4627-b74a.pinecone.io';

console.log('Host:', host);
const index = pinecone.Index(indexName);
console.log('Index initialized successfully');

