let requests=require('requests');
let http=require('http');
let fs=require('fs');
let homeFile=fs.readFileSync('home.html','utf-8');

let replaceVal=(homeFileData,apiData)=>{
    let newHomeFileData= homeFileData.replace('{%tempVal%}',apiData?.main?.temp??'');
    newHomeFileData=newHomeFileData.replace('{%minTempVal%}',apiData?.main?.temp_min??'');
    newHomeFileData=newHomeFileData.replace('{%maxTempVal%}',apiData?.main?.temp_max??'');
    newHomeFileData=newHomeFileData.replace('{%cityName%}',apiData?.name??'');
    newHomeFileData=newHomeFileData.replace('{%countryCode%}',apiData?.sys?.country??'');
    newHomeFileData=newHomeFileData.replace('{%weatherStatus%}',apiData?.weather[0]?.main??'');

   
    return newHomeFileData;

}

const server=http.createServer((req,res)=>{
    
    if(req.url=='/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Damoh&appid=22ea01850755c0e0728ef752f98d5c5d&units=metric')
        .on('data',(chunk)=>{
            const objData=JSON.parse(chunk);
            let arrData=[objData];
            let modifiledData=replaceVal(homeFile,arrData[0]);
            res.write(modifiledData);
           
        })
        .on('end',(err)=>{
           if (err){
             console.log("error encountered");
           }
             res.end();
        })

    
    }
});

server.listen(3000,()=>{
    console.log("server is listening");
})