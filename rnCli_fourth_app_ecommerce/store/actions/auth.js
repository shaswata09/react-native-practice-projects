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
            console.log(resData);

            if (!response.ok) {
                throw new Error("Error occured! response code :" + response.status);
            }

            dispatch({
                type: SIGNUP
            })
        } catch (error) {
            console.log(error)
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
            console.log(resData);

            if (!response.ok) {
                throw new Error("Error occured! response code :" + response.status);
            }

            dispatch({
                type: LOGIN
            })
        } catch (error) {
            console.log(error)
        }
    }
};