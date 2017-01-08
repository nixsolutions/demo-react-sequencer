import { take, call, put, fork, cancel } from 'redux-saga/effects';
// import { LOGIN_START, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from 'modules/login';


// function* authorizeUser(user, password) {
//     try {
//         const data = yield call(authorize, user, password);
//         yield put({ type: LOGIN_SUCCESS, payload: data });
//         yield call(storeToken, data);
//     } catch (e) {
//         yield put({ type: LOGIN_FAIL, payload: e });
//     }
// }

export default function* playKey() {
    // while (true) {
    //     const { payload } = yield take(LOGIN_START);
    //     const { name, password } = payload;
    //
    //     const authorizeTask = yield fork(authorizeUser, name, password);
    //
    //     const { type } = yield take([LOGOUT, LOGIN_FAIL]);
    //
    //     yield call(clearToken);
    //
    //     if (type === LOGOUT) {
    //         yield cancel(authorizeTask);
    //     }
    // }
}
