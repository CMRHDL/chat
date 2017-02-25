import axios from 'axios';
import Rx, { Observable } from 'rx';

axios.get('/api/chat')

const getMessages = () => Rx.Observable.fromPromise(axios.get('/api/chat'));
const saveMessages = (message) => Rx.Observable.fromPromise(axios.post('/api/chat', message));

export { getMessages, saveMessages }
