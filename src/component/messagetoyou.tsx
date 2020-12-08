import React, {Component} from 'react';
import moment from 'moment';

import MessageText from 'src/component/messagetext';
import {ChatMessage} from 'src/shared/message';

class MessageToYou extends Component {
  props: { message: ChatMessage }

  render() {
    const date = moment.unix(this.props.message.timestamp);

    return (
      <div className="incoming_msg">
        <div className="incoming_msg_img">
          <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/>
        </div>
        <div className="received_msg">
          <div className="received_withd_msg">
            <MessageText message={this.props.message}/>
            <span className="time_date">
              {date.format("H:mm")}
              &nbsp;|&nbsp;
              {date.format("MMMM Do YYYY")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageToYou;