/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useEffect} from 'react';
import type {Node} from 'react';
import {WebView} from 'react-native-webview';
import {Platform, Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const WebviewContainer = ({handleSetRef, handleEndLoading}) => {
  const os = Platform.OS;

  const isAndroid = os === 'android';

  const uri = 'https://exitnow.netlify.app/';

  /**
   * @note use for development
   */
  const devUri = isAndroid ? 'http://10.0.2.2:3000' : 'http://localhost:3000/';

  const handleOnMessage = ({nativeEvent: {data}}) => {
    console.log(data);
  };

  const marginTop = isAndroid ? 0 : 25;

  const SPLASH_DELAY = 300;

  useEffect(() => {
    const splashTimeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, SPLASH_DELAY);

    return () => clearTimeout(splashTimeoutId);
  }, []);

  const customUserAgent =
    'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.97 Mobile Safari/537.36';

  return (
    <>
      <WebView
        userAgent={customUserAgent}
        onLoadEnd={handleEndLoading}
        onMessage={handleOnMessage}
        ref={handleSetRef}
        source={{uri}}
        /**
         * @note use for development
         */
        // source={{uri: devUri}}
        style={{
          marginTop,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      />
    </>
  );
};

const App: () => Node = () => {
  let webviewRef = useRef();

  const handleSetRef = _ref => {
    webviewRef = _ref;
  };

  const handleEndLoading = e => {
    console.log('handleEndLoading');
    webviewRef.postMessage('Finish load and send message to webview');
  };

  return (
    <WebviewContainer
      webviewRef={webviewRef}
      handleSetRef={handleSetRef}
      handleEndLoading={handleEndLoading}
    />
  );
};
export default App;
