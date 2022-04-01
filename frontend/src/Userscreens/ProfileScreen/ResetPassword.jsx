import React, { useState, useEffect } from "react";
import "./Screens.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      history.push("/users/landing");
    }
  }, [dispatch, error, alert, history, success]);

  return (
    <MainScreen>
      {loading ? (
        <Loading />
      ) : (
        <MainScreen title="Change Password">
          <div className="Container">
            <div className="Box">
              <h2 className="Heading">Update password</h2>

              <form className="Form" onSubmit={resetPasswordSubmit}>
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Update" className="Btn" />
              </form>
            </div>
          </div>
        </MainScreen>
      )}
    </MainScreen>
  );
};

export default ResetPassword;
