import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom' // 

// import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import Document from './components/Document/Document'
import MiniDrawer from './components/NavigationTest'
import Unsigned from './components/Unsigned/Unsigned.js'
import Signed from './components/Signed/Signed.js'

const App = () => {

    // get user from local storage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); 
    console.log(user)

    return(
        <BrowserRouter>
            <Container maxWidth="lg">
                {/* <MiniDrawer /> */}
                <Switch>
                    <Route path="/mydocuments" exact component={Signed} />
                    <Route path="/auth" component={Unsigned} />
                    <Route path="/" component={Unsigned} />
                    {/* <Route path="/document/:id" component={Document} /> */}
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App
