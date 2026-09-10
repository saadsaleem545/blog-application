// Document Ready Check
document.addEventListener("DOMContentLoaded", () => {
    console.log("DevBlog Frontend Loaded Successfully!");

    // 1. Handle Login Form Submit
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            alert(`Logged in successfully as: ${email}`);
            window.location.href = "dashboard.html"; // Redirect to dashboard
        });
    }

    // 2. Handle Register Form Submit
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const fullName = document.getElementById("fullName").value;
            alert(`Account created successfully for ${fullName}! Please log in.`);
            window.location.href = "login.html"; // Redirect to login
        });
    }

    // 3. Handle Create Blog Form Submit
    const createBlogForm = document.getElementById("createBlogForm");
    if (createBlogForm) {
        createBlogForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("postTitle").value;
            alert(`Article "${title}" published successfully!`);
            window.location.href = "dashboard.html"; // Redirect to dashboard
        });
    }

    // 4. Handle Delete Button Actions on Dashboard
    const deleteButtons = document.querySelectorAll(".btn-delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            const postTitle = row.querySelector(".post-title").textContent;
            if (confirm(`Are you sure you want to delete "${postTitle}"?`)) {
                row.remove();
                alert("Post deleted successfully.");
            }
        });
    });
});