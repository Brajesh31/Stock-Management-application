import React, { Component } from "react";
import "./dataContainer.css";
import PropTypes from "prop-types";

class DataContainer extends Component {
  render() {
    const { dataContainerGrid, child } = this.props;

    return (
      <>
        <div id="dataContainer" style={dataContainerGrid}>
          {child}
        </div>
      </>
    );
  }
}
DataContainer.propTypes = {
  dataContainerGrid: PropTypes.object,
  child: PropTypes.object,
};
export default DataContainer;
