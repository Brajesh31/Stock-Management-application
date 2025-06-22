import {
  dataContainer,
  sideNavBarExpended,
} from "./../../redux/actions/navbar";
const mapStateToProps = (state) => {
  const { sideNavBarExpended, dataContainerGrid } = state.navBar;
  return {
    isExpended: sideNavBarExpended,
    dataContainerGrid: dataContainerGrid,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dataContainer: (styling) => {
    dispatch(dataContainer(styling));
  },
  sideNavBarExpended: (styling) => {
    dispatch(sideNavBarExpended(styling));
  },
});

export { mapDispatchToProps, mapStateToProps };
