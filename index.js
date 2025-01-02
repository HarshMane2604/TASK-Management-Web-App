const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const { log } = require('console');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir(`./files`,function(err, files){
        console.log(files);
        res.render("index",{files:files});    
    });
    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});