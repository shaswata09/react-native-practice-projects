import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userID, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            userID: userID,
            token: token
        });
    };
};

export const signUp = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCgqfwKgTkr53RcD-hAoOf0hBC2m3sXsM',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true,
                    })
                }
            );

            const resData = await response.json();
            // console.log(resData);

            if (!response.ok) {
                const errorID = resData.error.errors[0].message;
                let message = "Error Response : " + errorID;
                if (errorID === "EMAIL_EXISTS") {
                    message = "Email already registered.";
                }
                throw new Error(message);
            }

            dispatch(authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            ));
            const expirationTime = new Date(
                new Date().getTime() + parseInt(resData.expiresIn) * 1000
            );
            saveDataToStorage(resData.idToken, resData.localId, expirationTime);
        } catch (err) {
            throw err;
        }
    }
};

export const logIn = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCgqfwKgTkr53RcD-hAoOf0hBC2m3sXsM',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true,
                    })
                }
            );

            const resData = await response.json();
            // console.log(resData);

            if (!response.ok) {
                const errorID = resData.error.errors[0].message;
                let message = "Oops! Something went wrong!";
                if (errorID === "EMAIL_NOT_FOUND") {
                    message = "Email not registered.";
                } else if (errorID === "INVALID_PASSWORD") {
                    message = "Incorrect password.";
                } else if (errorID === "USER_DISABLED") {
                    message = "User disabled.";
                }
                throw new Error(message);
            }

            dispatch(authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            ));
            const expirationTime = new Date(
                new Date().getTime() + parseInt(resData.expiresIn) * 1000
            );
            saveDataToStorage(resData.idToken, resData.localId, expirationTime);
        } catch (err) {
            throw err;
        }
    }
};

export const logOut = () => {
    removeDataFromStorage();
    clearLogoutTimer();
    return async dispatch => {
        dispatch({ type: LOGOUT, });
    }
}

const saveDataToStorage = (token, userID, expirationTime) => {
    AsyncStorage.setItem('userData', JSON.stringify(
        {
            token: token,
            userID: userID,
            expirationTime: expirationTime.toISOString(),
        }
    ));
};

const removeDataFromStorage = () => {
    AsyncStorage.removeItem('userData');
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = (expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logOut());
        }, expirationTime);
    };
};