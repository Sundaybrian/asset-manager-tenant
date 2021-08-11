import {
    SET_ERRORS,
    SET_USER,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_SUCCESS,
    SET_UNAUTHENTICATED
} from "../types";
import axios from "axios";
import { db } from "../../utils/fb.config";

// login merchant
export const loginUser =
    (userData, history) =>
    (dispatch, getState, { getFirebase }) => {
        dispatch({ type: LOADING_UI });

        /* eslint-disable  no-unused-vars */
        const firebase = getFirebase();
        let token = "";
        let refreshToken = "";
        let userId = "";
        const { email, password } = userData;

        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                userId = data.user.uid;
                refreshToken = data.user.refreshToken;
                return data.user.getIdToken();
            })
            .then((_token) => {
                token = _token;

                return db.ref(`/admin/${userId}`).once("value");
            })
            .then((snapShot) => {
                const val = snapShot.val();

                const user = {
                    ...val,
                    user_id: userId,
                };

                setAuthorizationHeader(token);
                dispatch(setUserData(user));
                dispatch({
                    type: SET_SUCCESS,
                    payload: `welcome back ${user.first_name}`,
                });

                history.push("/dashboard");
            })
            .catch((error) => {
                console.log(`Admin Login Error`);
                dispatch({
                    type: SET_ERRORS,
                    payload: error,
                });
            });
    };

// merchant user
export const registerUser =
    (userData, history) =>
    (dispatch, getState, { getFirebase }) => {
        dispatch({ type: LOADING_UI });
        const firebase = getFirebase();

        const {
            email,
            password,
            phone_number,
            first_name,
            last_name,
            id_number,
            image_url,
            merchant_type,
        } = userData;

        let userId = "";
        let token = "";
        let refreshToken = "";

        // create user
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
                userId = data.user.uid;
                refreshToken = data.user.refreshToken;

                return data.user.getIdToken();
            })
            .then((_token) => {
                token = _token;

                return db.ref(`/merchants/${userId}`).set({
                    email,
                    user_Id: userId,
                    phone_number,
                    first_name,
                    last_name,
                    id_number,
                    user_type: "merchant",
                    createdAt: new Date().toISOString(),
                    is_merchant: true,
                    image_url,
                    merchant_type,
                });
            })
            .then((_) => {
                return db.ref(`/stores/${userId}`).set({
                    email,
                    owner_Id: userId,
                    store_name: first_name,
                    createdAt: new Date().toISOString(),
                    updateAt: new Date().toISOString(),
                });
            })
            .then((_) => {
                const user = {
                    user_Id: userId,
                    email,
                    password,
                    phone_number,
                    first_name,
                    last_name,
                    user_type: "merchant",
                    is_merchant: true,
                    id_number,
                    image_url,
                    merchant_type,
                };

                setAuthorizationHeader(token);

                dispatch(setUserData(user));
                dispatch({
                    type: SET_SUCCESS,
                    payload: `${email} account created successfully`,
                });
                dispatch({ type: CLEAR_ERRORS });
                history.push("/dashboard");
            })
            .catch((error) => {
                console.log(`Merchant Error`);
                return dispatch({
                    type: SET_ERRORS,
                    payload: error,
                });
            });
    };

// update user details
export const updateUserProfile =
    (userId, userData) =>
    (dispatch, getState, { getFirebase }) => {
        dispatch({ type: LOADING_UI });

        db.ref(`/merchants/${userId}`)
            .update(userData)
            .then((res) => {
                dispatch({
                    type: SET_SUCCESS,
                    payload: `Account updated successfully`,
                });
                dispatch({ type: CLEAR_ERRORS });
            })
            .catch((err) => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err,
                });
            });
    };

export const registerCompany = (companyData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post("/company", companyData)
        .then((res) => {
            // dispatch({ type: SET_COMPANY_DATA, payload: res.data });
            dispatch({
                type: SET_SUCCESS,
                payload: `${companyData.name} created successfully`,
            });
            dispatch({ type: CLEAR_ERRORS });
            // fetching industries on redirecting to jobs page
            history.push("/dashboard");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

// utils
const setUserData = (user) => ({
    type: SET_USER,
    payload: user,
});

const setAuthorizationHeader = (token) => {
    const _token = `Bearer ${token}`;
    localStorage.setItem("token", _token);
    axios.defaults.headers.common["Authorization"] = _token;
};

export const logoutUser = () => (dispatch) => {
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
    window.location.href = "/";
};
