import React, { Component } from "react";
import "./sideNavBar.css";
import { Link } from "react-router-dom";

export default class SideNavBar extends Component {
  render() {
    return (
      <nav id="sideNav">
        <ul>
          <li id="dashboardIcon">
            <Link
              to=""
              title="Dashboard"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="material-symbols-outlined">dashboard</div>
            </Link>
          </li>

          <li>
            <Link
              to="showProfile"
              title="Profile"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="material-symbols-outlined">account_circle</div>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export class ExpendableSlidebar extends Component {
  render() {
    return (
      <nav id="sideNavExpandable">
        <ul>
          <li id="dashboardText">
            <Link to="">
              <div className="material-symbols-outlined">dashboard</div>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="showProfile">
              <div className="material-symbols-outlined">account_circle</div>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
