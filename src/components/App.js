import React from 'react';
// import { Switch, Route, Redirect } from 'react-router';
import { Switch, Route} from 'react-router';
import { HashRouter } from 'react-router-dom';

import '../styles/theme.scss';

import Dashboard from '../pages/dashboard';

class App extends React.PureComponent {
  render() {
    return (
        <div>
            <HashRouter>
                <Switch>
                {/* <Route path="/" exact render={() => <Redirect to="/app/main"/>}/> */}
                    <Route path="/" exact component={Dashboard}/>
                    {/* <Route path="/app" exact render={() => <Redirect to="/app/main"/>}/>
                    <PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/error" exact component={ErrorPage}/>
                    <Route component={ErrorPage}/>
                    <Redirect from="*" to="/app/main/dashboard"/> */}
                </Switch>
            </HashRouter>
        </div>

    );
  }
}

export default App;
