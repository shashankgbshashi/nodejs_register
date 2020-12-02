const mongoose = require("mongoose");

mongoose.connect(process.env.DB_NAME,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes : true
})
.then(() => {
    console.log("Successfully connected to backend");
})
.catch((e)=> {
    console.log(`Caught error ${e} during connection`);
});

