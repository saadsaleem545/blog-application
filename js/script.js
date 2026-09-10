const API_URL = "https://blog-application-2mgp.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DevBlog Frontend & Backend Connected!");

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // ------------------------------------------
    // 0. AUTH & NAVBAR USER PROFILE CHECK
    // ------------------------------------------
    const userInfo = document.getElementById("userInfo");
    const logoutBtn = document.getElementById("logoutBtn");
    const welcomeUserName = document.getElementById("welcomeUserName");

    if (token && user) {
        if (userInfo) userInfo.innerText = `👤 ${user.fullName}`;
        if (logoutBtn) logoutBtn.style.display = "inline-block";
        if (welcomeUserName) welcomeUserName.innerText = user.fullName;
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            alert("Logged out successfully!");
            window.location.href = "login.html";
        });
    }

    // PROTECTED ROUTE CHECK: Redirect to Login if accessing Dashboard without Token
    const isDashboardPage = window.location.pathname.includes("dashboard.html");
    const isCreateBlogPage = window.location.pathname.includes("create-blog.html");
    if ((isDashboardPage || isCreateBlogPage) && !token) {
        alert("Please login first to access this page!");
        window.location.href = "login.html";
        return;
    }

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
                    <p class="snippet">${blog.content.substring(0, 100)}...</p>
                    <a href="blog-detail.html?id=${blog._id}" class="read-more">Read Article →</a>
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
    // 4. CREATE BLOG API CALL (JWT PROTECTED)
    // ------------------------------------------
    const createBlogForm = document.getElementById("createBlogForm");
    if (createBlogForm) {
        createBlogForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const title = document.getElementById("postTitle").value;
            const category = document.getElementById("postCategory").value;
            const content = document.getElementById("postContent").value;

            try {
                const res = await fetch(`${API_URL}/blogs/create`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, category, content })
                });
                const data = await res.json();

                if (res.ok) {
                    alert("Blog Created Successfully!");
                    window.location.href = "dashboard.html";
                } else {
                    alert(data.message || "Failed to create blog.");
                }
            } catch (err) {
                alert("Server Connection Error");
            }
        });
    }

    // ------------------------------------------
    // 5. FETCH SINGLE BLOG DETAILS
    // ------------------------------------------
    const blogDetailContainer = document.getElementById("blogDetailContainer");
    if (blogDetailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get("id");

        if (blogId) {
            fetchSingleBlog(blogId);
        } else {
            blogDetailContainer.innerHTML = "<p>Invalid Blog Post ID.</p>";
        }
    }

    async function fetchSingleBlog(id) {
        try {
            const res = await fetch(`${API_URL}/blogs/${id}`);
            const blog = await res.json();

            if (res.ok) {
                blogDetailContainer.innerHTML = `
                    <span class="category" style="background:#007bff; color:#fff; padding:4px 8px; border-radius:4px;">${blog.category}</span>
                    <h1 style="margin: 15px 0;">${blog.title}</h1>
                    <p class="meta" style="color: #666; margin-bottom: 20px;">
                        By ${blog.authorName || 'Saad'} • ${new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <div class="blog-content" style="line-height: 1.8; font-size: 1.1rem; border-top: 1px solid #eee; padding-top: 15px;">
                        <p>${blog.content}</p>
                    </div>
                    <br>
                    <a href="index.html" style="display: inline-block; text-decoration: none; color: #007bff;">← Back to Home</a>
                `;
            } else {
                blogDetailContainer.innerHTML = `<p>${blog.message || 'Error loading post.'}</p>`;
            }
        } catch (err) {
            blogDetailContainer.innerHTML = "<p>Server Connection Error</p>";
        }
    }

    // ------------------------------------------
    // 6. DASHBOARD: LOAD LOGGED-IN USER'S BLOGS ONLY (JWT PROTECTED)
    // ------------------------------------------
    const userBlogsList = document.getElementById("userBlogsList");
    if (userBlogsList && token) {
        loadUserBlogs();
    }

    async function loadUserBlogs() {
        try {
            const res = await fetch(`${API_URL}/blogs/user/my-blogs`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const blogs = await res.json();

            if (blogs.length === 0) {
                userBlogsList.innerHTML = `<tr><td colspan="5" style="text-align:center;">You haven't created any blogs yet.</td></tr>`;
                return;
            }

            userBlogsList.innerHTML = blogs.map(blog => `
                <tr>
                    <td class="post-title">${blog.title}</td>
                    <td>${blog.category}</td>
                    <td>${new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td><span class="badge badge-success">Published</span></td>
                    <td class="action-buttons">
                        <button class="btn-delete" style="background: #dc3545; color: white; border: none; padding: 6px 12px; cursor: pointer; border-radius: 4px;" onclick="deleteBlog('${blog._id}')">Delete</button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            userBlogsList.innerHTML = `<tr><td colspan="5" style="text-align:center;">Failed to load your blogs.</td></tr>`;
        }
    }

    // Global Protected Delete Function
    window.deleteBlog = async function(id) {
        if (confirm("Are you sure you want to delete this blog?")) {
            try {
                const res = await fetch(`${API_URL}/blogs/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    alert("Blog deleted successfully!");
                    location.reload();
                } else {
                    alert("Failed to delete blog.");
                }
            } catch (err) {
                alert("Server Connection Error");
            }
        }
    };
});