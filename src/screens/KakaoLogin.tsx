import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios, { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';
import { setItem } from '@/utils/AsyncStorage';
import TitleBar from '@/components/common/TitleBar';
import { login } from '@/apis/user';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const LogInProgress = (data: any) => {
    const exp = 'code=';
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var request_code = data.substring(condition + exp.length);
      requestToken(request_code);
    }
  };

  const requestToken = async (request_code: number) => {
    var accessToken = 'none';
    var request_token_url = `${process.env.EXPO_PUBLIC_KAKAO_AUTH_API_URL}/oauth/token`;
    axios({
      method: 'post',
      url: request_token_url,
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY,
        redirect_uri: process.env.EXPO_PUBLIC_KAKAO_REDIRECT_URI,
        code: request_code,
      },
    })
      .then((response) => {
        accessToken = response.data.access_token;
        requestUserInfo(accessToken);
        storeData(accessToken);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const requestUserInfo = (AccessToken: string) => {
    axios({
      method: 'GET',
      url: `${process.env.EXPO_PUBLIC_KAKAO_API_URL}/v2/user/me`,
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    })
      .then((res) => {
        const { email, profile } = res.data.kakao_account;
        login({ email, password: '@ilydsm123' })
          .then((res) => {
            setItem('access_token', res.data.access_token);
            setItem('refresh_token', res.data.refresh_token);
            navigation.reset({ routes: [{ name: 'Main' }]});
          })
          .catch((err: AxiosError<AxiosError>) => {
            switch (err.response?.data.status) {
              case 403:
                return navigation.navigate('SignUp', { email, password: '@ilydsm123' });
              default:
                return navigation.navigate('Login');
            }
          });
      })
      .catch(() => console.log('에러'));
  };

  const storeData = async (returnValue: string) => {
    try {
      await setItem('userAccessToken', returnValue);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar
        title=""
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `${process.env.EXPO_PUBLIC_KAKAO_AUTH_API_URL}/oauth/authorize?response_type=code&client_id=${process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.EXPO_PUBLIC_KAKAO_REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          LogInProgress(event.nativeEvent['url']);
        }}
      />
    </SafeAreaView>
  );
};
