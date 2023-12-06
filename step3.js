const fs = require('fs');   
const axios = require('axios');

function cat(path, outFile){
    try{
        fs.readFile(path,'utf8', (err, data) =>{
        if(err){
            console.log('Error:', err)
            process.exit(1)
        }
        if(outFile){
            createNewFile(data, outFile)                       
        } else {
            console.log(data) 
        } 
        })
    } catch(err){
        console.log('Cat Function Err:', err)
    }
};

async function webCat(url, outFile){
    try{
        const html = await axios.get(url);  
        if(outFile){
            createNewFile(html.data, outFile)             
        } else {
            console.log(html.data)             
        }
     
    } catch(err){
        console.log(err)
        process.exit(1)
    }
};

function createNewFile(data, outFile){
    fs.writeFile(outFile,data,'utf8', err=> {
        if(err){
            console.log('Error createNewFile: ', err)
            process.exit(1)            
        }
        console.log('New file written.')
    })
}

let path; 
let outFile;

if(process.argv[2] === '--out'){
    outFile = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
    outFile = false
}

if(path.slice(0,4) === 'http'){
    webCat(path, outFile);
} else {
    cat(path, outFile);
}