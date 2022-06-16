import { loginFailure, loginStart, loginSuccess, logOut } from "./userRedux";
import { publicRequest } from "../pages/requestMethods";
import { toast } from "react-toastify";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    toast.success("You are successfuly logged in", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
    window.location.href = "/synch";
  } catch (err) {
    dispatch(loginFailure());
    toast.error("Wrong email or password", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
    window.location.reload();
  }
};

export const logout = (dispatch, user) => {
  dispatch(logOut());
  user = null;
  toast.success("You are successfuly logged out", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1500,
  });
};
