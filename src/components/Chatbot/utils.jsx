/**
 * Detects image links in a given text.
 * @param {string} text - The text to analyze for image links.
 * @returns {Array} - An array of detected image links.
 */
export const detectImageLinks = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+(?:\.png|\.jpg|\.jpeg|\.gif))/gi;
    return text.match(urlPattern) || [];
  };
  
  /**
   * Processes the backend response to separate text and image links.
   * @param {string} response - The raw response from the backend.
   * @returns {Object} - An object with text and image links.
   */
  export const processResponse = (response) => {
    const imageLinks = detectImageLinks(response);
    const text = response.replace(imageLinks.join(" "), "").trim(); // Remove image links from the text.
    return { text, imageLinks };
  };
  