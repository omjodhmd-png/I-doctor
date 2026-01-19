import app from "./app.js";
import dotenv from "dotenv";
import sequelize from "./config/db.js";




dotenv.config();

const PORT = process.env.PORT || 5000



app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server running on port ${PORT}`)
})
sequelize.sync({alter:true})
      .then(()=>console.log("Database synced successfully"))
      .catch((err)=>console.error("err"))