
const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine','ejs');


let temp = [0];
let name = "";
let humidity = [];
// let imageurl = "";
// let sunrise = [];
// let sunset =[];
// let hours=[];
// let minutes=[];
// let seconds = [];
let icon = "";
let description = "";



// let unix_timestamp = [];




app.post("/", function(req,res){
    // console.log(req.body.cityName);

    const query = req.body.cityName;
    const apikey = "06cb7f8d8cddb37f828568029102a4fe";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid=" + apikey+"&units=metric";

    https.get(url,function(response) {
        // console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);

            temp = weatherData.main.temp;

            name = weatherData.name;

            description = weatherData.weather[0].description;

            humidity = weatherData.main.humidity;

           

            // sunrise = timeConverter(weatherData.sys.sunrise);
        
            // sunset = timeConverter(weatherData.sys.sunset);

            icon = weatherData.weather[0].icon;
            
            // this is a function that convert unix time to hour,minutes and second
            // function timeConverter(unix_timestamp){
            //     var date = new Date(unix_timestamp * 1000);

            //          hours = date.getHours();
            //          minutes = "0" +  date.getMinutes();
            //          seconds = "0" + date.getSeconds();

            //     function formattime(hours) {
            //         var h =  hours % 12;
            //         if(h == 0) {
            //             h = 12;
            //             return h + ":" + minutes.substr(-2) + ":" + seconds.substr(-2) + (hours < 12 ? ' am' : ' pm'); ;
            //         }

            //         if(h < 10) {
            //             return '0'+ h + ":" + minutes.substr(-2) + ":" + seconds.substr(-2) + (hours < 12 ? ' am' : ' pm');
            //         }
            //         else {
            //             return h + ":" + minutes.substr(-2) + ":" + seconds.substr(-2) + (hours < 12 ? ' am' : ' pm');
            //         }
            //     }

               
            //     var time = formattime(hours);


            //     return time;
            // }
            // console.log(sunrise);
            
            // console.log(sunset);
            // console.log(icon);
            res.redirect("/");
        })
    })
})


app.get("/", function(req,res){

    
    
    // res.sendFile(__dirname + "/index.html");
    res.render("list", {today_temp : temp, nameOfTheCity : name,
        today_humidity : humidity, 
         imageurl : icon, Weather_description : description
   })
    
 temp = [0];
  humidity = [];
 
 name = "";
// let imageurl = "";
 
//  icon = "";
 description = "";
   
})
   
// 

app.listen(process.env.PORT || 3000, function(){
    // console.log("server is started at port 3000");
})