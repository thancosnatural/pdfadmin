import Cookies from 'js-cookie';

// Functions for handling user data
export const setUserData = (userData) => {
    Cookies.set('revisitAgainUserData', JSON.stringify(userData), { expires: 3650 }); // 10 years (3650 days)
};

export const getUserData = () => {
    const userDataString = Cookies.get('revisitAgainUserData');
    return userDataString ? JSON.parse(userDataString) : null;
};

export const clearUserData = () => {
    Cookies.remove('revisitAgainUserData');
};

// Functions for handling tokens
export const setToken = (token) => {
    Cookies.set('revisitAgainUserToken', token, { expires: 3650 }); // 10 years (3650 days)
};

export const getToken = () => {
    return Cookies.get('revisitAgainUserToken');
};

export const removeToken = () => {
    Cookies.remove('revisitAgainUserToken');
};

export const setProfileBg = (color) => {
    Cookies.set('revisitAgainProfileBg', color, { expires: 3650 }); // 10 years (3650 days)
};