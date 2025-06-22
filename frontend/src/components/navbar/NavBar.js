import React, { Component } from "react";
import "./navBar.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import SideNavBar from "../sidebarnav/SideNavBar";
import { ExpendableSlidebar } from "../sidebarnav/SideNavBar.js";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showhamburger: window.innerWidth > 760,
    };
  }
  hamburgerClick = async () => {
    const { isExpended, dataContainer, sideNavBarExpended } = this.props;
    if (window.innerWidth > 760) {
      if (!isExpended) {
        dataContainer({ gridColumn: "3/7" });
        sideNavBarExpended(true);
      } else {
        dataContainer({ gridColumn: "2/7" });
        sideNavBarExpended(false);
      }
    }
  };
  handelLogout = async () => {
    try {
      const recivedData = await axios.post(
        "http://localhost:5000/auth/logOut",
        { token: sessionStorage.getItem("token") },
        {
          headers: {
            "Content-Type": "application/json",
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          },
        }
      );
      toast.success(recivedData.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        close: true,
        onClose: setTimeout(() => {
          sessionStorage.removeItem("token");
          window.location.reload();
        }, 1000),
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.message + " Logging Out", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: setTimeout(() => {
          sessionStorage.removeItem("token");
          window.location.reload();
        }, 1000),
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  componentDidMount() {
    const { dataContainer, sideNavBarExpended } = this.props;
    window.addEventListener("resize", (event) => {
      const width =
        document.documentElement.clientWidth ||
        document.body.clientWidth ||
        window.innerWidth;
      if (width > 760) {
        this.setState({ showhamburger: true });
      } else {
        dataContainer({ gridColumn: "2/7" });
        sideNavBarExpended(false);
        this.setState({ showhamburger: false });
      }
    });
  }

  render() {
    const { isExpended } = this.props;
    const { showhamburger } = this.state;
    return (
      <>
        <div className="headNavBar">
          <nav className="nav">
            <ul className="leftSideList">
              {showhamburger && (
                <li
                  onClick={this.hamburgerClick}
                  id="hamburger"
                  className="barIcon"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ transform: isExpended ? "rotate(180deg)" : "" }}
                  >
                    menu_open
                  </span>
                </li>
              )}
              <li>
                <div className="navHeading">Stock management app</div>
              </li>
            </ul>

            <ul className="profileIcon">
              <li className="barIcon" title="logout">
                <span
                  className="material-symbols-outlined"
                  onClick={this.handelLogout}
                >
                  logout
                </span>
              </li>
            </ul>
          </nav>
        </div>
        {isExpended && window.innerWidth > 760 ? (
          <ExpendableSlidebar />
        ) : (
          <SideNavBar />
        )}{" "}
        <Outlet />
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
NavBar.propTypes = {
  dataContainer: PropTypes.func,
  sideNavBarExpended: PropTypes.func,
  isExpended: PropTypes.bool,
  dataContainerGrid: PropTypes.object,
};
export default NavBar;
