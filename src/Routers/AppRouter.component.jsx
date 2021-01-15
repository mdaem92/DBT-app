import {Switch , Route , Router} from 'react-router-dom'
import {createBrowserHistory} from 'history' 
import Homepage from '../pages/Homepage/Homepage.component'
import Header from '../components/Header/Header.component'


export const history =createBrowserHistory("../pages/Homepage/Homepage.component")
// console.log('history: ',history)
const Approuter = ()=>(
    
    <Router history={history}>
        <Header/>
        <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/charts" render={()=><div>charts page</div>}/>
            <Route exact path="/add-journal" render={()=><div>add journal page</div>}/>
        </Switch>
    </Router>
)

export default Approuter