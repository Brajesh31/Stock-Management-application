import React from "react";
import { shallow } from "enzyme";
import Card from "./Card";
import moment from "moment";
describe("Card", () => {
  it("Take a snapshot if do not added", () => {
    const component = shallow(<Card />);
    expect(component).toMatchSnapshot();
  });
  it("Test to render card Heading", () => {
    const props = "mobile";
    const component = shallow(<Card itemName={props} />);
    expect(component.find(".cardHeading").text()).toEqual(props);
  });
  it("Test to render Manufactured By", () => {
    const props = "vivo";
    const component = shallow(<Card manufacturingCompany={props} />);
    expect(component.find(".manufacturingCompany").text()).toEqual(
      "Manufactured By : " + props
    );
  });
  it("Test to render Date field", () => {
    const props = "2023-03-25";
    const component = shallow(<Card date={props} />);
    expect(component.find(".dateContainer").text()).toEqual(
      "Date " + moment(props).format("DD/MM/YYYY")
    );
  });
  it("Test to render quantity field", () => {
    const props = 12;
    const component = shallow(<Card quantity={props} />);
    expect(component.find(".quantityContainer").text()).toEqual(
      "Qty : " + props
    );
  });
  it("Test to render price field", () => {
    const props = 1020;
    const component = shallow(<Card price={props} />);
    expect(component.find(".priceContainer").text()).toEqual("₹ : " + props);
  });
});
