const API_URL = 'http://localhost:5000/api';

// ... autres fonctions existantes ...

export const fetchJobItems = async (jobName, level) => {
  const response = await fetch(`${API_URL}/jobs/${jobName}/items?level=${level}`);
  return response.json();
};

export const recordJobActivity = async (jobId, activity) => {
  const response = await fetch(`${API_URL}/jobs/${jobId}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });
  return response.json();
};</content>