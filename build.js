const fs = require("fs");
const parse = require("xml2js").parseString;

async function main() {
 let dirs = fs.readdirSync("images/train/");
 let dataset = {
  "@context": "https://code.sgo.to/datasets",
  "@type": "Dataset",
  "name": "Kaggle's simpsons characters dataset in JSON-LD",
  "download": "https://github.com/samuelgoto/simpsons/releases/download/v0.0.1/simpsons.tar.gz",
  "classes": []
 };
 for (let dir of dirs) {
  // console.log(dir);
  // continue;
  let entry = {
   "@context": "https://code.sgo.to/datasets",
   "@type": "Class",
   "@id": `${dir}`,
   "url": `images/train/${dir}/index.jsonld`,
   "name": `${dir}`,
   "images": []
   // "images": `images/${dir}/index.jsonld`
  };

  // let feed = {
  // "@context": "https://feeds.json-ld.io/2005/Atom",
  // "@type": "Feed",
  // "name": `Images of ${dir}`,
  // "entries": []
  //};

  for (let file of fs.readdirSync(`images/train/${dir}/`)) {
   
   if (file == "index.jsonld") {
    continue;
   }

   // console.log(file);
   // continue;

   // console.log(file);
   // let image = {
   // "@type": "Image",
   // "url": `images/train/${dir}/${file}`
   //};

   entry.images.push({"@type": "Image", "url": file});

   // feed.entries.push(image);
   
   // entry.examples.push(`images/${dir}/${file}`);

   // console.log(JSON.stringify(entry, undefined, 2));
   
   // break;
  }
  fs.writeFileSync(`images/train/${dir}/index.jsonld`, JSON.stringify(entry, undefined, 2));

  dataset.classes.push(`images/train/${dir}/index.jsonld`);

  // dataset.classes.push(entry);
  // break;
 }
 fs.writeFileSync("manifest.jsonld", JSON.stringify(dataset, undefined, 2));
 // console.log(JSON.stringify(dataset, undefined, 2));
}

main();
