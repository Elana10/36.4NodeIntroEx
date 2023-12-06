const fs = require('fs');   
const axios = require('axios');

function cat(path){
    fs.readFile(path,'utf8', (err, data) =>{
        if(err){
            console.log('Error:', err)
            process.exit(1)
        }
        console.log(data)
    })
};



async function webCat(url){
    try{
        const html = await axios.get(url);   
        console.log(html)      
    } catch(err){
        console.log(err)
        process.exit(1)
    }
};

let text = process.argv[2]

if(text.slice(0,4) === 'http'){
    webCat(text);
} else {
    cat(text);
}