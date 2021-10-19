import React from 'react';
import { Switch, Route} from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import '../styles/theme.scss';

import Dashboard from '../pages/dashboard';

class App extends React.PureComponent {
  render() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        </div>

    );
  }
}

export default App;
