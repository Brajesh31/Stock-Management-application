import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./newItemForm.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
class NewItemForm extends Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      quantity: "",
      price: "",
      description: "",
      date: "",
      manufacturingCompany: "",
      manufacturingCompanyError: false,
      itemNameError: false,
      quantityError: false,
      priceError: false,
      descriptionError: false,
      dateError: false,
      submitButtonDisable: true,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      itemName,
      quantity,
      price,
      description,
      date,
      manufacturingCompany,
    } = this.state;
    const data = {
      itemName: itemName,
      quantity: quantity,
      price: price,
      description: description,
      date: date,
      manufacturingCompany: manufacturingCompany,
    };
    const { addItem } = this.props;
    addItem(data);
    const { addFormPopUp } = this.props;
    addFormPopUp(false);
  };
  handelOnchange = async (event) => {
    const data = event.target.value;
    if (event.target.name === "itemName") {
      if (data.length > 2 && data.length <= 100) {
        this.setState({ itemNameError: false });
      } else {
        this.setState({ itemNameError: true });
      }
      this.setState({ itemName: data });
    } else if (event.target.name === "quantity") {
      if (data >= 0 && data !== "") {
        this.setState({ quantityError: false, quantity: data });
      } else {
        this.setState({ quantityError: true, quantity: "" });
      }
    } else if (event.target.name === "description") {
      if (data.length > 0) {
        this.setState({ descriptionError: false });
      } else {
        this.setState({ descriptionError: true });
      }
      this.setState({ description: data });
    } else if (event.target.name === "manufacturingCompany") {
      if (data.length > 0) {
        this.setState({
          manufacturingCompanyError: false,
        });
      } else {
        this.setState({ manufacturingCompanyError: true });
      }
      this.setState({
        manufacturingCompany: data,
      });
    } else if (event.target.name === "price") {
      if (data > 0) {
        this.setState({
          price: data,
          priceError: false,
        });
      } else {
        this.setState({
          price: "",
          priceError: true,
        });
      }
    } else if (event.target.name === "date") {
      const today = new Date();
      const dateInputted = new Date(data);
      if (today < dateInputted || data === "") {
        this.setState({ dateError: true });
      } else {
        this.setState({ dateError: false });
      }
      await this.setState({ date: data });
    }
    const {
      itemName,
      quantity,
      price,
      description,
      date,
      manufacturingCompany,
      manufacturingCompanyError,
      itemNameError,
      quantityError,
      priceError,
      descriptionError,
      dateError,
    } = this.state;
    if (
      itemName === "" ||
      quantity === "" ||
      price === "" ||
      description === "" ||
      date === "" ||
      manufacturingCompany === "" ||
      manufacturingCompanyError === true ||
      itemNameError === true ||
      quantityError === true ||
      priceError === true ||
      descriptionError === true ||
      dateError === true
    )
      this.setState({ submitButtonDisable: true });
    else {
      this.setState({ submitButtonDisable: false });
    }
  };
  handelClose = () => {
    const { addFormPopUp } = this.props;
    addFormPopUp(false);
  };
  handelOnBlur = (event) => {
    console.log("onblur");
    const data = event.target.value;
    if (event.target.name === "itemName") {
      if (data.length < 2 || data.length > 100) {
        this.setState({ itemNameError: true });
      }
    } else if (event.target.name === "quantity") {
      if (data < 0 || data === "") {
        this.setState({ quantityError: true });
      }
    } else if (event.target.name === "description") {
      if (data.length <= 0) {
        this.setState({ descriptionError: true });
      }
    } else if (event.target.name === "manufacturingCompany") {
      if (data.length <= 0) {
        this.setState({ manufacturingCompanyError: true });
      }
    } else if (event.target.name === "price") {
      if (data <= 0) {
        this.setState({
          priceError: true,
        });
      }
    } else if (event.target.name === "date") {
      const today = new Date();
      const dateInputted = new Date(data);
      if (today < dateInputted || data === "") {
        this.setState({ dateError: true });
      }
    }
  };
  render() {
    const {
      itemName,
      quantity,
      price,
      description,
      date,
      manufacturingCompany,
      manufacturingCompanyError,
      itemNameError,
      quantityError,
      submitButtonDisable,
      priceError,
      descriptionError,
      dateError,
    } = this.state;
    const { isAddPopperOpen: open } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose} fullWidth={true}>
        <div className="innerFormContainer">
          <div>
            <h1>Add New Item</h1>
          </div>
        </div>
        <DialogContent>
          <form method="post" id="form">
            <TextField
              required
              id="filled-basic"
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              name="itemName"
              value={itemName}
              label="Item Name"
              variant="filled"
              onBlur={this.handelOnBlur}
              onChange={this.handelOnchange}
              type="text"
              style={{ width: "100%" }}
            />
            {itemNameError && (
              <div className="errorMessage">
                * Name of the item should contain atleast 3 character and atmost
                100 character
              </div>
            )}
            <div className="flexInputBoxForm">
              <div>
                <TextField
                  required
                  id="filled-basic"
                  min="1"
                  label="Quantity"
                  value={quantity}
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                    style: {
                      height: "50px",
                    },
                  }}
                  name="quantity"
                  variant="filled"
                  onChange={this.handelOnchange}
                  onBlur={this.handelOnBlur}
                  type="number"
                  style={{ width: "100%" }}
                />
                {quantityError && (
                  <div className="flexFormErrorMessage">
                    * Quantity should be greater than or equal to 0.
                  </div>
                )}
              </div>
              <div>
                <TextField
                  required
                  id="filled-basic"
                  name="price"
                  label="Price"
                  value={price}
                  variant="filled"
                  InputProps={{
                    inputProps: {
                      min: 1,
                    },
                    style: {
                      height: "50px",
                    },
                  }}
                  onBlur={this.handelOnBlur}
                  onChange={this.handelOnchange}
                  type="number"
                  style={{ width: "100%" }}
                />
                {priceError && (
                  <div className="flexFormErrorMessage">
                    * Price should be greater than 0.
                  </div>
                )}
              </div>
            </div>
            <TextField
              required
              id="filled-basic"
              name="manufacturingCompany"
              label="Manufacturing company"
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              variant="filled"
              onBlur={this.handelOnBlur}
              onChange={this.handelOnchange}
              type="text"
              value={manufacturingCompany}
              style={{ width: "100%" }}
            />
            {manufacturingCompanyError && (
              <div className="errorMessage">* this field is required.</div>
            )}{" "}
            <TextField
              required
              multiline
              rows={2}
              name="description"
              onBlur={this.handelOnBlur}
              onChange={this.handelOnchange}
              variant="filled"
              value={description}
              label="Description"
            />
            {descriptionError && (
              <div className="errorMessage">* this field is required.</div>
            )}
            <TextField
              id="datetime-local"
              label="Date Added On"
              type="date"
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              value={date}
              name="date"
              onChange={this.handelOnchange}
              onBlur={this.handelOnBlur}
            />
            {dateError && (
              <div className="errorMessage">
                * date is required and should not be greater than today
              </div>
            )}
          </form>
        </DialogContent>
        <DialogActions className="submitButtonContainer">
          {" "}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "50%" }}
            className="closeButton"
            onClick={this.handelClose}
          >
            Close
          </Button>
          <Button
            disabled={submitButtonDisable}
            title={
              submitButtonDisable
                ? "All the fields are required and should be valid"
                : "Submit"
            }
            type="submit"
            onClick={this.handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "50%" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
NewItemForm.propTypes = {
  addItem: PropTypes.func,
  isAddPopperOpen: PropTypes.bool,
  addFormPopUp: PropTypes.func,
};
export default NewItemForm;
