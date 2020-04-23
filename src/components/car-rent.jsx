import React, { Component } from "react";
// import data from "../metadata/dummyData.json";
import { Link } from "react-router-dom";
import carsCss from "./carList.css";
import { connect } from "react-redux";
class CarRent extends Component {
  constructor() {
    super();
    this.state = {
      carList: [],
      isRented: false,
    };
  }
  componentDidMount() {
    this.getDatAndFilter();
    this.setState({
      carList: this.carsList,
    });
  }

  getDatAndFilter = () => {
    const { rootReducer } = this.props.state;
    this.size = Number(this.props.match.params.size);
    this.type = this.props.match.params.type.toLowerCase();
    this.carsList = rootReducer.filter(
      (cars) => cars.size === this.size && cars.type === this.type
    );
  };

  //handle click function
  handleClick = (res) => {
    const date = {
      pickUp: this.props.history.location.state.pickUpDate,
      returnDate: this.props.history.location.state.returnDate,
    };
    const data = { ...this.props.history.location.state, ...date, ...res };

    this.props.history.push({
      pathname: `/user/rent`,
      state: data,
    });
  };
  render() {
    const cars = this.state.carList;
    return (
      <React.Fragment>
        <h1>Car rental page</h1>
        {cars.length > 0
          ? cars.map((car, index) =>
              car.rented === false ? (
                <div className="container my-5" key={index}>
                  <div className="row">
                    <div className="col-6">
                      <div className="card" style={{ width: "30rem" }}>
                        <img
                          src={car.image}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {car.maker + " " + car.name}
                          </h5>

                          <div className="car-btn">
                            <input
                              type="button"
                              onClick={() => this.handleClick(car)}
                              className="btn btn-primary"
                              id="car-list-btn"
                              value="Rent Now"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )
          : "Oops we have no cars"}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps)(CarRent);
