import { loginFailure, loginStart, loginSuccess, logOut } from "./userRedux";
import { publicRequest } from "../pages/requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    alert("You are successfuly logged in");
    window.location.href = "/synch";
  } catch (err) {
    dispatch(loginFailure());
    alert("Wrong email or password");
    window.location.reload();
  }
};

export const logout = (dispatch, user) => {
  dispatch(logOut());
  user = null;
  alert("You are successfuly logged out");
};
