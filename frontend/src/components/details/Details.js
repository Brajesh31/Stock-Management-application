import React, { Component } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import DataContainer from "../dataContainer/index";
import "./details.css";
import PropTypes from "prop-types";
const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};
class Details extends Component {
  async componentDidMount() {
    const { id } = this.props.params;
    const { getOneItem } = this.props;
    getOneItem(id);
  }
  render() {
    const { oneItem } = this.props;
    const {
      itemName,
      manufacturingCompany,
      price,
      quantity,
      date,
      description,
    } = oneItem;
    return (
      <DataContainer
        child=<div className="deailsPageContainer">
          <div className="innerDeailsPageContainer">
            <div>
              <h3 className="backButton">
                <Link className="Link" to={-1}>
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </h3>
              <h1>{itemName}</h1>
            </div>
            {oneItem && (
              <section className="detailsComponent">
                <div className="detailsPart">
                  <div className="itemInfoElement">
                    Manufacturing Company : {manufacturingCompany}
                  </div>
                  <div className="detailElement">
                    <div className="itemInfoElement">Quantity : {quantity}</div>
                    <div className="itemInfoElement">Price : ₹ {price}</div>
                  </div>
                  <div className="itemInfoElement">
                    Date Added On: {moment(date).format("MMMM D, YYYY")}
                  </div>
                </div>
                <div className="descriptionContainer">
                  <div className="itemInfoElement">Description :</div>
                  <div className="descriptionBody">{description}</div>
                </div>
              </section>
            )}
          </div>
        </div>
      />
    );
  }
}
DataContainer.propTypes = {
  oneItem: PropTypes.object,
  getOneItem: PropTypes.func,
  params: PropTypes.object,
};

export default withRouter(Details);
