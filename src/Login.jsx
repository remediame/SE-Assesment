import { Link } from "react-router";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Toast, ToastContainer, Spinner } from "react-bootstrap";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setToastMessage("Login error: " + error.message);
      setIsError(true);
    } else if (data && data.user) {
      setToastMessage("Login successful!");
      setIsError(false);
      sessionStorage.setItem("user_id", data.user.id);
      setTimeout(() => navigate("/home"), 1000);
    } else {
      setToastMessage("No user data returned from Supabase");
      setIsError(true);
    }
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <h4 className="text-center">Log In</h4>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <button className="submit-btn" role="submit">
                  {" "}
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <span>Login</span>
                  )}
                </button>
                <p className="mt-3">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
