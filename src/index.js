import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import rootReducer from './reducers/index';
import './index.css';
import thunk from 'redux-thunk';
import 'fontsource-roboto';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

const Main = () => {
  React.useEffect(() => {
    document.title = 'Torre Wrap';
  });
  return <App />;
};

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root'),
);
