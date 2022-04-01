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
  NEW_PINS_RESET,
  UPDATE_PINS_REQUEST,
  UPDATE_PINS_SUCCESS,
  UPDATE_PINS_FAIL,
  UPDATE_PINS_RESET,
  DELETE_PINS_REQUEST,
  DELETE_PINS_SUCCESS,
  DELETE_PINS_FAIL,
  DELETE_PINS_RESET,
  PINS_DETAILS_REQUEST,
  PINS_DETAILS_FAIL,
  PINS_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/pinsConstants";

export const pinsReducer = (state = { pins: [] }, action) => {
  switch (action.type) {
    case ALL_PINS_REQUEST:
    case ADMIN_PINS_REQUEST:
      return {
        loading: true,
        pins: [],
      };
    case ALL_PINS_SUCCESS:
      return {
        loading: false,
        pins: action.payload.pins,
        pinsCount: action.payload.pinsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredPinsCount: action.payload.filteredPinsCount,
      };

    case ADMIN_PINS_SUCCESS:
      return {
        loading: false,
        pins: action.payload,
      };
    case ALL_PINS_FAIL:
    case ADMIN_PINS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newPinReducer = (state = { pin: {} }, action) => {
  switch (action.type) {
    case NEW_PINS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PINS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        pin: action.payload.pin,
      };
    case NEW_PINS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PINS_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const pinReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PINS_REQUEST:
    case UPDATE_PINS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PINS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PINS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PINS_FAIL:
    case UPDATE_PINS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PINS_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PINS_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const pinDetailsReducer = (state = { pin: {} }, action) => {
  switch (action.type) {
    case PINS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PINS_DETAILS_SUCCESS:
      return {
        loading: false,
        pin: action.payload,
      };
    case PINS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const pinReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
