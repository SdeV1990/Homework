import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom' // 

// Material UI
import { Container } from '@material-ui/core'// DO NOT DELETE: this component somehow provides compressing of nested tables

// Components
import Main from './components/Main.js'
// import AuthExample from './components/Test/Test.js'

const App = () => {

    return(
        <BrowserRouter>
            <Switch>
                {/* <AuthExample/> */}
                <Main/>
            </Switch>
        </BrowserRouter>
    )
}

export default App