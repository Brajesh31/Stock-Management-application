import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./props";
import Auth from "./Auth";
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
