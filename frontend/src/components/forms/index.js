import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./props";
import NewItemForm from "./NewItemForm";
export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm);
