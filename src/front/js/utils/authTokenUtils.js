/**
 * Utility functions for managing JWT tokens in the LocalStorage.
 * Created by AbreuY.
 */

/**
 * Stores the token in the LocalStorage.
 * @param {string} token - The JWT token to store.
 */
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Retrieves the token from the LocalStorage.
 * @returns {string|null} The stored JWT token or null if not found.
 */
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * Removes the token from the LocalStorage.
 */
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

/**
 * Checks if the user has a valid token.
 * @returns {boolean} true if the user has a valid token, otherwise false.
 */
export const hasValidToken = () => {
  const token = localStorage.getItem('token');
  // Check if the token exists and is valid
  return token ?? false;
};