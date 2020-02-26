import { put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
const NetInfo = require('@react-native-community/netinfo');
import { OFFLINE, ONLINE } from "redux-offline-queue";

import theme from '~/theme/light'
import Snackbar from 'react-native-snackbar';

export function* startWatchingNetworkConnectivity() {
  const channel = eventChannel(emitter => {
    NetInfo.isConnected.addEventListener("connectionChange", emitter);
    return () =>
      NetInfo.isConnected.removeEventListener("connectionChange", emitter);
  });

  try {
    while (true) {
      const isConnected = yield take(channel);

      if (isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
        Snackbar.show({
          title: 'Parece que você perdeu sua conexão de internet.',
          color: '#fff',
          duration: Snackbar.LENGTH_INDEFINITE,
          backgroundColor: theme.color.danger,
          action: {
            title: 'OK',
            color: '#fff',
            onPress: () => { /* Do something. */ },
          },
        });
      }
    }
  } finally {
    channel.close();
  }
}