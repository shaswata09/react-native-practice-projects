import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
    token: null,
    userID: null,
    isAuthToken: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
                ...state,
                token: action.token,
                userID: action.userID,
                isAuthToken: true,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                token: null,
                userID: null,
                isAuthToken: false,
            }
        }
    }
    return state;
}