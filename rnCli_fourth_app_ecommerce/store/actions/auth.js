export const SIGNUP = "SIGNUP";

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

            if (!response.ok) {
                throw new Error("Error occured! response code :" + response.status);
            }

            const resData = await response.json();

            console.log(resData);

            dispatch({
                type: SIGNUP
            })
        } catch (error) {
            console.log(error)
        }
    }
};