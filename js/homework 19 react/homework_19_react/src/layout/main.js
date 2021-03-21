import {Route, Switch, Redirect} from 'react-router-dom'

import Spoiler from '../tasks/Spoiler'
import RangeInput from '../tasks/RangeInput'
import PasswordConfirm from '../tasks/PasswordConfirm'
import Timer from '../tasks/Timer'

const Main = () =>
    <main>
        <Switch>
            <Redirect from="/" to="/spoiler" exact/>
            <Route path="/spoiler" component={Spoiler}/>
            <Route path="/range_input" component={RangeInput}/>
            <Route path="/password_confirm" component={PasswordConfirm}/>
            <Route path="/timer" component={Timer}/>
            <Route component={() => <h1>Шось нэ то...</h1>}/>
        </Switch>
    </main>

export default Main
