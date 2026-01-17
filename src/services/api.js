const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3200/api";

export const api = {
  // Get landing page public data (carousel, hero, etc.)
  async getLandingPageData() {
    const response = await fetch(`${API_BASE_URL}/landing-page/public`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch landing page data");
    }

    return data;
  },
  // Submit email to waitlist
  async submitWaitlistEmail(email) {
    const response = await fetch(`${API_BASE_URL}/landing-page/public/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, source: "landing_page" }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit email");
    }

    return data;
  },

  // Submit contact form
  async submitContactForm({ firstName, lastName, email, message }) {
    const response = await fetch(`${API_BASE_URL}/landing-page/public/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit message");
    }

    return data;
  },

  // Get waitlist count (for social proof)
  async getWaitlistCount() {
    const response = await fetch(`${API_BASE_URL}/landing-page/public/waitlist-count`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get waitlist count");
    }

    return data;
  },
};

export default api;
