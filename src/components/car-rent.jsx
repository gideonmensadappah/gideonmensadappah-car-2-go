import React, { Component } from "react";
import { connect } from "react-redux";
import { CarList } from "./car-list";
import queryString from "querystring";

const styles = {
  headerText: {
    fontSize: "2rem",
  },
};
class CarRent extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      title: "",
    };
  }
  componentDidMount() {
    this.filterCarsByParams();
  }

  getQueryParams = () => {
    const { location } = this.props;
    const query = queryString.parse(
      location.search.slice(1, location.search.length)
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

    const rentalDateString = new Date(Number(rentalDate)).toDateString();
    const returnDateString = new Date(Number(returnDate)).toDateString();

    if (filteredCars.length > 0) {
      this.setState({
        cars: filteredCars,
        title: `Available Cars Between: ${rentalDateString} - ${returnDateString}`,
      });
      console.log(filteredCars);
    } else {
      console.log(filteredCars);
      this.setState({
        title: `No Cars Available Between: ${rentalDateString}/ ${returnDateString}`,
      });
    }
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
  noCarsRedirectToHome = (props) => {
    const { history } = this.props;
    history.push("/");
  };
  render() {
    const query = this.getQueryParams();
    const { rentalDate, returnDate } = query;
    const { cars, title } = this.state;

    return (
      <>
        {cars.length > 0 ? (
          <>
            <h5 style={styles.headerText}>{title}</h5>
            <CarList
              cars={cars}
              pickUpDate={rentalDate}
              returnDate={returnDate}
              click={this.handleClick}
            />
          </>
        ) : (
          <div class="jumbotron">
            <h1 class="display-4">Hello, User!</h1>
            <p class="lead">We Are Out Of Cars On This Date</p>
            <hr class="my-4" />
            <input
              class="btn btn-primary btn-lg"
              type="button"
              value="   Back To Home Page"
              onClick={this.noCarsRedirectToHome}
            />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

export default connect(mapStateToProps)(CarRent);
