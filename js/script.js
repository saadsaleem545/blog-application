const API_URL = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DevBlog Frontend & Backend Connected!");

    // ------------------------------------------
    // 1. FETCH & DISPLAY BLOGS ON HOME PAGE
    // ------------------------------------------
    const blogGrid = document.querySelector(".blog-grid");
    if (blogGrid) {
        fetchBlogs();
    }

    async function fetchBlogs() {
        try {
            const res = await fetch(`${API_URL}/blogs`);
            const blogs = await res.json();

            if (blogs.length === 0) {
                blogGrid.innerHTML = "<p>No blogs published yet.</p>";
                return;
            }

            blogGrid.innerHTML = blogs.map(blog => `
                <article class="blog-card">
                    <span class="category">${blog.category}</span>
                    <h3>${blog.title}</h3>
                    <p class="meta">By ${blog.authorName || 'Saad'} • ${new Date(blog.createdAt).toLocaleDateString()}</p>
                    <p class="snippet">${blog.content}</p>
                    <a href="#" class="read-more">Read Article →</a>
                </article>
            `).join('');
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    }

    // ------------------------------------------
    // 2. USER REGISTER API CALL
    // ------------------------------------------
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const res = await fetch(`${API_URL}/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fullName, email, password })
                });
                const data = await res.json();

                if (res.ok) {
                    alert("Registration Successful! Please log in.");
                    window.location.href = "login.html";
                } else {
                    alert(data.message || "Registration failed.");
                }
            } catch (err) {
                console.error(err);
                alert("Connection Error: " + err.message);
}
        });
    }

    // ------------------------------------------
    // 3. USER LOGIN API CALL
    // ------------------------------------------
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const res = await fetch(`${API_URL}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();

                if (res.ok) {
                    // Token save in localStorage
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    alert("Login Successful!");
                    window.location.href = "dashboard.html";
                } else {
                    alert(data.message || "Invalid Email/Password");
                }
            } catch (err) {
                alert("Server Connection Error");
            }
        });
    }

    // ------------------------------------------
    // 4. CREATE BLOG API CALL
    // ------------------------------------------
    const createBlogForm = document.getElementById("createBlogForm");
    if (createBlogForm) {
        createBlogForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const title = document.getElementById("postTitle").value;
            const category = document.getElementById("postCategory").value;
            const content = document.getElementById("postContent").value;
            const user = JSON.parse(localStorage.getItem("user")) || { fullName: "Saad Saleem" };

            try {
                const res = await fetch(`${API_URL}/blogs/create`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title,
                        category,
                        content,
                        authorName: user.fullName
                    })
                });
                const data = await res.json();

                if (res.ok) {
                    alert("Blog Created & Saved to Backend!");
                    window.location.href = "index.html";
                } else {
                    alert(data.message || "Failed to create blog.");
                }
            } catch (err) {
                alert("Server Connection Error");
            }
        });
    }
});