import { connect } from "react-redux";
import Card from "./Card";
import { mapStateToProps, mapDispatchToProps } from "./props";
export default connect(mapStateToProps, mapDispatchToProps)(Card);
