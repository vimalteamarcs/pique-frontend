import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Using localStorage for persistence
import venuSlice from "./slices/venueSlice";
import authSlice from "./slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist the auth slice
};

const rootReducer = combineReducers({
  auth: authSlice,
  venue: venuSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
