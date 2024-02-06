import React from 'react'
import Routes from './routes'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, reduxStore } from './redux/store';
import ToastMessage from './components/ToastMessage';

const App = () => {
    return (
        <>
            <Provider store={reduxStore}>
                <PersistGate
                    loading={null}
                    persistor={persistor}
                >
                    <Routes />
                </PersistGate>
            </Provider>
            <ToastMessage position={'top'} />
        </>
    )
}

export default App;
