import { DATA_CONTAINER, SIDE_NAV_BAR_EXPENDED } from "../actionTypes/types";
export const sideNavBarExpended = (styling) => (dispatch) => {
  dispatch({
    type: SIDE_NAV_BAR_EXPENDED,
    payload: styling,
  });
};
export const dataContainer = (styling) => (dispatch) => {
  dispatch({
    type: DATA_CONTAINER,
    payload: styling,
  });
};
