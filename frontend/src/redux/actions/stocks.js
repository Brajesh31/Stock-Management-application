import axios from "axios";
import {
  ADD_ITEM,
  GET_ALL_ITEMS,
  GET_ONE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  LOADING,
  EDIT_FORM_POPUP,
  ADD_FORM_POPUP,
} from "../actionTypes/types";
import { toast } from "react-toastify";
export const addItem = (data) => async (dispatch) => {
  try {
    const addedItem = await axios.post(
      "http://localhost:5000/api/stock/additem",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: ADD_ITEM,
      payload: addedItem.data,
    });
  } catch (err) {
    const { message } = err.response.data;
    if (message === "No token provided" || message === "Session Time Out") {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: setTimeout(() => {
          sessionStorage.removeItem("token");
          window.location.reload();
        }, 1000),
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    return err;
  }
};
export const getAllItem = () => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    let allItems = await axios.get("http://localhost:5000/api/stock/allItem", {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    dispatch({
      type: GET_ALL_ITEMS,
      payload: allItems.data,
    });
    dispatch(isLoading(false));
  } catch (err) {
    const { message } = err.response.data;
    if (message === "No token provided" || message === "Session Time Out") {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: setTimeout(() => {
          sessionStorage.removeItem("token");
          window.location.reload();
        }, 1000),
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return err;
  }
};
export const getOneItem = (id) => async (dispatch) => {
  try {
    const oneItem = await axios.get(
      `http://localhost:5000/api/stock/getOneItem/${id}`,
      {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: GET_ONE_ITEM,
      payload: oneItem.data,
    });
  } catch (err) {
    const { message } = err.response.data;
    if (message === "No token provided" || message === "Session Time Out") {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: setTimeout(() => {
          sessionStorage.removeItem("token");
          window.location.reload();
        }, 1000),
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
};
export const editItem = (id, data) => async (dispatch) => {
  try {
    let updatedItem = await axios.put(
      `http://localhost:5000/api/stock/modifyItem/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: EDIT_ITEM,
      payload: updatedItem.data,
    });

    return updatedItem;
  } catch (err) {
    const { message } = err.response.data;
    if (message === "No token provided" || message === "Session Time Out") {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: setTimeout(() => {
          sessionStorage.removeItem("token");
          window.location.reload();
        }, 1000),
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return err;
  }
};
export const deleteItem = (id) => async (dispatch) => {
  try {
    const deletedItemData = await axios.delete(
      `http://localhost:5000/api/stock/deleteItem/${id}`,
      {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: DELETE_ITEM,
      payload: deletedItemData.data,
    });
    return deletedItemData;
  } catch (err) {
    const { message } = err.response.data;
    if (message === "No token provided" || message === "Session Time Out") {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: setTimeout(() => {
          sessionStorage.removeItem("token");
          window.location.reload();
        }, 1000),
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(message, {
        toastId: "error1",
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return err;
  }
};
export const isLoading = (data) => ({
  type: LOADING,
  payload: data,
});
export const editFormPopUp = (data, id) => ({
  type: EDIT_FORM_POPUP,
  payload: { isPopperOpen: data, id: id },
});
export const addFormPopUp = (data) => ({
  type: ADD_FORM_POPUP,
  payload: data,
});
