import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import UserOptions from "./components/Header/UserOptions";
import LandingPage from "./components/Landing/LandingPage";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import {
  UserLandingPage,
  ProfileScreen,
  UpdateProfile,
  UpdatePassword,
  ForgotPassword,
  ResetPassword,
  Map,
  MyNotes,
  SingleNote,
  CreateNote,
} from "./Userscreens";

import {
  AdminLandingPage,
  CreatePin,
  SinglePin,
  PinDetails,
  Pins,
} from "./AdminScreens";

import store from "./store";
import { loadUser } from "./actions/userActions";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const [search, setSearch] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      {isAuthenticated && <UserOptions user={user} />}
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/admin/landing" component={AdminLandingPage} />
        <Route path="/users/landing" component={UserLandingPage} />
        <Route path="/map" component={Map} />
        <Route path="/pindetails/:id" component={PinDetails} />
        <main className="App">
          <Route path="/password/forgot" component={ForgotPassword} />
          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />

          <ProtectedRoute path="/createnote" component={CreateNote} />
          <ProtectedRoute path="/note/:id" component={SingleNote} />
          <ProtectedRoute
            path="/pins"
            component={({ history }) => (
              <Pins search={search} history={history} />
            )}
          />
          <ProtectedRoute
            path="/mynotes"
            component={({ history }) => (
              <MyNotes search={search} history={history} />
            )}
          />
          <ProtectedRoute path="/profile" component={ProfileScreen} />
          <ProtectedRoute path="/me/update" component={UpdateProfile} />
          <ProtectedRoute path="/password/update" component={UpdatePassword} />
          <ProtectedRoute
            path="/createpin"
            isAdmin={true}
            component={CreatePin}
          />
          <ProtectedRoute
            path="/admin/pin/:id"
            isAdmin={true}
            component={SinglePin}
          />
        </main>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
