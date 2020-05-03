/** 
import React, { Component } from "react";
import carDetail from "./carDetail.css";
import metadate from "../metadata/dummyData.json";

class CarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carNumber: this.props.match.params.carNumber,
      carDetail: [],
    };
  }

  componentDidMount() {
    const data = metadate.filter((car) => car.number == this.state.carNumber);
    this.setState({
      carDetail: data,
    });
  }

  //Rent cart function
  addToCart = (e, data) => {
    e.preventDefault();
    const date = {
      pickUp: this.props.location.state.pickUp,
      endDate: this.props.location.state.endDate,
    };
    this.props.history.push({
      pathname: `/car2go-payment/${data.number}`,
      state: date,
    });
  };

  //Back to car list function
  sendBackToList() {
    this.props.history.goBack();
  }
  render() {
    return (
      <React.Fragment>
        <div className="detail-container">
          {this.state.carDetail.map((car, index) => (
            <div className="detail-row" key={index}>
              {" "}
              <div className="card" style={{ width: "18rem" }}>
                <img src={car.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{car.maker + " " + car.name}</h5>
                  <span>Year:{car.year}</span> <br />
                  <span>
                    <p className="card-text">kms: {car.kms}</p>
                  </span>
                  <input
                    type="button"
                    value=" cart "
                    onClick={(e, data) => this.addToCart(e, car)}
                    className="btn btn-success mr-5"
                  />
                  <input
                    type="button"
                    value="Back"
                    onClick={this.sendBackToList.bind(this)}
                    className="btn btn-success"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default CarDetail;
*/
