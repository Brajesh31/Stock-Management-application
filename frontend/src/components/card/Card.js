import React, { Component } from "react";
import "./card.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { delete: true, openDeletePopper: false };
  }
  handleEditPopUp = () => {
    const { editFormPopUp, id } = this.props;
    editFormPopUp(true, id);
  };
  handleDeletePopper = () => {
    const { openDeletePopper } = this.state;
    this.setState({ openDeletePopper: !openDeletePopper });
  };
  handleDelete = () => {
    const { id, deleteItem } = this.props;
    deleteItem(id);
  };
  render() {
    const { id, itemName, manufacturingCompany, price, quantity, date } =
      this.props;
    const { openDeletePopper } = this.state;
    return (
      <>
        <div className="cards">
          <div className="cardHeading">
            <h4>{itemName}</h4>
          </div>
          <div className="cardBody">
            <div className="manufacturingCompany">
              Manufactured By : {manufacturingCompany}
            </div>
            <div className="dateContainer">
              <div className="dateTextContainer">Date</div>
              <div className="dateIconContainer">
                <i className="fa-solid fa-calendar-days"></i>
                {moment(date).format(" DD/MM/YYYY")}
              </div>
            </div>
            <div className="priceQuantityContainer">
              <div className="quantityContainer">Qty : {quantity}</div>
              <div className="priceContainer">₹ : {price}</div>
            </div>
            <div className="crudButtons">
              <Link
                className="Link"
                title="Preview "
                to={`showdetails/${id}`}
                state={{ id: id }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: 35,
                    minHeight: 35,
                    minWidth: 35,
                    height: 35,
                    backgroundColor: "#323765",
                    borderRadius: 0,
                    border: "1px solid",
                    borderColor: "primary.main",
                    "& .MuiButton-startIcon": { margin: 0 },
                    ":hover": {
                      bgcolor: "#323765",
                      color: "white",
                    },
                  }}
                  size="small"
                >
                  <i className="fa-solid fa-eye"></i>
                </Button>
              </Link>
              <Button
                onClick={this.handleEditPopUp}
                title="Edit "
                sx={{
                  width: 35,
                  minHeight: 35,
                  minWidth: 35,
                  height: 35,
                  backgroundColor: "#323765",
                  borderRadius: 0,
                  border: "1px solid",
                  borderColor: "primary.main",
                  "& .MuiButton-startIcon": { margin: 0 },
                  ":hover": {
                    bgcolor: "#323765",
                    color: "white",
                  },
                }}
                variant="contained"
                size="small"
              >
                <i className="fa-solid fa-pencil"></i>
              </Button>
              <Button
                sx={{
                  width: 35,
                  minHeight: 35,
                  minWidth: 35,
                  height: 35,
                  backgroundColor: "#323765",
                  borderRadius: 0,
                  border: "1px solid",
                  borderColor: "primary.main",
                  "& .MuiButton-startIcon": { margin: 0 },
                  ":hover": {
                    bgcolor: "#323765",
                    color: "white",
                  },
                }}
                onClick={this.handleDeletePopper}
                variant="contained"
                title="Delete"
                size="small"
              >
                <i className="fa-solid fa-trash"></i>
              </Button>
            </div>
          </div>
        </div>
        <Dialog open={openDeletePopper} maxWidth="sm">
          <DialogTitle>Are you sure to delete this item?</DialogTitle>
          <DialogActions>
            <Button
              sx={{
                background: " #323765",
                ":hover": {
                  background: "#323765",
                  transform: "scale(1.01)",
                },
              }}
              onClick={this.handleDeletePopper}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              sx={{
                background: " #323765",
                ":hover": {
                  background: "#323765",
                  transform: "scale(1.01)",
                },
              }}
              onClick={this.handleDelete}
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
Card.propTypes = {
  editFormPopUp: PropTypes.func,
  deleteItem: PropTypes.func,
  id: PropTypes.string,
  itemName: PropTypes.string,
  manufacturingCompany: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  date: PropTypes.string,
};
export default Card;
