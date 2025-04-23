/// <reference types="cypress" />

describe("Update Booking", () => {
  let token = " ";
  let bookingId = " ";
  beforeEach("Login", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      body: {
        username: "admin",
        password: "password123",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      token = response.body.token;
    });
  });
  beforeEach("Create Booking", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/booking",
      failOnStatusCode: false,
      body: {
        firstname: "João",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).as("response_create");
    cy.get("@response_create").then((response_create) => {
      bookingId = response_create.body.bookingid;
      expect(response_create.status).equal(200);
      expect(response_create.body.bookingid).to.a("number");
      expect(response_create.body.booking.totalprice).to.equal(111);
    });
  });

  it("Update Bokking", () => {
    cy.request({
      method: "PUT",
      url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      failOnStatusCode: false,
      body: {
        firstname: "Portella",
        lastname: "Brown",
        totalprice: 1011,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.firstname).to.equal("Portella");
      expect(response.body.totalprice).to.equal(1011);
    });
  });
});
