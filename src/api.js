import axios from "axios";

// Set the base URL for the API. You can use an environment variable or a default.
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class
 * 
 * Centralized methods to interact with the Jobly backend API.
 * 
 * No component should directly call the API. Instead, components will
 * call methods in this class.
 */
class JoblyApi {
  // The token for interacting with the API will be stored here.
  static token;

  /** General API request method.
   * 
   * This method handles API calls to the backend.
   * 
   * @param {string} endpoint - API endpoint (e.g. "companies", "jobs")
   * @param {object} data - Any data to be sent with the request
   * @param {string} method - The HTTP method to use (e.g. "get", "post", "patch")
   * 
   * @returns {Promise} - The API response data
   */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // Construct the full API URL
    const url = `${BASE_URL}/${endpoint}`;
    
    // Set up headers, including the authorization token if it exists
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    
    // If it's a GET request, data will be sent as params in the URL
    const params = (method === "get") ? data : {};

    try {
      // Make the API call using axios and return the data
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get details on a company by handle (e.g., "apple", "google") */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of all companies with optional filter parameters */
  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;  // This will return the list of companies from the response
  }

  /** Get a list of all jobs */
  static async getJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  /** Log in a user and return the token */
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Register a user and return the token */
  static async register(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Get the current user by username */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update the current user's profile */
  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Save the current token */
  static saveToken(token) {
    JoblyApi.token = token;
  }

  /** Apply to a job */
  static async applyToJob(jobId) {
    let res = await this.request(`jobs/${jobId}/apply`, {}, "post");
    return res;
  }
}

// For now, put a test token for 'testuser' on the class (you'll replace this later)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
