import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./props";
import EditForm from "./EditForm";
export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
