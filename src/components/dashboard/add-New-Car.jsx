import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { addNewCar } from "../../actions/action_types";

const styles = {
  imgThumbnail: {
    marginTop: "5px",
    width: "20px",
  },
};

class AddNewCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rented: false,
      imageUrl: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = createRef();
  }

  handleInputChange = (event) =>
    this.setState({ [event.target.id]: event.target.value });

  handleSubmit = (event) => {
    const { addNewCar, cars, history } = this.props;
    event.preventDefault();

    // File
    const img = document.createElement("img");
    img.src = URL.createObjectURL(this.fileInput.current.files[0]);

    img.height = 60;
    img.onload = () => URL.revokeObjectURL(this.src);
    const div = document.getElementById("imageStore");
    div.appendChild(img);

    const dateObj = new Date(this.state.year);
    const obj = {
      number: parseInt(this.state.number),
      maker: this.state.maker,
      name: this.state.name,
      size: parseInt(document.getElementById("size").value),
      image: URL.createObjectURL(this.fileInput.current.files[0]),
      year: dateObj.getFullYear(),
      price: parseInt(this.state.price),
      type: document.getElementById("type").value,
      kms: this.state.kms,
    };

    addNewCar(obj);
    history.push("/dashboard/inventory");
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name"> Name</label>
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="maker"> Maker </label>
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    name="maker"
                    className="form-control"
                    id="maker"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="year"> Year </label>
                  <input
                    onChange={this.handleInputChange}
                    type="date"
                    name="year"
                    className="form-control"
                    id="year"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">price Per Day</label>
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    name="price"
                    className="form-control"
                    id="price"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="number">Car Number </label>
                  <input
                    onChange={this.handleInputChange}
                    type="number"
                    name="number"
                    className="form-control"
                    id="number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="kms">kms </label>
                  <input
                    type="number"
                    onChange={this.handleInputChange}
                    name="kms"
                    className="form-control"
                    id="kms"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="type"> Type</label>
                  <select
                    onChange={this.handleInputChange}
                    id="type"
                    name="type"
                    className="form-control"
                  >
                    <option value="auto" defaultValue>
                      Auto
                    </option>
                    <option value="manual"> Manual</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="size">Size</label>
                  <select
                    onChange={this.handleInputChange}
                    name="size"
                    id="size"
                    className="form-control"
                  >
                    <option value="1" defaultValue>
                      {" "}
                      Small
                    </option>
                    <option value="2">Medium</option>
                    <option value="3">Large</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Choose Image</label>
                  <input
                    accept="image/*"
                    ref={this.fileInput}
                    type="file"
                    name="image"
                    className="form-control-file"
                    id="image"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div id="imageStore" style={styles.imgThumbnail}></div>
      </>
    );
  }
}

const mapStateToProps = (cars) => {
  return { cars };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewCar: (car) => dispatch(addNewCar(car)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewCar);
