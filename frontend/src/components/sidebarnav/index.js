import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./props";
import SideNavBar from "./SideNavBar";
export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
