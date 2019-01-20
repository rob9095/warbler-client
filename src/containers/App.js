import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { configureStore } from '../store'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';
import {setCurrentUser, setAuthorizationToken} from '../store/actions/auth';
import jwtDecode from 'jwt-decode';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6ec6ff',
      main: '#2196f3',
      dark: '#2196f3',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffaf53',
      main: '#f37e21',
      dark: '#ba5000',
      contrastText: '#fff',
    },
  },
});

const store = configureStore();

if(localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	// prevent someone from manually tampering with the key of jwtToken in localStorage
	try {
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
	} catch(e) {
		store.dispatch(setCurrentUser({}));
	}
}

const App = () => (
	<MuiThemeProvider theme={theme}>
	<Provider store={store}>
		<Router>
			<div className="onboarding mdl-layout__container">
				<Navbar />
				<Main />
				<Footer />
			</div>
		</Router>
	</Provider>
</MuiThemeProvider>
);

export default App;
