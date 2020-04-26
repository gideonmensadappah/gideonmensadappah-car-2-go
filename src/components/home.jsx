import React, { Component } from "react";
import home from "./home.css";
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

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.today = formatDate(Date.now());
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const data = this.state;
    const { size, type } = this.state;
    event.preventDefault();

    this.props.history.push({
      pathname: `/rent-car/${type}/${size}`,
      state: data,
    });
  }

  render() {
    console.log(this.props);
    return (
      <>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <div style={styles.date}>
            <label htmlFor="start">Pickup Date</label>
            <input
              id="start"
              min={this.today}
              onChange={this.handleChange}
              name="rentalDate"
              type="date"
              required
            />

            <label htmlFor="end">Return Date</label>
            <input
              onChange={this.handleChange}
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
                onChange={this.handleChange}
                className="form-check-input"
                type="radio"
                name="size"
                id="checkBoxSmall"
                value="1"
              />
              <label className="form-check-label" htmlFor="small">
                Small
              </label>
            </div>
            <div className="form-check">
              <input
                onChange={this.handleChange}
                className="form-check-input"
                type="radio"
                name="size"
                id="exampleRadios2"
                value="2"
              />
              <label className="form-check-label" htmlFor="checkBoxMedium">
                Medium
              </label>
            </div>
            <div className="form-check">
              <input
                onChange={this.handleChange}
                className="form-check-input"
                type="radio"
                name="size"
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
              onChange={this.handleChange}
              className="form-check-input"
              type="radio"
              name="type"
              id="checkboxAuto"
              value="Auto"
            />
            <label className="form-check-label" htmlFor="checkBoxLarge">
              Auto
            </label>
          </div>
          <div className="form-check" style={styles.checkbox}>
            <input
              onChange={this.handleChange}
              className="form-check-input"
              type="radio"
              name="type"
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
