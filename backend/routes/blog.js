const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Create Blog
router.post('/create', async (req, res) => {
    try {
        const { title, category, content, authorName } = req.body;
        if (!title || !category || !content) {
            return res.status(400).json({ message: 'Please fill all fields.' });
        }

        const blog = await Blog.insert({
            title,
            category,
            content,
            authorName: authorName || 'Saad Saleem',
            createdAt: new Date()
        });

        res.status(201).json({ message: 'Blog created successfully!', blog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Get All Blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;

// Get Single Blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});