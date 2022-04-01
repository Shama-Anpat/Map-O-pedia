import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    noteCreateReducer,
    noteDeleteReducer,
    noteListReducer,
    noteUpdateReducer,
} from "./reducers/notesReducers";
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
} from "./reducers/userReducers";
// import {
//     adminLoginReducer,
//     adminRegisterReducer,
//     adminUpdateReducer,
// } from "./reducers/adminReducers";
import {
    newPinReducer,
    newReviewReducer,
    pinDetailsReducer,
    pinReducer,
    pinReviewsReducer,
    pinsReducer,
    reviewReducer,
} from "./reducers/pinsReducers";

const reducer = combineReducers({
    pins: pinsReducer,
    pinDetails: pinDetailsReducer,
    newReview: newReviewReducer,
    newPin: newPinReducer,
    pin: pinReducer,
    pinReviews: pinReviewsReducer,
    review: reviewReducer,
    noteList: noteListReducer,
    // adminLogin: adminLoginReducer,
    // adminRegister: adminRegisterReducer,
    user: userReducer,
    noteCreate: noteCreateReducer,
    noteDelete: noteDeleteReducer,
    noteUpdate: noteUpdateReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    userDetails: userDetailsReducer,
    allUsers: allUsersReducer,
    // adminUpdate: adminUpdateReducer,
});
// const adminInfoFromStorage = localStorage.getItem("adminInfo") ?
//     JSON.parse(localStorage.getItem("adminInfo")) :
//     null;

// const userInfoFromStorage = localStorage.getItem("userInfo") ?
//     JSON.parse(localStorage.getItem("userInfo")) :
//     null;

// const initialState = {
//     userLogin: { userInfo: userInfoFromStorage },
//     adminLogin: { adminInfo: adminInfoFromStorage },
// };

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;