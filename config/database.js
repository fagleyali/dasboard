const mongoose =  require ('mongoose');

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/dasboard', {useNewUrlParser:true});

const db = mongoose.connection;

db.once('connected',()=>{
    console.log(`connected to MongoDB at ${db.host}: ${db.port}`);
})