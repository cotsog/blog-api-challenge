const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { BlogPosts } = require('./models');

function blogPost() {
    return 'Hey there, this is a blog post about learning how to ' +
        'write server-side javascript. The cool thing about it it, you can' +
        'create and manipulate databases of all kinds. Create Read Update Delete' +
        'are the methods we use to do that. There is a lot more involved' +
        'than just that, though. Let\'s proceed through the curriculum and' +
        'to learn more. '
}

function blogPostTwo() {
    return 'A long day today filled with cleaning my apartment. ' +
        'And it needed it! It took me three hours to clean it and I ' +
        'am very tired. It sucks to get old, haha. '
}

BlogPosts.create(
    'A Deeper Understanding', blogPost(), 'A. Noob'
);
BlogPosts.create(
    'A Greater Understanding', blogPostTwo(), 'A. N. Imposter'
);

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i += 1) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(
        req.body.title, req.body.content, req.body.author);
    res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = [
        'id', 'title', 'content', 'author']
    for (let i = 0; i < requiredFields.length; i += 1) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id (${req.params.id}) and request body id`
                `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).send(message);

    }
    console.log(`Updating blog post with id \`${req.params.id}\``);
    try {
        const updatedItem = BlogPosts.update({
            id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            author: req.body.author

        });
        console.log(updatedItem);
    res.status(200).json(updatedItem);
    } catch (e) {
        console.log(e);
    }

});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post with id \`${req.params.id}\``);
    res.status(204).end();
});

module.exports = router;