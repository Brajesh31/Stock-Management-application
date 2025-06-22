import { deleteItem, editFormPopUp } from "../../redux/actions/stocks";
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  editFormPopUp: (stage, id) => {
    dispatch(editFormPopUp(stage, id));
  },
  deleteItem: (id) => {
    dispatch(deleteItem(id));
  },
});
export { mapStateToProps, mapDispatchToProps };
