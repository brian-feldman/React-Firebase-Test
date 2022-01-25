import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Channel from "../channel/Channel";
import HomeSidebar from "./ui/HomeSidebar";

export default function Home() {
  return (
    <DashboardWrapper>
      <div className="dashboard-wrapper">
        <HomeSidebar />
        <div className="dashboard-routes">
          <div className="wrap">
            <Switch>
              <Route path="/" exact>
                <br />
                <br />
                <br />
                <h1>Nothing here, select channel</h1>
              </Route>
              <Route path="/channel/:id" exact>
                <Channel />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  .dashboard-wrapper {
    display: grid;
    grid-template-columns: 260px 1fr;
  }
  .dashboard-routes {
    background: #f7f8fc;
  }
`;
