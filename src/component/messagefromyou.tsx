import React, {Component} from 'react';
import moment from 'moment';

import MessageText from 'src/component/messagetext';
import {ChatMessage} from 'src/shared/message';

class MessageFromYou extends Component {
  props: { message: ChatMessage }

  render() {
    const date = moment.unix(this.props.message.timestamp);

    return (
      <div className="outgoing_msg">
        <div className="sent_msg">
          <MessageText message={this.props.message}/>
          <span className="time_date">
              {date.format("H:mm")}
            &nbsp;|&nbsp;
            {date.format("MMMM Do YYYY")}
            </span>
        </div>
      </div>
    );
  }
}

export default MessageFromYou;