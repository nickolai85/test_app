const OAUTH_CLIENT_ID = 2 // your backend client id
const OAUTH_CLIENT_SECRECT = '' // your backend client secret
const API_URL = 'http://localhost:10177/' // your backend url
const LOGIN_URL = `${API_URL}oauth/token` // login url
const SOCKET_SERVER = 'http://192.168.2.102:6001' // your echo server address make your local IP address with port as we defined during installation
export { LOGIN_URL, API_URL, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRECT, SOCKET_SERVER }