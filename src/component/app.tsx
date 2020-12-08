import React, {Component} from 'react';

import History from 'src/component/history';
import Sender from 'src/component/sender';

class App extends Component {
  render() {
    return (
      <div className="mesgs">
        <History/>
        <Sender/>
      </div>
    );
  }
}

export default App;
