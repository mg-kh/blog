/**
 *   ! Methods
 *  ! [set , get , remove , clear] LocalStorageToken
 */

const setLocalStorageToken = (token) => {
	window.localStorage.setItem("TOKEN", token);
};

const getLocalStorageToken = (token) => {
	return window.localStorage.getItem("TOKEN");
};

const removeLocalStorageToken = (token) => {
	window.localStorage.removeItem("TOKEN");
};

const clearLocalStorageToken = (token) => {
	window.localStorage.clear();
};

export {
	setLocalStorageToken,
	getLocalStorageToken,
	removeLocalStorageToken,
	clearLocalStorageToken,
};
