import { Socket } from 'phoenix';
import { actions as socketActions } from '../socket';
import { getType } from 'typesafe-actions';
import config from '../../utils/config';

let socket = null;

// This looks like shit but works
const socketMiddleware = ({dispatch, getState}) => next => action => {
    switch (action.type) {
        case getType(socketActions.openConnection):
        
            socket = new Socket(`${config.apiUrl}/socket`, {params: {token: 'token'}});
            socket.onOpen(() => dispatch(socketActions.onSocketOpen()));
            socket.onError(() => dispatch(socketActions.onSocketError()));
            socket.onClose(() => dispatch(socketActions.onSocketClose()));

            socket.connect();
            break;

        case getType(socketActions.onSocketOpen):
            dispatch(socketActions.joinChannel('game:lobby'));
            break;

        case getType(socketActions.joinChannel):
            const channel = socket.channel(action.payload, {});
            channel.join()
                .receive('ok', resp => { console.log('Joined successfully', resp, channel); })
                .receive('error', resp => { console.log('Unable to join', resp); })
                .receive('timeout', () => console.log('Networking issue. Still waiting...'));

            channel.onError(() => dispatch(socketActions.onChannelError(action.payload)));
            channel.onClose(() => dispatch(socketActions.onChannelClose(action.payload)));
            break;

        default:
            break;
    }

    return next(action);
};

export default socketMiddleware;
