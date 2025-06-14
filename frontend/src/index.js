// Make project backwards compatibility with IE
import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {
    UserProvider
} from 'contexts';
import App from './components/app';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

try{
    if(process.env.REACT_APP_ENABLE_WEB_VITALS == true)
        reportWebVitals(console.info);
}catch(webVitalsError){
    console.error(webVitalsError)
}

try{
    if(process.env.REACT_APP_ENABLE_SHOW_APP_VARS == true)
        Object.keys(process.env).map( key => {
            if(key.indexOf('REACT_APP') < 0)
                return;

            const value = process.env[key];
            console.debug(`${key}: ${value}`);
        });
}catch(showEnvVarsError){
    console.error(showEnvVarsError)
}
