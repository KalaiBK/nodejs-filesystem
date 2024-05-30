const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express();
const port = 3000;
const folderPath = "./files"

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive : true })
}

app.get("/create-file", responseCreateFile)
app.get("/get-files", responseGetFiles)

function responseCreateFile(req, res) {
    const currentDateTime = new Date();
    const fileName = `${currentDateTime.toISOString().replace(/:/g, "-")}.txt`
    // const filePath = `${__dirname}/${folderName}/${fileName}`
    const filePath = path.join(folderPath, fileName)
    fs.writeFile(filePath, currentDateTime.toString(), (err) => {
        if (err) {
            res.writeHead(500);
            res.end("Error Creating File!!!")
            return;
        }
        res.writeHead(200, { "Content-Type" : "text/plain" })
        res.end(`File has been created successfully. File name is ${fileName}`);
    });
}

function responseGetFiles(req, res) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            res.writeHead(500);
            res.end("Folder not available!!!")
            return;
        }
        const textFiles = files.filter((file) => path.extname(file) === ".txt")
        res.writeHead(200, { "Content-Type" : "application/json" })
        res.end(`Files List : ${JSON.stringify(textFiles)}`)
    })
}

app.listen(3000, () =>  console.log(`Running in port ${port}`))