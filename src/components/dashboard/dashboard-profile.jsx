import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { SideNav } from "./dashboard-side-nav";
const styles = {};
const Dashboard = () => {
  return (
    <div>
      <SideNav />
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return { storeState };
};
export default connect(mapStateToProps)(Dashboard);
