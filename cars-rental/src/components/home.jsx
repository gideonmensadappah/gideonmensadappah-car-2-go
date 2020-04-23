import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import data from "../metadata/dummyData.json";
import home from "./home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      greeting: "hello user",
    };
  }
  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit = function () {
    document.getElementById("submitButton").addEventListener("click", (e) => {
      e.preventDefault();
      console.log(data);
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.greeting}</h1>
        <h3>Please select Vehicles type </h3>
        <div className="container" id="home">
          <div className="row">
            <div className="col-4">
              <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="email" id="email" placeholder="Email" />
                  </Col>
                </Form.Group>
                <Form.Group column sm={2}>
                  <Col sm={10}>
                    <label className="mr-1" for="start">
                      pick up date:
                    </label>

                    <input
                      type="date"
                      id="start"
                      name="trip-start"
                      value="2018-07-22"
                      min="2018-01-01"
                      max="2018-12-31"
                    ></input>
                  </Col>
                </Form.Group>
                <Form.Group column sm={2}>
                  <Col sm={10}>
                    <label className="mr-1" for="start">
                      Return date:{" "}
                    </label>

                    <input
                      type="date"
                      id="end"
                      name="end-start"
                      value="2018-07-22"
                      min="2018-01-01"
                      max="2018-12-31"
                    ></input>
                  </Col>
                </Form.Group>
                <fieldset>
                  <Form.Group as={Row}>
                    Type Size:
                    <Form.Label as="legend" column sm={2}></Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="small"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                      />
                      <Form.Check
                        type="radio"
                        label="medium"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                      />
                      <Form.Check
                        type="radio"
                        label="large"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
                <fieldset>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      Default checkbox
                    </label>
                  </div>
                </fieldset>

                <Form.Group as={Row}>
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button id="submitButton" type="submit">
                      Get A Car
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Home;
