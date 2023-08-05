var figlet = require("figlet");

figlet("Welcome user!", function(err, data){
    if(err){
        console.log("There has been a problem...");
        console.dir(err);
        return;
    }
    console.log(data)
})