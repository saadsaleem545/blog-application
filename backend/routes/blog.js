const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const verifyToken = require('../middleware/auth');

// 1. CREATE BLOG (Protected)
router.post('/create', verifyToken, async (req, res) => {
    try {
        const { title, category, content } = req.body;
        if (!title || !category || !content) {
            return res.status(400).json({ message: 'Please fill all fields.' });
        }

        const blog = await Blog.insert({
            title,
            category,
            content,
            authorId: req.user.id,
            authorName: req.user.fullName || 'Saad Saleem',
            createdAt: new Date()
        });

        res.status(201).json({ message: 'Blog created successfully!', blog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// 2. GET ALL PUBLIC BLOGS
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// 3. GET LOGGED-IN USER'S BLOGS ONLY (Protected - Module 5)
router.get('/user/my-blogs', verifyToken, async (req, res) => {
    try {
        const userBlogs = await Blog.find({ authorId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(userBlogs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// 4. GET SINGLE BLOG BY ID
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

// 5. UPDATE BLOG BY ID (Protected)
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { title, category, content } = req.body;
        const updatedBlog = await Blog.update(
            { _id: req.params.id, authorId: req.user.id },
            { $set: { title, category, content } },
            { returnUpdatedDocs: true }
        );
        res.status(200).json({ message: 'Blog updated successfully!', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// 6. DELETE BLOG BY ID (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Blog.remove({ _id: req.params.id, authorId: req.user.id }, {});
        res.status(200).json({ message: 'Blog deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;