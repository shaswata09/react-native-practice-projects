import { LOGIN, SIGNUP } from '../actions/auth';

const initialState = {
    token: null,
    userID: null,
    isAuthToken: false,
    isTouched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.token,
                userID: action.userID,
                isAuthToken: action.isAuthToken,
                isTouched: action.isTouched,
            }
        case SIGNUP: {
            return {
                ...state,
                token: action.token,
                userID: action.userID,
                isAuthToken: action.isAuthToken,
                isTouched: action.isTouched,
            }
        }
    }
    return state;
}