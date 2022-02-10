import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Channel from "../channel/Channel";
import InboxView from "../inbox/InboxView";
import SettingView from "../settings/SettingView";
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
                <Redirect to="/inbox" />
              </Route>

              <Route path="/channel/:id" component={Channel} exact />
              <Route path="/inbox" component={InboxView} exact />
              <Route path="/preferences" component={SettingView} exact />
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
