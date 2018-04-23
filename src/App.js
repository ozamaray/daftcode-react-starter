import { hot } from 'react-hot-loader';
import * as React from 'react';
import Home from './view/Home';
import Counter from './components/Counter';

import './styles/theme.sass';


function writeToConsole() {
  console.log('Success! Counter END'); // eslint-disable-line
}

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Home username="DaftCoder!" />
        <Counter id={'counter0'} from={60} to={10} onSuccess={writeToConsole} />
        <Counter id={'counter1'} from={50} to={20} onSuccess={writeToConsole} />
        <Counter id={'counter2'} from={40} to={30} onSuccess={writeToConsole} />
      </main>
    );
  }
}

export default hot(module)(App);
