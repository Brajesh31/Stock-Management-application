import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./props";
import NavBar from "./NavBar";
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
