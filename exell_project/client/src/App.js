import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom' // 

// Material UI
import { Container } from '@material-ui/core'

// Components
import Main from './components/Main.js'
import AuthExample from './components/Test/Test.js'

const App = () => {

    return(
        <BrowserRouter>
            <Container maxWidth="lg">
                <Switch>
                    {/* <AuthExample/> */}
                    <Main/>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App