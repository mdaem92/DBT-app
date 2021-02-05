import {Switch , Route , Router} from 'react-router-dom'
import {createBrowserHistory} from 'history' 
import Homepage from '../pages/Homepage/Homepage.component'
import Header from '../components/Header/Header.component'
import AddJournalPage from '../pages/AddJournalpage/AddJournalPage.component'
import PrivateRouter from './PrivateRouter.component'
import GoogleLogIn from '../pages/GoogleLogInpage/GoogleLogIn.component'
import JournalsPage from '../pages/JournalsPage/JournalsPage.component'

export const history =createBrowserHistory("../pages/Homepage/Homepage.component")
// console.log('history: ',history)
const Approuter = ({currentUser})=>(
    
    <Router history={history}>
        <Header/>
        <Switch>
            <PrivateRouter exact path="/" component={Homepage} currentUser={currentUser}/>
            <PrivateRouter exact path="/journals" component={JournalsPage} currentUser={currentUser}/>
            <PrivateRouter exact path="/add-journal" component={AddJournalPage}  currentUser={currentUser} />
            <Route  path="/login" component={GoogleLogIn}/>
        </Switch>
    </Router>
)

export default Approuter