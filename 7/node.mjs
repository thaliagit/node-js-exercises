import * as fs from "node:fs";

fs.writeFile('example.txt', "hello", function(error){
    if(error){
        console.error(error, "there has been an error")
        return;
    }
})
