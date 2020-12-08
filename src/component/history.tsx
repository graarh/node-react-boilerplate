import React, {Component} from 'react';

import RxComponent from 'src/rx-component';

import MessageToYou from 'src/component/messagetoyou';
import HistoryService from 'src/service/history';
import MessageFromYou from "src/component/messagefromyou";

class History extends Component {
  el: HTMLElement

  state = {
    currentUserUid: '',
    messages: [],
  };

  scrollToBottom = () => {
    this.el.scrollIntoView({behavior: "smooth"});
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="msg_history">
        {this.state.messages.map((element, key) => {
          if (element.uid === this.state.currentUserUid) {
            return (<MessageFromYou message={element} key={key}/>)
          } else {
            return (<MessageToYou message={element} key={key}/>)
          }
        })}
        <div ref={el => {
          this.el = el;
        }}/>
      </div>
    );
  }
}

export default RxComponent(History,
  {
    provider: HistoryService.messages$,
    map: messages => ({messages: messages}),
  },
  {
    provider: HistoryService.uid$,
    map: uid => ({currentUserUid: uid}),
  }
);