import { getOneItem } from "./../../redux/actions/stocks";
const mapStateToProps = (state) => {
  return {
    oneItem: state.items.singleStockDetails,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getOneItem: (id) => {
    dispatch(getOneItem(id));
  },
});
export { mapStateToProps, mapDispatchToProps };
