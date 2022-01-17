import {
  PINS_UPDATE_REQUEST,
  PINS_UPDATE_SUCCESS,
  PINS_UPDATE_FAIL,
  PINS_CREATE_FAIL,
  PINS_CREATE_REQUEST,
  PINS_CREATE_SUCCESS,
  PINS_DELETE_FAIL,
  PINS_DELETE_REQUEST,
  PINS_DELETE_SUCCESS,
  PINS_LIST_FAIL,
  PINS_LIST_REQUEST,
  PINS_LIST_SUCCESS,
} from "../constants/pinsConstants";

export const pinListReducer = (state = { pins: [] }, action) => {
  switch (action.type) {
    case PINS_LIST_REQUEST:
      return { loading: true };
    case PINS_LIST_SUCCESS:
      return { loading: false, pins: action.payload };
    case PINS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const pinCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PINS_CREATE_REQUEST:
      return { loading: true };
    case PINS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PINS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const pinDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PINS_DELETE_REQUEST:
      return { loading: true };
    case PINS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PINS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const pinUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PINS_UPDATE_REQUEST:
      return { loading: true };
    case PINS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PINS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
