import mongoose, { model, Schema } from "mongoose"

const trackerSchema = new Schema({
    Title:{
        type:String,
        required:true
    },
    Amout:{
        type:Number,
        required:true,
    },
    Category:{
        type:String,
    },
    Type:{
        type:String
    },
    Date:{
        type: Date,
        default: Date.now 
    }
},{
    timeStamp:true
})

export const dataModel = model("trackerData",trackerSchema)

// Wz9dTEQHthWGQHo0
// rohitrikame88