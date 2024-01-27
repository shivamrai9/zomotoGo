const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://shivamrai5476:Shivamrai9082@cluster1.iyj1b.mongodb.net/zomotogo?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        const data = await mongoose.connection.collection('fooditems').find({}).toArray();
        const foodCategoriesData = await mongoose.connection.collection('foodCategory').find({}).toArray();
        console.log(foodCategoriesData)
        global.foodCategory = foodCategoriesData
        global.fooditems = data;        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongoDB;
