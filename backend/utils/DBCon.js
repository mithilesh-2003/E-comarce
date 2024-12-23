import mongoose from "mongoose";

function DBConn(){
    mongoose.connect(process.env.DBURI).then(()=>{
        console.log(`Database connected successfully`)
    }).catch((error)=>{
        console.log(`Error in connection of Database`)
    })
}

export default DBConn;