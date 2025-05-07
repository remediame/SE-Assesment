import { Link } from "react-router";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Toast, ToastContainer, Spinner } from "react-bootstrap";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSignUp = async () => {
    if (password !== repeatPassword) {
      setToastMessage("Passwords do not match");
      setIsError(true);
      setShowToast(true);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setToastMessage("Sign-up error: " + error.message);
      setIsError(true);
    } else if (
      data.user.aud === "authenticated" &&
      data.user.user_metadata.email_verified === false
    ) {
      setToastMessage(
        "Registration successful! Check your email for verification."
      );
      setIsError(false);
      // sessionStorage.setItem("user_id", data.user.id);
      // setTimeout(handleClose(), 4000);
      // handleClose();
    } else {
      setToastMessage("Error from Supabase");
      setIsError(true);
    }
    console.log(data);
    setLoading(false);
    setShowToast(true);
  };
  return (
    <div className="container-fluid">
      <ToastContainer position="top-right" className="p-3">
        <Toast
          bg={isError ? "danger" : "success"}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="row">
        <div className="col-5">
          <div className="auth-image"></div>
        </div>
        <div className="col-7 m-auto">
          <div className="container">
            <h4 className="fw-bold text-purple text-center display-5">
              Ohiremen
            </h4>
            <div className="d-flex justify-content-center my-4">
              <form>
                <h4 className="text-center">Register</h4>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="auth-input"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
                <button className="submit-btn">
                  {" "}
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <span>Register</span>
                  )}
                </button>
                <p className="mt-3">
                  Already registered? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
