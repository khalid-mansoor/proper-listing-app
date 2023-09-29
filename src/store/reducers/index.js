import { combineReducers } from "redux";
import propertyReducer from "./propertyReducer";

export const appReducer = combineReducers({
  properties: propertyReducer,
});

export default appReducer;
