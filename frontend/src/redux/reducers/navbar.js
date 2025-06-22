import { SIDE_NAV_BAR_EXPENDED, DATA_CONTAINER } from "../actionTypes/types";
const initialState = {
  dataContainerGrid: { gridColumn: "2/7" },
  sideNavBarExpended: false,
};
const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIDE_NAV_BAR_EXPENDED:
      return { ...state, sideNavBarExpended: payload };
    case DATA_CONTAINER:
      return { ...state, dataContainerGrid: payload };
    default:
      return state;
  }
};
export default itemReducer;
