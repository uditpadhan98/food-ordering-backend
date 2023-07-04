const mongoose=require("mongoose");
// const mongoURI=require("")
const mongoURI='mongodb+srv://you_dit:you_dit@uditapi.tbfthnc.mongodb.net/foodmern?retryWrites=true&w=majority'
mongoose.set("strictQuery", false);
const mongoDB=async(uri)=>{
    await mongoose.connect(uri,{useNewUrlParser:true},(err,result)=>{       
        if(err){
            console.log("Error found",err);
        }
        else{
            console.log("connected");
            const fetched_data= mongoose.connection.db.collection("fooditem");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory=await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                    else{
                        global.fooditem=data;
                        global.foodCategory=catData;
                    }
                })
                // if(err) {
                //     console.log(err);
                // }
                // else {
                //     global.fooditem=data;
                //     // console.log(global.fooditem);
                // }
            });
        }
    });
}

module.exports=mongoDB;