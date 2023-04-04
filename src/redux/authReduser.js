import { api } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false
}

const authReduser = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };

        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login } })

export const checkAuthUser = () => {
    return (dispatch) => {
        api.checkAuthUser()
            .then(data => {
                if (data.resultCode === 0) {
                    let { userId, email, login } = data.data
                    dispatch(setAuthUserData(userId, email, login))
                }
            })
    }
}

export default authReduser;