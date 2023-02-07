
const author = {
    full_name: process.env.FULL_AUTHOR_NAME,
    short_name: process.env.SHORT_AUTHOR_NAME,
    github: process.env.AUTHOR_GITHUB,
    facebook: process.env.AUTHOR_FACEBOOK,
    linkedin: process.env.AUTHOR_LINKEDIN
};

exports.author = author

const SEO = {
    hero_text: process.env.HERO_TEXT,
    nav_title: process.env.NAV_TITLE
};

exports.SEO = SEO