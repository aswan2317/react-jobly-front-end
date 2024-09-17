// src/api.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class JoblyApi {
  // Get all jobs (optionally filtered by search term)
  static async getJobs(searchTerm = '') {
    const response = await axios.get(`${BASE_URL}/jobs`, {
      params: { title: searchTerm }
    });
    return response.data.jobs;
  }
}

export default JoblyApi;
