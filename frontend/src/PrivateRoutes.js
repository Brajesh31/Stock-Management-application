import React, { Component } from "react";
import NavBar from "./components/navbar/index";
import Auth from "./components/authentication/index";
export default class PrivateRoutes extends Component {
  render() {
    const isAuthenticated = sessionStorage.getItem("token");
    return isAuthenticated ? <NavBar /> : <Auth />;
  }
}
