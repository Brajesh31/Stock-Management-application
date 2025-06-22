import { combineReducers } from "redux";
import stocksReducer from "./stocks";
import navbar from "./navbar";
const reducers = combineReducers({
  items: stocksReducer,
  navBar: navbar,
});
export default reducers;
