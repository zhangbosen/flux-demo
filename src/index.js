import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Panel from './views/Panel';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Panel />, document.getElementById('root'));
registerServiceWorker();
