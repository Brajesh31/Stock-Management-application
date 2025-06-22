process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const Items = require("./models/Items");
const User = require("./models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./index");
const should = chai.should();
chai.use(chaiHttp);

describe("/GET items", () => {
  before("Login Successfully", (done) => {
    const User = {
      email: "akansha1223@gmail.com",
      password: "Hello@987",
    };
    chai
      .request(server)
      .post("/auth/signIn")
      .send(User)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Login Successful");
        done();
      });
  });
  it("it should GET all the Items", (done) => {
    chai
      .request(server)
      .get("/api/stock/allItem")
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("allProducts");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });
});
describe("/POST items", () => {
  before("Login Successfully", (done) => {
    const User = {
      email: "akansha1223@gmail.com",
      password: "Hello@987",
    };
    chai
      .request(server)
      .post("/auth/signIn")
      .send(User)
      .set({ Authorization: token })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Login Successful");
        done();
      });
  });
  it("All fields are mandatory", (done) => {
    const Items = {};
    chai
      .request(server)
      .post("/api/stock/addItem")
      .set({ Authorization: token })
      .send(Items)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Bad request");
        done();
      });
  });
  it("it should POST a Items ", (done) => {
    const Items = {
      itemName: "pen",
      quantity: 13,
      price: 78,
      description:
        "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
      date: "1/19/2023",
      manufacturingCompany: "Isuzu",
    };
    chai
      .request(server)
      .post("/api/stock/addItem")
      .set({ Authorization: token })
      .send(Items)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.item.should.have.property("itemName");
        res.body.item.should.have.property("quantity");
        res.body.item.should.have.property("price");
        res.body.item.should.have.property("description");
        res.body.item.should.have.property("date");
        res.body.item.should.have.property("manufacturingCompany");
        done();
      });
  });
});

describe("/GET/:id items", () => {
  before("Login Successfully", (done) => {
    const User = {
      email: "akansha1223@gmail.com",
      password: "Hello@987",
    };
    chai
      .request(server)
      .post("/auth/signIn")
      .send(User)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Login Successful");
        done();
      });
  });
  it("it should GET a Items by the given id", async () => {
    const Item = new Items({
      User: "643260d8cbf86bbd4ef7874a",
      itemName: "Mont",
      quantity: 72,
      price: 26,
      description:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
      date: "3/23/2022",
      manufacturingCompany: "Mercury",
    });
    try {
      ItemDetails = await Item.save();
      chai
        .request(server)
        .get("/api/stock/getOneItem/" + ItemDetails._id)
        .set({ Authorization: token })
        .end((err, res) => {
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          res.body.oneProduct.should.have.property("itemName");
          res.body.oneProduct.should.have.property("quantity");
          res.body.oneProduct.should.have.property("price");
          res.body.oneProduct.should.have.property("description");
          res.body.oneProduct.should.have.property("date");
          res.body.oneProduct.should.have.property("manufacturingCompany");
        });
    } catch (err) {
      console.log(err);
    }
  });
});

describe("/PUT/:id Items", () => {
  before("Login Successfully", (done) => {
    const User = {
      email: "akansha1223@gmail.com",
      password: "Hello@987",
    };
    chai
      .request(server)
      .post("/auth/signIn")
      .send(User)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Login Successful");
        done();
      });
  });
  it("it should UPDATE a Items given the id", async () => {
    const Item = new Items({
      User: "643260d8cbf86bbd4ef7874a",
      itemName: "M",
      quantity: 72,
      price: 26,
      description:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
      date: "3/23/2022",
      manufacturingCompany: "Mercury",
    });
    try {
      ItemDetails = await Item.save();
      chai
        .request(server)
        .put("/api/stock/modifyItem/" + ItemDetails._id)
        .set({ Authorization: token })
        .send({
          itemName: "Moon",
          quantity: 72,
          price: 26000,
          description:
            "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
          date: "3/23/2022",
          manufacturingCompany: "Mercury",
        })
        .end((err, res) => {
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          res.body.updatedData.should.have.property("itemName");
          res.body.updatedData.should.have.property("quantity");
          res.body.updatedData.should.have.property("price");
          res.body.updatedData.should.have.property("description");
          res.body.updatedData.should.have.property("date");
          res.body.updatedData.should.have.property("manufacturingCompany");
        });
    } catch (err) {
      console.log(err);
    }
  });
});

describe("/delete/:id Items", () => {
  before("Login Successfully", (done) => {
    const User = {
      email: "akansha1223@gmail.com",
      password: "Hello@987",
    };
    chai
      .request(server)
      .post("/auth/signIn")
      .send(User)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Login Successful");
        done();
      });
  });
  it("it should delete a Items given the id", async () => {
    const Item = new Items({
      User: "643260d8cbf86bbd4ef7874a",
      itemName: "Navigatorr",
      quantity: 16,
      price: 27,
      description:
        "Lorem ipsum dolor sit amet,  lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
      date: "6/27/2022",
      manufacturingCompany: "Lincoln",
    });
    try {
      const newItem = await Item.save();
      chai
        .request(server)
        .delete("/api/stock/deleteItem/" + newItem._id)
        .set({ Authorization: token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Item successfully deleted!");
          res.body.should.have.property("success").eql(true);
        });
    } catch (err) {
      console.log("err", err);
    }
  });
});

describe("/POST SignUp", () => {
  it("All fields are mandatory", (done) => {
    const User = {
      name: "akansha",
      password: "hello",
    };
    chai
      .request(server)
      .post("/auth/signUp")
      .send(User)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
  it("Password must be valid", (done) => {
    const User = {
      name: "akansha",
      email: "akanshamishra94@gmail.com",
      password: "hello",
    };
    chai
      .request(server)
      .post("/auth/signUp")
      .send(User)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
  it("Successfully submitted form", (done) => {
    const User = {
      username: "akanshamishra",
      name: "akansha",
      email: "akanshamishra980@gmail.com",
      password: "Hello@987",
      confirmPassword: "Hello@987",
    };
    chai
      .request(server)
      .post("/auth/signUp")
      .send(User)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });
});

describe("/POST SignIn", () => {
  it("Login Successfully", (done) => {
    const User = {
      email: "akansha1223@gmail.com",
      password: "Hello@987",
    };
    chai
      .request(server)
      .post("/auth/signIn")
      .send(User)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Login Successful");
        done();
      });
  });
  it("Passwords does not match", (done) => {
    const User = {
      email: "akansha1223@gmail.com",
      password: "Hello@9879",
    };
    chai
      .request(server)
      .post("/auth/signIn")
      .send(User)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error").eql("Passwords does not match");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
});
