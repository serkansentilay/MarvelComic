import React from 'react'
import { Provider } from 'react-redux'
import Router from './Router'
import { store } from './context/store'

const Wrapper = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

export default Wrapper
