import authApi from '../../api/authApi';
import authReducer from './authReducer';
import {createContext, useReducer,useEffect} from 'react';
import setAuthToken from '../../utils/setAuthToken';
import {LOCAL_STORE_ACCESS_TOKEN,SET_AUTH} from '../constants';

const INITIAL_STATE = {
    isAuthenticated: false,
    user: {},
    userCart: [],
};

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [authState, dispath] = useReducer(authReducer, INITIAL_STATE);

    const setLoginUser = async () => {
        try {
            const response = await authApi.setLoginAuth();
            if (response.success) {
                dispath({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORE_ACCESS_TOKEN);
            setAuthToken(null);
            dispath({
                type: SET_AUTH,
                payload: {isAuthenticated: false, user: null},
            });
        }
    };

    const loginUser = async (loginForm) => {
        try {
            const response = await authApi.loginUser(loginForm);
            if (response.success) {
                localStorage.setItem(
                    LOCAL_STORE_ACCESS_TOKEN,
                    JSON.stringify(response.accessToken),
                );
                return response;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : {success: false, message: 'Lỗi kết nối!'};
        }
    };

    const registerUser = async (registerForm) => {
        try {
            const response = await authApi.registerUser(registerForm);
            return response;
        } catch (error) {
            return error.response.data
                ? error.response.data
                : {success: false, message: 'Lỗi kết nối!'};
        }
    };

    useEffect(() => {
        if(localStorage.getItem(LOCAL_STORE_ACCESS_TOKEN)) {
            setLoginUser();
        }
    },[])

    const authData = {authState, registerUser, loginUser,setLoginUser};

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
