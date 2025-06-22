import React from "react";
import { shallow } from "enzyme";
import NavBar from "./NavBar";
describe("NavBar", () => {
  it("Take a snapshot if do not added", () => {
    const component = shallow(<NavBar />);
    expect(component).toMatchSnapshot();
  });
  it("Test to render Navbar Heading", () => {
    const component = shallow(<NavBar />);
    expect(component.find(".navHeading").text()).toEqual(
      "Stock management app"
    );
  });
});
