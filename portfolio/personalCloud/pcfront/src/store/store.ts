import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";
import mainModalReducer from "./features/mainModalSlice";
import boxModalReducer from "./features/boxModalSlice";

export const store = configureStore({
  reducer: {
    loginChecker: loginReducer,
    mainModalOpenChecker: mainModalReducer,
    boxModalOpenChecker: boxModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
