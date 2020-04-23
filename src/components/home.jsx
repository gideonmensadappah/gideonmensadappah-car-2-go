import React, { Component } from "react";
// import data from "../metadata/dummyData.json";
import home from "./home.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
const styles = {
  checkbox: {
    margin: "5px",
  },
  date: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "10em",
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    console.log(this.props);
    this.handleSubmit();
  }

  handleSubmit = function () {
    this.pickUpDate = null;
    this.returnDate = null;
    this.carType = null;
    this.carSize = null;

    let form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const exampleRadios = document.getElementsByName("exampleRadios");
      const carSize = document.getElementsByName("checkBoxSize");
      const dateStartValue = document.getElementById("start").value;
      const dateReturnValue = document.getElementById("end").value;

      for (let i = 0, length = exampleRadios.length; i < length; i++) {
        if (exampleRadios[i].checked) {
          this.carType = exampleRadios[i].value;
          break;
        }
      }
      for (let i = 0, length = carSize.length; i < length; i++) {
        if (carSize[i].checked) {
          this.carSize = carSize[i].value;
          this.pickUpDate = dateStartValue;
          this.returnDate = dateReturnValue;
          const data = {
            type: this.carType,
            size: this.carSize,
            pickUpDate: this.pickUpDate,
            returnDate: this.returnDate,
          };

          // this.props.history.push({
          //   pathname: `/rent-car/${data.type}/${data.size}`,
          //   state: data,
          // });
          break;
        }
      }
    });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <form style={styles.form}>
          <div style={styles.date}>
            <label htmlFor="start">Pickup Date</label>
            <input
              id="start"
              onChange={this.handleChange}
              name="rentalDate"
              type="date"
              required
            />
            <label htmlFor="end">Return Date</label>
            <input
              id="end"
              name="return-date"
              min={this.state.rentalDate}
              type="date"
              required
            />
          </div>
          <div className="check-box-size-car" style={styles.checkbox}>
            <span>CHOOSE SIZE</span>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="checkBoxSize"
                id="checkBoxSmall"
                value="1"
              />
              <label className="form-check-label" htmlFor="small">
                Small
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="checkBoxSize"
                id="exampleRadios2"
                value="2"
              />
              <label className="form-check-label" htmlFor="checkBoxMedium">
                Medium
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="checkBoxSize"
                id="exampleRadios1"
                value="3"
              />
              <label className="form-check-label" htmlFor="checkBoxLarge">
                Large
              </label>
            </div>
          </div>
          <span>CHOOSE TYPE</span>

          <div className="form-check" style={styles.checkbox}>
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="checkboxAuto"
              value="Auto"
            />
            <label className="form-check-label" htmlFor="checkBoxLarge">
              Auto
            </label>
          </div>
          <div className="form-check" style={styles.checkbox}>
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="checkBoxManual"
              value="Manual"
            />
            <label className="form-check-label" htmlFor="checkType">
              Manual
            </label>
          </div>

          <button id="submitButton" type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps)(Home);
