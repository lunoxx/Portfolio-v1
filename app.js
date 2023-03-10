
const express = require("express");
const bodyParser = require("body-parser");
const tagsConfig = require(__dirname + "/TagsColors.js");


const session = require('express-session');
var flash = require('connect-flash');
require('dotenv').config() ;

const compression = require('compression');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(compression());

app.set("view engine", "ejs");
app.set("views", __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// dateTime:
const dateTime = require("datetime-js");

// Contentful
const contentful = require("contentful");
const HTMLContentRender = require('@contentful/rich-text-html-renderer');

var client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID
});

// Mailchimp
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API,
    server: process.env.MAILCHIMP_SERVER,
  });

// Constants
const constants = require(__dirname + "/constants");
constants.YEAR = new Date().getFullYear();


// ROUTES:

app.get("/", function(req, res) {

    console.log();


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
                thumbnail_image: (`${entry.fields.thumbnailImage.fields.file.url}?fm=webp`),
                tags: entry.metadata.tags
            }
            topics.push(item);
            // res.send(item.thumbnail_image);
        });

        res.render("index.ejs", {constants, topics, tagsConfig, title:'Mesesan Alin - Portfolio', flash_message: req.flash('flash_message')});
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
                        thumbnail_image: (`${entry.fields.thumbnailImage.fields.file.url}?fm=webp`),
                        tags: entry.metadata.tags,
                        createdAt: dateTime(new Date(entry.sys.createdAt), '%d %M:s %Y, %H:%i')
                    }
                    
                    const title = "Mesesan Alin / Project: " + slug;
                    res.render("readProject.ejs", {constants, item, tagsConfig, title});
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
                    thumbnail_image: (`${entry.fields.thumbnailImage.fields.file.url}?fm=webp`),
                    tags: entry.metadata.tags
                }
                projects.push(item);
                // res.send(item.slug);
            });

            res.render("allProjects.ejs", {constants, projects, tagsConfig, title:'Mesesan Alin - Projects'});
        });
        
    }
});

// Subscribe to newsletter
app.post("/subscribe", function(req, res) {
    
    var email = req.body.emailAdress;

    if(email.length < 3) {
        
        var flash_arr = {
            "type": 'error',
            "title": 'Something was wrong',
            "message": 'Your email address does not appear to be valid.',
            "time_to_show": 6000,
        }
        req.flash('flash_message', flash_arr);
        res.redirect('/');
        return;
    }

    const addListMember = async () => {

        try {
            const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
                email_address: email,
                status: "subscribed"
            });
            
            var flash_arr = {
                "type": 'success',
                "title": 'Success!',
                "message": 'Your Email was succesfully registered.<br>Thank you!',
                "time_to_show": 6000,
            }

            req.flash('flash_message', flash_arr);
            res.redirect('/');
        }
        catch (err) {
            // if(err.status == 400) {
            //     console.log(JSON.parse(err.response.text));
            //     res.status(400).send(err);
            // }
            var flash_arr = {
                "type": 'error',
                "title": 'Something was wrong',
                "message": 'Something didn`t work. Your address has not been registered!',
                "time_to_show": 6000,
            }
            req.flash('flash_message', flash_arr);
            res.redirect('/');
        }
    };

    addListMember();
});



// Contact page
app.get("/contact", function(req, res) {
    res.send("contact page");
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server is running on port ${port}.`);
}); 
