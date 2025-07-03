import apiClient from "../utils/api";

// Function to fetch a single user by ID
export const addFlavourSuggestion = async (data) => {
    return await apiClient.post(`/flavour-suggestion`, data);
};

