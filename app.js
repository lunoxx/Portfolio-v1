
const express = require("express");
const bodyParser = require("body-parser");
const tagsConfig = require(__dirname + "/TagsColors.js");
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", __dirname + '/views');
// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));


// dateTime:
const dateTime = require("datetime-js");


// Contentful
const contentful = require("contentful");
const HTMLContentRender = require('@contentful/rich-text-html-renderer');

var client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID
});

// Constants
const constants = require(__dirname + "/constants");
constants.YEAR = new Date().getFullYear();

app.get("/", function(req, res) {

    let topics = [];

    client.getEntries({
        limit: 5,
        content_type: 'blogPost',
        order: '-sys.createdAt'
    })
    .then(function (entries) {

        entries.items.forEach(function (entry) {
            
            let item = {
                title: entry.fields.title,
                slug: entry.fields.slug,
                description: HTMLContentRender.documentToHtmlString(entry.fields.description),
                content: HTMLContentRender.documentToHtmlString(entry.fields.content),
                thumbnail_image: entry.fields.thumbnailImage.fields.file,
                tags: entry.metadata.tags
            }
            topics.push(item);
            // res.send(item.slug);
        });
        res.render("index.ejs", {constants, topics, tagsConfig});
    });
});

// View projects routes
app.get("/projects/:slug?", function(req, res) {

    const slug = req.params.slug;

    // show just one project
    if(slug) {

        client.getEntries({
            limit: 1,
            content_type: 'blogPost',
            "fields.slug": slug,
        })
        .then(function (entries) {

            if(entries.total) {

                entries.items.forEach(function (entry) {
                    let item = {
                        title: entry.fields.title,
                        slug: entry.fields.slug,
                        description: HTMLContentRender.documentToHtmlString(entry.fields.description),
                        content: HTMLContentRender.documentToHtmlString(entry.fields.content),
                        thumbnail_image: entry.fields.thumbnailImage.fields.file,
                        tags: entry.metadata.tags,
                        createdAt: dateTime(new Date(entry.sys.createdAt), '%d %M:s %Y, %H:%i')
                    }
                    
                    res.render("readProject.ejs", {constants, item, tagsConfig});
                });
            }
            else res.send("404 not found");
        });

    }

    // show all projects
    else {
        let projects = [];

        client.getEntries({
            content_type: 'blogPost',
            order: '-sys.createdAt'
        })
        .then(function (entries) {
    
            entries.items.forEach(function (entry) {
                
                let item = {
                    title: entry.fields.title,
                    slug: entry.fields.slug,
                    description: HTMLContentRender.documentToHtmlString(entry.fields.description),
                    content: HTMLContentRender.documentToHtmlString(entry.fields.content),
                    thumbnail_image: entry.fields.thumbnailImage.fields.file,
                    tags: entry.metadata.tags
                }
                projects.push(item);
                // res.send(item.slug);
            });
            res.render("allProjects.ejs", {constants, projects, tagsConfig});
        });
        
    }
});

// Contact page
app.get("/contact", function(req, res) {
    res.send("contact page");
});

const port = process.env.PORT;
app.listen(port, function() {
    console.log(`Server is running on port ${port}.`);
}); 
