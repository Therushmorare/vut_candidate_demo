// jobData.js
export const JobAPI = (() => {
  const jobCache = {};

  async function fetchJob(jobId) {
    if (jobCache[jobId]) return jobCache[jobId];

    try {
      const res = await fetch(`https://jellyfish-app-z83s2.ondigitalocean.app/api/candidate/viewPost/${jobId}`);
      if (!res.ok) throw new Error("Failed to fetch job data");
      const data = await res.json();
      jobCache[jobId] = data;
      return data;
    } catch (err) {
      console.error("Error fetching job:", err);
      throw err;
    }
  }

  function getCachedJob(jobId) {
    return jobCache[jobId] || null;
  }

  return {
    fetchJob,
    getCachedJob,
  };
})();