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
    saveMovies(db, () => {
        client.close()
    })
})


const latestMovies = [
    {movie: "The Banker", year: "2020", rating: 8},  
    {movie: "Bad Boys", year: "2020", rating: 7}, 
    {movie: "The Hunt", year: "2020", rating: 7}, 
    {movie: "Bloodshot", year: "2020", rating: 7.5}, 
    {movie: "First Cow", year: "2020", rating: 6.5}
]

const saveMovies = (db, cb) => {
    const myMovies = db.collection('myMovies');
    myMovies.insertMany(latestMovies, (err, result) => {
        if(err) throw err;
        console.log("Saved Entry,", result);
        cb(result)
    })};


// MongoClient.connect(url, options, (err, db) => {
//     if (err) throw err;
//     const dbo = db.db("movies_stash");
//     try {
        
//     } catch (error) {
        
//     }
//     const cursor = dbo.collection("myMovies").insertMany(myMovies, (err, result) => {
//         if(err) throw err;
//         console.log('Saved data', result);
//         db.close();
//     })
    // cursor.each((err, doc) => {
    //     if(err) throw err;
    //     console.log(doc)
    // })

    
    //     rating: 7
    // }.toArray,  
    //     (err, result) => {
    //         if (err) throw err;
    //         console.log(result.movie, 'Saved entry');
    //         db.close()
    // })
    
    // dbo.collection("customers").insertMany(myMovies,  
    //     (err, result) => {
    //         if (err) throw err;
    //         console.log('Saved entry');
    //         db.close()
    // })





// })


    