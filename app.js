
const express = require("express");
const bodyParser = require("body-parser");
const tagsConfig = require(__dirname + "/TagsColors.js");
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

// Contentful
const contentful = require("contentful");
const HTMLContentRender = require('@contentful/rich-text-html-renderer');

var client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID
});

// Constants
const constants = require(__dirname + "/constants");

app.get("/", function(req, res) {

    let topics = [];

    client.getEntries({
        limit: 3,
        content_type: 'blogPost',
        order: '-sys.createdAt'
    })
    .then(function (entries) {

        entries.items.forEach(function (entry) {
            
            let item = {
                title: entry.fields.title,
                description: HTMLContentRender.documentToHtmlString(entry.fields.content),
                content: HTMLContentRender.documentToHtmlString(entry.fields.content),
                image: entry.fields.thumbnailImage.fields.file,
                tags: entry.metadata.tags
            }
            topics.push(item);
        });
        res.render("index.ejs", {constants, topics, tagsConfig});
    });

});

const port = process.env.PORT;
app.listen(port, function() {
    console.log(`Server is running on port ${port}.`);
}); 
