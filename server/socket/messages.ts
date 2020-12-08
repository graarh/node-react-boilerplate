import {Socket} from 'socket.io';
import {v4 as uuid} from 'uuid';
import {ChatMessage, messagesLimit} from 'server/shared/message';
import moment from 'moment';

const messages: ChatMessage[] = [];
let lastMessageId = 0;

export function handleMessages(): (socket: Socket) => void {
  return socket => {
    const uid = uuid();
    socket.local.emit('uid', uid);
    socket.local.emit('history', messages);

    socket.on('send', (text: string) => {
      const message = {
        id: lastMessageId++,
        uid: uid,
        text: text,
        timestamp: moment().utc().unix(),
      }
      messages.push(message);
      if (messages.length > messagesLimit) {
        messages.shift();
      }
      socket.local.emit('message', message);
      socket.broadcast.emit('message', message);
    });
  };
}