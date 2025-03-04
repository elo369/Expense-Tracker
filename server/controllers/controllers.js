import { dataModel } from "../model/model.js";

export const createList = async(req,res)=>{
    try {
        let {Title,Amout,Category,Type} = req.body

        let app = {Title,Amout,Category,Type,Date}
        console.log(app)

        let created = await dataModel.create({Title,Amout,Category,Type})
        await created.save()
        res.status(200).json(created);
    } catch (error) {
        console.log(error)
    }
}

export const getAll = async(req,res)=>{
    try {
        let all = await dataModel.find()
        res.status(200).json(all)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const updated = async(req,res)=>{
    try {
        const {Title,Amout,Category,Type} = req.body

        let updated = await dataModel.findByIdAndUpdate(req.params.id,{
            Title,
            Amout,
            Category,
            Type
        },{new:true})

        if(!updated){
           return res.status(400).json({message:"not update"})
        }

        console.log("updated",updated)
       return res.status(200).json({ message: "data updated successfully",data:updated })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" }); 
    }
}

export const deleted = async(req,res)=>{
    try {
        let deleted = await dataModel.deleteOne({_id:req.params.id})
        if(!deleted){
           return  res.status(400).json({message:"not deleted"})
        }
       return  res.status(200).json({ message: "Data deleted successfully" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" }); 
    }
}