import apiClient from "../utils/api";

// Function to fetch a single user by ID
export const addFranchiseEnquiry = async (data) => {
    return await apiClient.post(`/franchise-enquiry/`, data);
};

