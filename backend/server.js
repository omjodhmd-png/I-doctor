import app from "./app.js";
import dotenv from "dotenv";
import sequelize from "./config/db.js";




dotenv.config();

const PORT = process.env.PORT || 5000



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
sequelize.sync({force:true})
      .then(()=>console.log("Database synced successfully"))
      .catch((err)=>console.error("err"))