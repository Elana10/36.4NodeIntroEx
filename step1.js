function cat(path){
    const fs = require('fs');    
    fs.readFile(path,'utf8', (err, data) =>{
        if(err){
            console.log('Error:', err)
            process.exit(1)
        }
        console.log(data)
    })
}

cat(process.argv[2])