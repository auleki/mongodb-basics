const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}
const url = "mongodb://127.0.0.1:27017/movies";

const client = new MongoClient(url, options);

client.connect((err, client) => {
    // assert.equal(null, err);
    if(err) throw err
    console.log('Database Connected');
    
    const db = client.db('movies_stash');
    firstMovie(db, () => {
        client.close()
    })
})




const query = { rating: 7};

const firstMovie = (db, cb) => {
    const myMovies = db.collection('myMovies');
    // console.log(myMovies)
    myMovies.aggregate(
        [
            { '$match': query },
            { '$project': { "movie": 1, "_id": 0 }  },            
            { '$limit': 1},
            
        ],
        (err, cursor) => {
            assert.equal(err, null);
            cursor.toArray((err, doc) => {
                if(err) throw err;
                console.log(doc)
                cb(doc);
            })
        }
    )
} 


// MongoClient.connect(url, options, (err, db) => {
//     if (err) throw err;
//     const dbo = db.db("movies_stash");
//     const findMovie = async () => {
//         try {
//             const firstMovie = await dbo.collection("myMovies").aggregate(query, [{ $project: { movie: 1, year: 0, rating: 0 }}]);
//             console.log(firstMovie);
//             db.close();
//         } catch (error) {
//             console.log(error);
//         }
       
//     }
//     findMovie();
// })
