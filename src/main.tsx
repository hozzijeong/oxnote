import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import registerPwaServiceWorker from './registerServiceWorker.ts';

registerPwaServiceWorker('/public/sw.js');

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
