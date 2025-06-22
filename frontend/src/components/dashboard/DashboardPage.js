import React, { Component } from "react";
import Card from "../card/index";

import "./dashboardPage.css";
import EditForm from "../editForm/index";
import DataContainer from "../dataContainer/index";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewItemForm from "../forms/index";
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
    };
  }
  handelAddItem = () => {
    const { addFormPopUp } = this.props;
    addFormPopUp(true);
  };
  async componentDidMount() {
    const { getAllItem } = this.props;
    getAllItem();
  }
  render() {
    const { item, isloading, isEditPopperOpen, isAddPopperOpen } = this.props;
    return (
      <>
        <DataContainer
          child={
            isloading ? (
              <div className="loaderContainer">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <div className="cardContainer">
                {isEditPopperOpen ? <EditForm /> : null}
                {isAddPopperOpen ? <NewItemForm /> : null}
                {item &&
                  item.length > 0 &&
                  item.reverse().map((element) => {
                    return (
                      <Card
                        key={element && element._id}
                        id={element && element._id}
                        itemName={element && element.itemName}
                        quantity={element && element.quantity}
                        price={element && element.price}
                        description={element && element.description}
                        date={element && element.date}
                        manufacturingCompany={
                          element && element.manufacturingCompany
                        }
                      />
                    );
                  })}
              </div>
            )
          }
        />
        <Fab
          sx={{
            position: "fixed",
            top: "13vh",
            bgcolor: "rgb(255 255 255 / 88%)",
            color: "#323765",
            right: 16,
            ":hover": {
              bgcolor: "white",
              color: "#323765",
            },
          }}
          title="Add Item"
          aria-label="Add"
          onClick={this.handelAddItem}
          color="primary"
        >
          <AddIcon />
        </Fab>
      </>
    );
  }
}
DashboardPage.propTypes = {
  item: PropTypes.array,
  isloading: PropTypes.bool,
  isEditPopperOpen: PropTypes.bool,
  isAddPopperOpen: PropTypes.bool,
  getAllItem: PropTypes.func,
  addFormPopUp: PropTypes.func,
};
export default DashboardPage;
