import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedReducer from "../rootReducer"; // Adjust path to your rootReducer

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

// Named exports
export { store, persistor };
