const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
// const { log } = require('console');
// const { console } = require('inspector');

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

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', function(err, data) {
        if (err) throw err;
        res.render("show", {filename: req.params.filename, filedata: data});
        
    });
});

app.post('/create', (req, res) => {
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.redirect('/');
    });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});