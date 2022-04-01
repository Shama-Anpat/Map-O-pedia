import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_UPDATE_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
} from "../constants/adminConstants";
import axios from "axios";

export const adminlogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/admin/login",
      { email, password },
      config
    );

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminlogout = () => async (dispatch) => {
  localStorage.removeItem("adminInfo");
  dispatch({ type: ADMIN_LOGOUT });
};

export const adminregister =
  (firstName, lastName, email, password, pic, proof) => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/admin/register",
        { firstName, lastName, email, password, pic, proof },
        config
      );

      dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });

      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("adminInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ADMIN_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const adminupdateProfile = (admin) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_UPDATE_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/admin/profile", admin, config);

    dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: data });

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
