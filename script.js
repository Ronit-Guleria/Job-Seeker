document.addEventListener("DOMContentLoaded", () => {
    const jobForm = document.getElementById("jobForm");
    const jobList = document.getElementById("jobs");
    const searchInput = document.getElementById("search");
    let jobs = [];
    //Jump to Forms
    let btn = document.querySelectorAll(".button").forEach(btn =>{
        btn.addEventListener("click",()=>{
            window.location.href="application-form.html";
        })
    })

    jobForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let title = document.getElementById("title").value;
        let company = document.getElementById("company").value;
        let description = document.getElementById("description").value;

        let job = { title, company, description };
        jobs.push(job);
        displayJobs(jobs);

        jobForm.reset();
    });

    searchInput.addEventListener("input", () => {
        const filteredJobs = jobs.filter(job => 
            job.title.toLowerCase().includes(searchInput.value.toLowerCase()) || 
            job.company.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        displayJobs(filteredJobs);
    });

    function displayJobs(jobListArray) {
        jobList.innerHTML = "";
        jobListArray.forEach((job, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>${job.title}</strong> at <em>${job.company}</em><p>${job.description}</p>`;
            jobList.appendChild(li);
        });
    }
});
// Simple alert for login
document.addEventListener("DOMContentLoaded", function() {
    let loginBtn = document.querySelector(".submit-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function() {
            alert("This is a frontend demo. Backend not connected.");
        });
    }
});
// alert for profile logout
document.querySelector(".logout-btn").addEventListener("click", function() {
    alert("Logged out successfully!");
    window.location.href = "login.html"; // Redirect to login page
});



/// jobs are fetched using this code
document.addEventListener("DOMContentLoaded", async () => {
    const jobsContainer = document.getElementById("jobs-container");

    try {
        const response = await fetch("http://localhost:5000/jobs"); // Backend API
        const jobs = await response.json();

        if (jobs.length === 0) {
            jobsContainer.innerHTML = "<p>No jobs available.</p>";
            return;
        }

        jobsContainer.innerHTML = jobs.map(job => `
            <div class="job-card">
                <h2>${job.title}</h2>
                <h3>${job.company} - ${job.location}</h3>
                <p>${job.description}</p>
                <small>Posted on: ${new Date(job.postedAt).toDateString()}</small>
            </div>
        `).join("");
    } catch (error) {
        jobsContainer.innerHTML = "<p>Error loading jobs.</p>";
        console.error("Error fetching jobs:", error);
    }
});
