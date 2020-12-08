import React, {Component} from 'react';

import HistoryService from 'src/service/history';

class Sender extends Component {
  state = {
    message: '',
  };

  send = () => {
    if (this.state.message.trim() === '') {
      if (this.state.message !== '') {
        this.setState({message: ''});
      }
      return;
    }

    HistoryService.send(this.state.message);

    this.setState({message: ''});
  };

  render() {
    return (
      <div className="type_msg">
        <div className="input_msg_write">
          <input
            value={this.state.message}
            onChange={(event) => (this.setState({message: event.target.value}))}
            onKeyUp={(event) => ((event.key === "Enter" || event.keyCode === 13) && this.send())}
            type="text" className="write_msg" placeholder="Type a message / Потупи в чат"/>
          <button
            onClick={this.send}
            className="msg_send_btn" type="button">
            <i className="fa fa-paper-plane-o" aria-hidden="true"/>
          </button>
        </div>
      </div>
    );
  }
}

export default Sender;