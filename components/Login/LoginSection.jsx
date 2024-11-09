import { React, useState, useEffect, useRef } from "react";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

function LoginSection(props) {
  const [showPassword, setShowPassword] = useState(false);

  const { loginDetails, handleChange, valid, login, setFgtPwTab } = props;
  const inputRef = useRef(null);

  return (
    <>
      <div className="col-lg-6 col-md-12 form-section">
        <div className="login-inner-form">
          <div className="details">
            <h1>Welcome!</h1>
            <h3>Sign Into Your Account</h3>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label
                    htmlFor="first_field"
                    className="form-label float-start"
                  >
                    Email address or User ID
                  </label>
                  <input
                    name="email"
                    type="email"
                    className={
                      valid.email === false
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="first_field"
                    placeholder="Email address or User ID"
                    aria-label="Email Address"
                    value={loginDetails.email}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        inputRef.current.click();
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group clearfix">
                  <label
                    htmlFor="second_field"
                    className="form-label float-start"
                  >
                    Password
                  </label>

                  <div className="eye_input_box">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={
                        valid.password === false
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      autoComplete="off"
                      id="second_field"
                      placeholder="Password"
                      aria-label="Password"
                      value={loginDetails.password}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          inputRef.current.click();
                        }
                      }}
                    />
                    {showPassword ? (
                      <VisibilityIcon
                        onClick={(e) => setShowPassword(false)}
                        style={{
                          position: "absolute",
                          right: "13px",
                          top: "40px",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={(e) => setShowPassword(true)}
                        style={{
                          position: "absolute",
                          right: "13px",
                          top: "40px",
                          cursor: "pointer",
                        }}
                      />
                    )}{" "}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-3">
                <div className="form-group form-box">
                  <div className="form-check checkbox-theme">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setFgtPwTab(true);
                    }}
                    className="forgot-password"
                  >
                    Forgot Password ?
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <button
                    ref={inputRef}
                    className="btn-style-one"
                    onClick={login}
                  >
                    <span>Login</span>
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <Link href="/" className="btn-style-one float-end">
                    <i className="fal fa-home-lg me-2" />
                    Go to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSection;
