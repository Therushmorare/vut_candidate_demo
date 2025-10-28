const applicantId = sessionStorage.getItem("applicant_id");

// Load bookmark state from sessionStorage
let bookmarkedJobs = JSON.parse(sessionStorage.getItem("bookmarkedJobs") || "[]");

// Update icons on page load
document.querySelectorAll(".bookmark-btn").forEach((button) => {
  const jobId = button.dataset.jobId;
  const icon = button.querySelector(".material-icons");
  if (bookmarkedJobs.includes(jobId)) {
    icon.textContent = "bookmark";
    icon.classList.add("text-green-600");
    icon.classList.remove("text-gray-400");
  } else {
    icon.textContent = "bookmark_border";
    icon.classList.add("text-gray-400");
    icon.classList.remove("text-green-600");
  }
});

document.addEventListener("click", async (e) => {
  const button = e.target.closest(".bookmark-btn");
  if (!button) return;

  const icon = button.querySelector(".material-icons");
  const jobId = button.dataset.jobId;
  const isBookmarked = icon.textContent === "bookmark";

  const endpoint = isBookmarked
    ? "https://jellyfish-app-z83s2.ondigitalocean.app/api/candidate/dislikePost"
    : "https://jellyfish-app-z83s2.ondigitalocean.app/api/candidate/likePost";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ job_id: jobId, applicant_id: applicantId }),
    });

    const data = await response.json();

    if (response.ok) {
      // Toggle icon
      icon.textContent = isBookmarked ? "bookmark_border" : "bookmark";
      icon.classList.toggle("text-green-600");
      icon.classList.toggle("text-gray-400");

      // Update sessionStorage
      if (isBookmarked) {
        bookmarkedJobs = bookmarkedJobs.filter((id) => id !== jobId);
      } else {
        bookmarkedJobs.push(jobId);
      }
      sessionStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarkedJobs));

      // Show toast
      const toast = document.createElement("div");
      toast.textContent = data.message;
      toast.className =
        "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Network error. Please try again.");
  }
});