import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      password: "",
      email: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const data = {
      email: email,
      password: password,
    };
    try {
      const recivedData = await axios.post(
        "http://localhost:5000/auth/signIn",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (recivedData.data.token) {
        sessionStorage.setItem("token", recivedData.data.token);
        toast.success(recivedData.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          close: true,
          onClose: setTimeout(() => {
            window.location.reload();
          }, 1000),
          theme: "light",
        });
      }
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((message) => {
          toast.error(message.msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      } else {
        toast.error(error.response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  handelOnchange = (event) => {
    const data = event.target.value;
    if (event.target.name === "email") {
      this.setState({ email: data });
    } else if (event.target.name === "password") {
      this.setState({ password: data });
    }
    this.setState({ submitButtonDisable: false });
  };
  handelShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const { email, password } = this.state;
    return (
      <>
        <div className="signInSignUpHeading">
          <h2 className="authLinksActive">SIGN IN</h2>
        </div>
        <form onSubmit={this.handleSubmit} method="post">
          <TextField
            type="email"
            className="input-box"
            required
            style={{
              width: "100%",
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
            onChange={this.handelOnchange}
            value={email}
            name="email"
            placeholder="Enter your email"
          />
          <div className="inputIcon">
            <TextField
              className="input-box"
              required
              value={password}
              name="password"
              style={{
                width: "100%",
              }}
              sx={{
                "& fieldset": { border: "none" },
              }}
              onChange={this.handelOnchange}
              type={this.state.showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <Button
              sx={{
                width: 35,
                minHeight: 35,
                minWidth: 35,
                height: 35,
                color: "black",
                boxShadow: "none",
                backgroundColor: "inherit",
                borderRadius: "50%",
                "& .MuiButton-startIcon": { margin: 0 },
                ":hover": {
                  bgcolor: "inherit",
                  color: "black",
                  boxShadow: "none",
                },
              }}
              onClick={this.handelShowPassword}
              variant="contained"
              size="small"
            >
              {this.state.showPassword ? (
                <span className="material-symbols-outlined eyeIcon">
                  visibility_off
                </span>
              ) : (
                <span className="material-symbols-outlined eyeIcon">
                  visibility
                </span>
              )}
            </Button>
          </div>
          <div className="submitButtonContainer">
            <Button
              type="submit"
              title="SIGN IN"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "50%" }}
            >
              Submit
            </Button>
          </div>
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    );
  }
}
