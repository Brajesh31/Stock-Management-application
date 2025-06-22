import { getAllItem, addFormPopUp } from "./../../redux/actions/stocks";
const mapStateToProps = (state) => ({
  isEditPopperOpen: state.items.isEditPopperOpen.isPopperOpen,
  isAddPopperOpen: state.items.isAddPopperOpen,
  isloading: state.items.isloading,
  item: state.items.stockItems,
});
const mapDispatchToProps = (dispatch) => ({
  getAllItem: () => {
    dispatch(getAllItem());
  },
  addFormPopUp: (data) => {
    dispatch(addFormPopUp(data));
  },
});
export { mapStateToProps, mapDispatchToProps };
