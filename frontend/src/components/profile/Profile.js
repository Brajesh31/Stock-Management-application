import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataContainer from "../dataContainer/index";
import "./profile.css";
import axios from "axios";
export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      fullName: "",
      email: "",
    };
  }
  async componentDidMount() {
    try {
      const userData = await axios.get(
        `http://localhost:5000/api/stock/getUserData`,
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      );
      const { username, email, name } = userData.data.userData;
      this.setState({ userName: username, email: email, fullName: name });
    } catch (err) {
      if (
        err.response.data.message === "No token provided" ||
        err.response.data.message === "Session Time Out"
      ) {
        sessionStorage.removeItem("token");
        window.location.reload();
      }
      return err;
    }
  }
  render() {
    const { userName, email, fullName } = this.state;
    return (
      <DataContainer
        child=<div className="profileContainer">
          <div className="innerProfileContainer">
            <div>
              <h3 className="backButton">
                <Link className="Link" to={-1}>
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </h3>
              <h1> Profile </h1>
            </div>
            <section className="profilePart">
              <div className="profileElement">
                <div className="profileElementHeading"> Username </div>
                <div>{userName}</div>
              </div>
              <div className="profileElement">
                <div className="profileElementHeading">Full Name</div>{" "}
                <div> {fullName}</div>
              </div>
              <div className="profileElement">
                <div className="profileElementHeading">Email</div>{" "}
                <div>{email}</div>
              </div>
            </section>
          </div>
        </div>
      />
    );
  }
}
