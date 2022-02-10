import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Login from "./features/login/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./shared/helpers/firebase.helper";
import Home from "./features/home/Home";
import KCommandBar from "./shared/components/KCommandBar";

function App() {
  const [user] = useAuthState(firebaseAuth);

  return (
    <AppWrapper>
      <Switch>
        <Route path="/">
          {user ? (
            <KCommandBar>
              <Home />
            </KCommandBar>
          ) : (
            <Login />
          )}
        </Route>
      </Switch>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div``;
