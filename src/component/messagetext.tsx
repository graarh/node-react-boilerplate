import React, {Component} from 'react';
import Linkify from 'linkify-it';
import topLevelDomains from 'tlds';
import {ChatMessage} from 'src/shared/message';

class MessageText extends Component {
  props: { message: ChatMessage }

  linkify = Linkify()
    .tlds(topLevelDomains)
    .tlds('onion', true);

  render() {
    const text = this.props.message.text;
    const links = this.linkify.match(this.props.message.text) || [];
    const blocks = [];

    let lastIndex = 0;
    links.forEach((link, idx) => {
      const before = text.substring(lastIndex, link.index);
      const current = (<a key={idx} href={link.url}
                          target="_blank" rel="noopener noreferrer">{link.text}</a>);

      lastIndex = link.lastIndex;
      blocks.push(before, current);
    });
    blocks.push(text.substring(lastIndex));

    return (<p>{blocks}</p>);
  }
}

export default MessageText;