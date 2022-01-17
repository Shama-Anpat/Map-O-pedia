import {
  PINS_CREATE_REQUEST,
  PINS_CREATE_FAIL,
  PINS_CREATE_SUCCESS,
  PINS_DELETE_FAIL,
  PINS_DELETE_REQUEST,
  PINS_DELETE_SUCCESS,
  PINS_LIST_FAIL,
  PINS_LIST_REQUEST,
  PINS_LIST_SUCCESS,
  PINS_UPDATE_FAIL,
  PINS_UPDATE_REQUEST,
  PINS_UPDATE_SUCCESS,
} from "../constants/pinsConstants";
import axios from "axios";

export const listPins = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PINS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/pin`, config);

    dispatch({
      type: PINS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PINS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createPinAction =
  (title, desc, lat, long, type) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PINS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/pin/create`,
        { title, desc, lat, long, type },
        config
      );

      dispatch({
        type: PINS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PINS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deletePinAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PINS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/pin/${id}`, config);

    dispatch({
      type: PINS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PINS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updatePinAction =
  (id, title, desc, lat, long, type) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PINS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/pin/${id}`,
        { title, desc, lat, long, type },
        config
      );

      dispatch({
        type: PINS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PINS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
