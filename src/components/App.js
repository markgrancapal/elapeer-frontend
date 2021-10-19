import React from 'react';
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
                    <Route path="/" exact component={Dashboard}/>
                </Switch>
            </HashRouter>
        </div>

    );
  }
}

export default App;
