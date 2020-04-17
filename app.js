const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const url = 'mongodb://aukoda:usingAStrongPassword@localhost:27017/au_?authSource=admin';
const secondUrl = 'mongodb://localhost:27017';
const client = new MongoClient(secondUrl, { useUnifiedTopology: true });
const db = client.db("test");
client.connect(err => {
    assert.equal(null, err);
    console.log('Database Connected')
    client.close();    
})


db.collection("inventory").insertOne({
    item: "canvas", 
    qty: 100,
    tags: ["cotton"]
}).then(result => {
    console.log('saved data', result)
}).catch(err => {
    console.log(err);
});


