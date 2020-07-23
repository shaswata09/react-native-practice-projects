export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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

            if (!response.ok) {
                const errorID = resData.error.errors[0].message;
                let message = "Error Response : "+ errorID;
                if (errorID === "EMAIL_EXISTS") {
                    message = "Email already registered.";
                }
                throw new Error(message);
            }

            dispatch({
                type: SIGNUP
            })
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

            if (!response.ok) {
                const errorID = resData.error.errors[0].message;
                let message = "Oops! Something went wrong!";
                if (errorID === "EMAIL_NOT_FOUND") {
                    message = "Email not registered.";
                } else if (errorID === "INVALID_PASSWORD" ) {
                    message = "Incorrect password.";
                } else if (errorID === "USER_DISABLED" ) {
                    message = "User disabled.";
                }
                throw new Error(message);
            }

            dispatch({
                type: LOGIN
            })
        } catch (err) {
            throw err;
        }
    }
};