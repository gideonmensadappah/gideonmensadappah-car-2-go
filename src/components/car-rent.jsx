import React, { Component } from "react";
import { connect } from "react-redux";
import { CarList } from "./car-list";
import queryString from "querystring";
import { FilterCars } from "./FilterCars";
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
    const { cars, location, rentals } = this.props;

    const query = this.getQueryParams();
    const { size, carType, startDate, endDate } = query;

    const checkIsRented = (car, startDate, endDate) => {
      let flag = true;
      rentals.forEach((rental) => {
        if (rental.carId === car.number) {
          const isStartDateTaken =
            startDate >= rental.startDate && startDate <= rental.endDate;
          const isEndDateTaken =
            endDate >= rental.startDate && endDate <= rental.endDate;

          if (isStartDateTaken || isEndDateTaken) {
            flag = false;
          }
        }
      });
      return flag;
    };

    const filteredCars = cars.filter((car) => {
      const isInStock = checkIsRented(car, Number(startDate), Number(endDate));

      return car.size === Number(size) && car.type === carType && isInStock;
    });
    const startDateString = new Date(Number(startDate)).toDateString();
    const endDateString = new Date(Number(endDate)).toDateString();

    if (filteredCars.length > 0) {
      this.setState({
        cars: filteredCars,
        title: `Available Cars Between: ${startDateString} - ${endDateString}`,
      });
    } else {
      this.setState({
        title: `No Cars Available Between: ${startDateString}/ ${endDateString}`,
      });
    }
  };

  sortFunc = (cars) => {
    this.setState({
      cars: cars,
    });
  };

  handleClick = (car) => {
    const { history } = this.props;
    const query = this.getQueryParams();

    const { startDate, endDate } = query;

    history.push(
      `/user/rent?carNumber=${car.number}&startDate=${startDate}&endDate=${endDate}&p=${car.price}`
    );
  };
  noCarsRedirectToHome = (props) => {
    const { history } = this.props;
    history.push("/");
  };
  render() {
    const query = this.getQueryParams();
    const { startDate, endDate } = query;
    const { cars, title } = this.state;

    return (
      <>
        {cars.length > 0 ? (
          <>
            <h5 style={styles.headerText}>{title}</h5>
            <FilterCars sortFunc={this.sortFunc} car={cars} />
            <CarList
              cars={cars}
              pickUpDate={startDate}
              endDate={endDate}
              click={this.handleClick}
            />
          </>
        ) : (
          <div className="jumbotron">
            <h1 className="display-4">Hello, User!</h1>
            <p className="lead">We Are Out Of Cars On This Date</p>
            <hr className="my-4" />
            <input
              className="btn btn-primary btn-lg"
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
  rentals: state.rentals,
});

export default connect(mapStateToProps)(CarRent);
