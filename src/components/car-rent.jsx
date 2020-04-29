import React, { Component } from "react";
// import data from "../metadata/dummyData.json";
import { Link } from "react-router-dom";
import carsCss from "./carList.css";
import { connect } from "react-redux";
import returnCar from "./returnCar";
import { CarList } from "./car-list";
import { compared } from "../reducers/reducers";

const styles = {
  headerText: {
    fontSize: "2em",
  },
};
class CarRent extends Component {
  constructor() {
    super();
    this.state = {
      carList: [],
      isRented: null,
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
    const { carList, isRented } = this.state;
    const { rentedCarsDate } = this.props.state;
    console.log(this.props);
    const pickUp = this.props.history.location.state.rentalDate;
    const returnDate = this.props.history.location.state.returnDate;
    const date = new Date(returnDate);
    return (
      <React.Fragment>
        {/* {carList.every((car) => car.rented === true) ? (
          <>
            <p style={styles.headerText}>
              {" "}
              "Sorry No Cars Available On your Requested Date"
            </p>
          </>
        ) : ( */}
        <>
          <p
            style={styles.headerText}
          >{`Available Cars between: ${pickUp}/ ${date.getUTCDate()}`}</p>
          <CarList
            rentedCars={rentedCarsDate}
            carList={carList}
            pickUpDate={pickUp}
            returnDate={returnDate}
            click={this.handleClick}
          />
        </>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    compared: compared(state.rootReducer, state.rentedCarsDate),
  };
};
export default connect(mapStateToProps)(CarRent);
