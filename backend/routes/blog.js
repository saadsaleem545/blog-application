const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// 1. CREATE BLOG (POST /api/blogs/create)
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

// 2. GET ALL BLOGS (GET /api/blogs)
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// 3. GET SINGLE BLOG BY ID (GET /api/blogs/:id)
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

// 4. UPDATE BLOG BY ID (PUT /api/blogs/:id)
router.put('/:id', async (req, res) => {
    try {
        const { title, category, content } = req.body;
        const updatedBlog = await Blog.update(
            { _id: req.params.id },
            { $set: { title, category, content } },
            { returnUpdatedDocs: true }
        );
        res.status(200).json({ message: 'Blog updated successfully!', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// 5. DELETE BLOG BY ID (DELETE /api/blogs/:id)
router.delete('/:id', async (req, res) => {
    try {
        await Blog.remove({ _id: req.params.id }, {});
        res.status(200).json({ message: 'Blog deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Note: Always keep module.exports at the VERY END of the file
module.exports = router;