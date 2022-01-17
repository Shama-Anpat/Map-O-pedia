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
    userLoginReducer,
    userRegisterReducer,
    userUpdateReducer,
} from "./reducers/userReducers";
import {
    pinCreateReducer,
    pinListReducer,
    pinDeleteReducer,
    pinUpdateReducer,
} from "./reducers/pinsReducers";

const reducer = combineReducers({
    pinList: pinListReducer,
    noteList: noteListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    noteCreate: noteCreateReducer,
    pinCreate: pinCreateReducer,
    noteDelete: noteDeleteReducer,
    pinDelete: pinDeleteReducer,
    noteUpdate: noteUpdateReducer,
    pinUpdate: pinUpdateReducer,
    userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) :
    null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;