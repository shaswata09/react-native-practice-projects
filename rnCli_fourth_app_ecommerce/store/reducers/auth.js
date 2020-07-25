import { AUTHENTICATE } from '../actions/auth';

const initialState = {
    token: null,
    userID: null,
    isAuthToken: false,
    isTouched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
                ...state,
                token: action.token,
                userID: action.userID,
                isAuthToken: true,
                isTouched: true,
        // case LOGIN:
        //     return {
        //         ...state,
        //         token: action.token,
        //         userID: action.userID,
        //         isAuthToken: action.isAuthToken,
        //         isTouched: action.isTouched,
        //     }
            }
        }
    }
    return state;
}