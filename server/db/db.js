import mongoose from "mongoose";

const connectToMongoDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://myohtetkyaw:11111@cluster0.fkccouj.mongodb.net/note_app?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message)
    }
}

export default connectToMongoDB;    