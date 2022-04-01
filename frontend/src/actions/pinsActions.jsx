import axios from "axios";
import {
  ALL_PINS_FAIL,
  ALL_PINS_REQUEST,
  ALL_PINS_SUCCESS,
  ADMIN_PINS_REQUEST,
  ADMIN_PINS_SUCCESS,
  ADMIN_PINS_FAIL,
  NEW_PINS_REQUEST,
  NEW_PINS_SUCCESS,
  NEW_PINS_FAIL,
  UPDATE_PINS_REQUEST,
  UPDATE_PINS_SUCCESS,
  UPDATE_PINS_FAIL,
  DELETE_PINS_REQUEST,
  DELETE_PINS_SUCCESS,
  DELETE_PINS_FAIL,
  PINS_DETAILS_REQUEST,
  PINS_DETAILS_FAIL,
  PINS_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/pinsConstants";

// Get All pins
export const getPin =
  () =>
  // (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PINS_REQUEST });

      // let link = `/api/pins/pins?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      // if (category) {
      //   link = `/api/pins/pins?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      // }

      const { data } = await axios.get("/api/pins/pins");

      dispatch({
        type: ALL_PINS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PINS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Pins For Admin/SuperAdmin
export const getAdminPin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PINS_REQUEST });

    const { data } = await axios.get("/api/pins/admin/pins");

    dispatch({
      type: ADMIN_PINS_SUCCESS,
      payload: data.pins,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PINS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Pin
export const createPin = (pinData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PINS_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/pins/admin/create/new`,
      pinData,
      config
    );

    dispatch({
      type: NEW_PINS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PINS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Pin
export const updatePin = (id, pinData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PINS_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/pins/admin/pin/${id}`,
      pinData,
      config
    );

    dispatch({
      type: UPDATE_PINS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PINS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Pin
export const deletePin = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PINS_REQUEST });

    const { data } = await axios.delete(`/api/pins/admin/pin/${id}`);

    dispatch({
      type: DELETE_PINS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PINS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Pin Details
export const getPinDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PINS_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/pins/pindetails/${id}`);

    dispatch({
      type: PINS_DETAILS_SUCCESS,
      payload: data.pin,
    });
  } catch (error) {
    dispatch({
      type: PINS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/pins/review/new`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Pins
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/pins/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Pin
export const deleteReviews = (reviewId, pinId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/pins/reviews?id=${reviewId}&pinId=${pinId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
