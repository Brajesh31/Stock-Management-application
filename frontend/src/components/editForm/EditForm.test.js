import React from "react";
import { shallow } from "enzyme";
import EditForm from "./EditForm";
describe("EditForm", () => {
  const oneItem = {
    itemName: "Outlander Sport",
    quantity: 19,
    price: 4,
    description:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    date: "2022-10-18",
    manufacturingCompany: "Mitsubishi",
  };
  const getOneItem = () => {
    return oneItem;
  };
  const component = shallow(
    <EditForm
      getOneItem={getOneItem}
      oneItem={oneItem}
      isPopperOpen={true}
      isEditPopperOpen={true}
      editFormId={"u877e87t67etgy7t6ee"}
    />
  );
  it("Take a snapshot if do not added", () => {
    expect(component).toMatchSnapshot();
  });
  it("Test to render EditForm Heading", () => {
    expect(component.find(".innerEditFormContainer").render().text()).toEqual(
      "UPDATE ITEM"
    );
  });
  it("Test to render Update Button Text", () => {
    expect(component.find(".submitButtonContainer").text()).toEqual(
      "Close Update"
    );
  });
  it("Test to render the close button Button", () => {
    expect(component.find(".closeButton").text()).toEqual("Close");
  });
});
