const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/register",{
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

