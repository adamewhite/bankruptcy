import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import 'normalize.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const Main = () => (
  <BrowserRouter basename={'/bankruptcy'}>
    <Route path="/" component={App} />
  </BrowserRouter>
);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
