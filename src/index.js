import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css';
import Access from './components/access/Access';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Access />, document.getElementById('root'));
registerServiceWorker();
