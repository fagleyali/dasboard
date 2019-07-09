const mongoose =  require ('mongoose');

mongoose.connect('mongodb://localhost/dasboard', {useNewUrlParser:true});

const db = mongoose.connection;

db.once('connected',()=>{

    console.log(`connected to MongoDB at ${db.host}: ${db.port}`);
})

db.on('error',function(error){
    console.log(error)
})