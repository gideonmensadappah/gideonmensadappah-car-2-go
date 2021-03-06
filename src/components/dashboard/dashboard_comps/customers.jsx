import React from "react";
import { connect } from "react-redux";
const CustomersList = ({ customers }) => {
  return (
    <>
      {customers.map((user, i) => (
        <tr className="table table-dark" key={i}>
          <th scope="row">{i + 1}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.carNumber}</td>
        </tr>
      ))}
    </>
  );
};

const Customers = ({ customers }) => {
  return (
    <>
      <div className="col-8">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Car Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              <CustomersList customers={customers} />
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};
const mapStateToProps = ({ customers }) => {
  return { customers };
};
export default connect(mapStateToProps)(Customers);
