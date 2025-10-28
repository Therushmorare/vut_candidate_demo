/**
 * Universal Candidate Data Loader
 * Author: Nathaniel Morare
 * Description:
 * Loads all candidate data dynamically and injects it into DOM containers.
 * You can reuse this script on any page — just include containers with proper IDs.
 */
document.addEventListener("DOMContentLoaded", () => {
  const aid = sessionStorage.getItem("applicant_id");
  if (!aid) return console.error("No applicant ID found in sessionStorage.");

  // Base API URL
  const API_BASE = "https://jellyfish-app-z83s2.ondigitalocean.app/api/candidate";

  // Utility: Safe element selector
  const $ = (id) => document.getElementById(id);

  // Utility: Fetch wrapper with error handling
  const fetchData = async (endpoint) => {
    try {
      const res = await fetch(`${API_BASE}/${endpoint}/${aid}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`❌ Error fetching ${endpoint}:`, err);
      return null;
    }
  };

  // Utility: Create pill element
  const createPill = (text, color = "blue") => {
    const pill = document.createElement("span");
    pill.textContent = text;
    pill.className = `inline-block bg-${color}-100 text-${color}-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full`;
    return pill;
  };

  // Utility: Graceful fallback
  const fallback = (container, message) => {
    container.innerHTML = `<p class="text-gray-500 italic">${message}</p>`;
  };

  (async () => {
    /** PERSONAL INFO **/
    const personalData = await fetchData("personalInfo");
    if (personalData) {
      personalData.full_name = `${personalData.first_name || ""} ${personalData.last_name || ""}`.trim();
      Object.keys(personalData).forEach((key) => {
        document.querySelectorAll(`[data-field="${key}"]`).forEach(
          (el) => (el.textContent = personalData[key] || "—")
        );
      });
    }

    /** EXPERIENCE **/
    const expData = await fetchData("myExperience");
    const expContainer = $("experienceContainer");
    if (expContainer) {
      expContainer.innerHTML = "";
      if (!expData || expData.length === 0) return fallback(expContainer, "No work experience found.");

      expData.forEach((exp) => {
        const div = document.createElement("div");
        div.className = "border-l-4 border-green-600 pl-4";
        div.innerHTML = `
          <h3 class="text-lg font-semibold text-gray-800">${exp.title} - ${exp.organization}</h3>
          <p class="text-gray-500 text-sm">${new Date(exp.start_date).getFullYear()} - ${
          exp.end_date ? new Date(exp.end_date).getFullYear() : "Present"
        }</p>
          <p class="text-gray-600 mt-2">${exp.description || ""}</p>`;
        expContainer.appendChild(div);
      });
    }

    /** EDUCATION **/
    const eduData = await fetchData("myEducation");
    const eduContainer = $("educationContainer");
    if (eduContainer) {
      eduContainer.innerHTML = "";
      if (!eduData || eduData.length === 0) return fallback(eduContainer, "No education history found.");
      eduData.forEach((edu) => {
        const li = document.createElement("li");
        li.className = "border rounded-lg p-4 bg-gray-50";
        li.innerHTML = `
          <p class="font-medium text-gray-800">${edu.qualification}</p>
          <p class="text-gray-500 text-sm">${edu.institution} (${edu.year_completed})</p>`;
        eduContainer.appendChild(li);
      });
    }

    /** SKILLS **/
    const skillsData = await fetchData("mySkills");
    const skillsContainer = $("skillsContainer");
    if (skillsContainer) {
      skillsContainer.innerHTML = "";
      if (!skillsData?.skills?.length) return fallback(skillsContainer, "No skills added.");
      skillsData.skills.forEach((skill) => skillsContainer.appendChild(createPill(skill, "blue")));
    }

    /** PROFILE IMAGE **/
    const imgData = await fetchData("profileImage");
    if (imgData?.length > 0) {
      const imageUrl = imgData[0].image;
      document.querySelectorAll("[data-profile-image]").forEach((img) => {
        img.src = imageUrl;
        img.alt = "Profile Image";
        img.onerror = () => (img.src = "https://via.placeholder.com/150");
      });
    }

    /** LANGUAGES **/
    const langData = await fetchData("myLanguages");
    const langContainer = $("languagesContainer");
    if (langContainer) {
      langContainer.innerHTML = "";
      if (!langData?.length) return fallback(langContainer, "No languages added.");
      langData.forEach((l) => l.language && langContainer.appendChild(createPill(l.language, "green")));
    }

    /** STATUS **/
    const statusData = await fetchData("activeStatus");
    const statusContainer = $("statusContainer");
    if (statusContainer) {
      statusContainer.innerHTML = "";
      if (!statusData?.is_active) return fallback(statusContainer, "No status available.");
      const badge = document.createElement("span");
      badge.textContent = statusData.is_active;
      badge.className = `px-3 py-1 rounded-full font-semibold inline-block ${
        statusData.is_active.toLowerCase().includes("active")
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`;
      statusContainer.appendChild(badge);
    }

    /** REFERENCES **/
    const refData = await fetchData("myReferences");
    const refContainer = $("referencesContainer");
    if (refContainer) {
      refContainer.innerHTML = "";
      const { referenceNames, roles, companies, contactEmails, contactNumbers, descriptions } = refData || {};
      if (!referenceNames || referenceNames.length === 0)
        return fallback(refContainer, "No references available.");

      referenceNames.forEach((name, i) => {
        const div = document.createElement("div");
        div.className = "border rounded-lg p-4 bg-gray-50 mb-2";
        div.innerHTML = `
          <p class="font-medium text-gray-800">${name}</p>
          <p class="text-gray-500 text-sm">${roles?.[i] || ""} at ${companies?.[i] || ""}</p>
          <p class="text-gray-600">Email: ${contactEmails?.[i] || "—"}</p>
          <p class="text-gray-600">Phone: ${contactNumbers?.[i] || "—"}</p>
          <p class="text-gray-600 mt-1">${descriptions?.[i] || ""}</p>`;
        refContainer.appendChild(div);
      });
    }
  })();
});
