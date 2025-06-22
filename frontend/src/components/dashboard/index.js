import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./props";
import DashboardPage from "./DashboardPage";
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
