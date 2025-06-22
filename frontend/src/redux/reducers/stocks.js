import { toast } from "react-toastify";
import {
  ADD_ITEM,
  GET_ALL_ITEMS,
  GET_ONE_ITEM,
  LOADING,
  EDIT_ITEM,
  ADD_FORM_POPUP,
  DELETE_ITEM,
  EDIT_FORM_POPUP,
} from "../actionTypes/types";
const initialState = {
  stockItems: [],
  singleStockDetails: {},
  isloading: false,
  isEditPopperOpen: { isPopperOpen: false, id: "" },
  isAddPopperOpen: false,
  toastMessage: { show: false },
};
const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      const { success: successAddItem, item } = payload;
      if (successAddItem === true) {
        toast.success("Item Added Successfully", {
          hideProgressBar: true,
          closeOnClick: true,
        });
        const { stockItems } = state;
        const copyOfStockItems = [...stockItems, item];
        return {
          ...state,
          stockItems: copyOfStockItems,
        };
      } else {
        toast.error("Error Occured");
        return;
      }
    case GET_ALL_ITEMS:
      const { success: successGetAllItem } = payload;
      if (successGetAllItem === true) {
        const { allProducts } = payload;
        return { ...state, stockItems: allProducts };
      } else {
        toast.error("Error Occured");
        return;
      }
    case GET_ONE_ITEM:
      const { oneProduct, success: successGetOneItem } = payload;
      if (successGetOneItem === true) {
        return { ...state, singleStockDetails: oneProduct };
      } else {
        toast.error("Error Occured");
        return;
      }
    case EDIT_ITEM:
      const { success: successEditItem } = payload;
      if (successEditItem === true) {
        toast.success("Updated Successfully", {
          hideProgressBar: true,
          closeOnClick: true,
        });
        const { updatedData } = payload;
        const { _id: id } = updatedData;
        const dataUpdated = state.stockItems.map((item) => {
          const { _id: itemId } = item;
          if (itemId === id) {
            return {
              ...updatedData,
            };
          } else {
            return item;
          }
        });
        return {
          ...state,
          stockItems: dataUpdated,
        };
      } else {
        toast.error("Error Occured");
        return;
      }
    case DELETE_ITEM:
      const { success: successDeleteItem, id } = payload;
      if (successDeleteItem === true) {
        toast.success("Deleted Successfully", {
          hideProgressBar: true,
          closeOnClick: true,
        });
        const newData = state.stockItems.filter(
          (element) => element._id !== id
        );
        return {
          ...state,
          stockItems: newData,
        };
      } else {
        toast.error("Error Occured");
        return;
      }

    case LOADING:
      return { ...state, isloading: payload };
    case EDIT_FORM_POPUP:
      return { ...state, isEditPopperOpen: payload };
    case ADD_FORM_POPUP:
      return { ...state, isAddPopperOpen: payload };

    default:
      return state;
  }
};
export default itemReducer;
