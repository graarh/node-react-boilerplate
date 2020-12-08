import {ReplaySubject} from 'rxjs';
import {take} from 'rxjs/operators';
import {ChatMessage, messagesLimit} from 'src/shared/message';
import {io} from 'socket.io-client';

const serverUrl = process.env.NODE_ENV === 'development' ? 'localhost:80' : '';

const socket = io(`ws://${serverUrl}/`, {
  transports: ['websocket']
});

class ChatHistoryService {
  messages$ = new ReplaySubject<ChatMessage[]>(1);
  uid$ = new ReplaySubject<string>(1);

  constructor() {
    let currentUid = undefined;
    socket.on('uid', uid => {
      currentUid = uid;
      this.uid$.next(uid);
    });
    socket.on('history', messages => {
      this.messages$.next(messages);
    });
    socket.on('message', message => {
      this.messages$.pipe(take(1)).subscribe(messages => {
        messages.push(message);
        if (messages.length > messagesLimit) {
          messages.shift();
        }
        this.messages$.next(messages);

        if (message.uid !== currentUid) {
          new Notification('New chat message', {
            body: message.text,
          });
        }
      });
    });
  }

  send(text) {
    if (!socket.connected) {
      console.error("Not connected while trying to send text: ", text);
      return;
    }

    socket.emit('send', text);
  }
}

export default new ChatHistoryService();