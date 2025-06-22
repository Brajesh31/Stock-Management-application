import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./props";
import Profile from "./Profile";
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
