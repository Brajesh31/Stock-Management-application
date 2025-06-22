import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      password: "",
      username: "",
      isUserNameValid: false,
      email: "",
      confirmPassword: "",
      name: "",
    };
  }

  handelOnchange = (event) => {
    const data = event.target.value;
    if (event.target.name === "email") {
      this.setState({ email: data });
    } else if (event.target.name === "password") {
      this.setState({ password: data });
    } else if (event.target.name === "name") {
      this.setState({ name: data });
    } else if (event.target.name === "confirmPassword") {
      this.setState({ confirmPassword: data });
    } else if (event.target.name === "username") {
      this.setState({ username: data });
    }
    this.setState({ submitButtonDisable: false });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, name, confirmPassword, username } = this.state;
    const data = {
      email: email,
      name: name,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      const recivedData = await axios.post(
        "http://localhost:5000/auth/signUp",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(recivedData.data.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        close: true,
        onClose: setTimeout(() => {
          window.location.reload();
        }, 2500),
        theme: "light",
      });
      this.setState({
        showPassword: false,
        password: "",
        username: "",
        isUserNameValid: false,
        email: "",
        confirmPassword: "",
        name: "",
        isSignUp: false,
      });
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
  componentDidMount() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  handelShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { email, password, name, confirmPassword, username } = this.state;
    return (
      <div>
        {" "}
        <div className="signInSignUpHeading">
          <h2 className="authLinksActive">SIGN UP</h2>
        </div>
        <form onSubmit={this.handleSubmit} method="post">
          <TextField
            type="text"
            className="input-box"
            required
            onChange={this.handelOnchange}
            value={name}
            style={{
              width: "100%",
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
            placeholder="Full Name"
            name="name"
          />
          <TextField
            type="email"
            className="input-box"
            required
            onChange={this.handelOnchange}
            value={email}
            style={{
              width: "100%",
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
            placeholder="Enter your email"
            name="email"
          />
          <TextField
            type="text"
            className="input-box"
            required
            onChange={this.handelOnchange}
            value={username}
            style={{
              width: "100%",
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
            placeholder="username"
            name="username"
          />
          <div className="inputIcon">
            <TextField
              className="input-box"
              required
              value={password}
              onChange={this.handelOnchange}
              style={{
                width: "100%",
              }}
              sx={{
                "& fieldset": { border: "none" },
              }}
              type={this.state.showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
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
          <div className="inputIcon">
            <TextField
              className="input-box"
              required
              style={{
                width: "100%",
              }}
              sx={{
                "& fieldset": { border: "none" },
              }}
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handelOnchange}
              type={this.state.showPassword ? "text" : "password"}
              placeholder="Confirm Password"
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
              title="SIGN UP"
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
      </div>
    );
  }
}

export default SignUp;
