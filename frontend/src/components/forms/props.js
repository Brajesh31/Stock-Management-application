import { addItem, addFormPopUp } from "./../../redux/actions/stocks";
const mapStateToProps = (state) => {
  return { isAddPopperOpen: state.items.isAddPopperOpen };
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (data) => {
    dispatch(addItem(data));
  },
  addFormPopUp: (data) => {
    dispatch(addFormPopUp(data));
  },
});
export { mapStateToProps, mapDispatchToProps };
