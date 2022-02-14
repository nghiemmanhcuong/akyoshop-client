import {SET_AUTH,GET_CART} from '../constants';

const authReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                user: payload.user,
                isAuthenticated: payload.isAuthenticated,
            };
        default:
            return state;
    }
};

export default authReducer;
