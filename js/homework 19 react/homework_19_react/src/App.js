import './App.css';
import Layout from './layout';

import {BrowserRouter as Router} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

const history = createHistory()

function App() {
  return (
    <Router history={history}>
        <Layout/>
    </Router>
  )
}

export default App
