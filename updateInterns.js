///////////////////////////////////////////////////
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}
const url = "mongodb://127.0.0.1:27017/movies";

const client = new MongoClient(url, options);

client.connect((err, client) => {
    assert.equal(null, err);
    // if(err) throw err;
    console.log('Database Connected');
    // client.close();
    const db = client.db('movies_stash');
    updateMovies(db, () => {
        client.close()
    })
})

///////////////////////////////////////////////////
const updatedInfo = { $set: {
    movie: "Spencer Confidential", 
    year: 2020,
    rating: 9
}};

const search = { movie: "First Cow"};

const updateMovies = async(db, cb) => {
    try {
        const myMovies = db.collection('myMovies');
        await myMovies.findOneAndUpdate(search, updatedInfo, (err, result) => {
            if(err) throw err;
            // assert.equal(null, err);
            // assert.ok(result.value === null);
            // console.log(result.value);
            // cb(result);
            console.log(result);
            })
    } catch (err) {
        console.log(err);
    }
    
}


const findAll = async (db, cb) => {
    const myMovies = await db.collection('myMovies');
    myMovies.find({}, (err, result) => {
        if(err) throw err;
        cursor = result.toArray();
        console.log(cursor);
        cb(result);
    })
}
///////////////////////////////////////////////////
// const MongoClient = require('mongodb').MongoClient;
// const options = {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// }
// const url = "mongodb://127.0.0.1:27017/movies";


// MongoClient.connect(url, options, (err, db) => {
//     try {
//         const dbo = db.db("movies_stash");
//         const search = { movie: "The Banker" };
        
//         const cursor = dbo.collection("customers").updateOne(search, updatedInfo, (err, result) => {
//             if(err) throw err;
//             console.log('Document updated')
//             db.close();
//     });
//     } catch (err) {
//         console.log(err);
//     }
    
    
//     });
