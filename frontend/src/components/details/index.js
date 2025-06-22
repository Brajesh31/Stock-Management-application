import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./props";
import Details from "./Details";
export default connect(mapStateToProps, mapDispatchToProps)(Details);
