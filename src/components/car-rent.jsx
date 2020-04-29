import React, { Component } from "react";
import { connect } from "react-redux";
import { CarList } from "./car-list";
import queryString from "querystring";

const styles = {
  headerText: {
    fontSize: "2em",
  },
};
class CarRent extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
    };
  }
  componentDidMount() {
    this.filterCarsByParams();
  }

  getQueryParams = () => {
    const { location } = this.props;
    const query = queryString.parse(
      location.search.slice(1, location.search.length - 1)
    );
    return query;
  };

  filterCarsByParams = () => {
    const { cars, location } = this.props;
    const query = this.getQueryParams();
    const { size, carType, rentalDate, returnDate } = query;

    const filteredCars = cars.filter((car) => {
      const isInStock =
        !car.rentedFrom ||
        car.rentedFrom > Number(returnDate) ||
        car.rentedUntil < Number(rentalDate);
      return car.size === Number(size) && car.type === carType && isInStock;
    });

    this.setState({ cars: filteredCars });
  };

  //handle click function
  handleClick = (car) => {
    const { history } = this.props;
    const query = this.getQueryParams();
    const { rentalDate, returnDate } = query;

    history.push(
      `/user/rent?carNumber=${car.number}&rentalDate=${rentalDate}&returnDate=${returnDate}`
    );
  };
  render() {
    const query = this.getQueryParams();
    const { rentalDate, returnDate } = query;
    const { cars } = this.state;
    const rentalDateString = new Date(Number(rentalDate)).toDateString();
    const returnDateString = new Date(Number(returnDate)).toDateString();
    return (
      <>
        <p
          style={styles.headerText}
        >{`Available Cars between: ${rentalDateString}/ ${returnDateString}`}</p>
        <CarList
          cars={cars}
          pickUpDate={rentalDate}
          returnDate={returnDate}
          click={this.handleClick}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

export default connect(mapStateToProps)(CarRent);
