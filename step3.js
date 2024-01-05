const fs = require("fs");
const process = require("process");
const axios = require("axios");

function handleFile (text, output){
  if(output){
    fs.writeFile(output,text,'utf8', function (err){
      if(err){
        console.error(`${err}`);
        process.exit(1);
      }
    })
  } else {
    console.log(text)
  }
}

function cat(path,output) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}:${err}`);
      process.exit(1);
    } else {
      handleFile(data,output)
    }
  });
}

async function webCat(url,output) {
  try {
    let res = await axios.get(url);
    handleFile(res.data,output);
  } catch (err) {
    console.error(`Error fetching ${url}:${err}`);
    process.exit(1);
  }
}

let path;
let output;

if(process.argv[2] === '--out'){
  output = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path,output);
} else {
  cat(path,output);
}
