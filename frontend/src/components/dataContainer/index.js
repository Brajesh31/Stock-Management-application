import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./props";
import DataContainer from "./DataContainer";
export default connect(mapStateToProps, mapDispatchToProps)(DataContainer);
