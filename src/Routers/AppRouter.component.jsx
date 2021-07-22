import { lazy, Suspense } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// import Homepage from '../pages/Homepage/Homepage.component'
import Header from '../components/Header/Header.component'
// import AddJournalPage from '../pages/AddJournalpage/AddJournalPage.component'
import PrivateRouter from './PrivateRouter.component'
// import GoogleLogIn from '../pages/GoogleLogInpage/GoogleLogIn.component'
// import JournalsPage from '../pages/JournalsPage/JournalsPage.component'
// import FriendOverviewPage from '../pages/FriendOverviewPage/FriendOverviewPage.component'
import ErrorBounday from '../components/Error-Boundary/ErrorBoundary.component'
import Spinner from '../components/Spinner/spinner.component'

const Homepage = lazy(() => import('../pages/Homepage/Homepage.component'))
const JournalsPage = lazy(() => import('../pages/JournalsPage/JournalsPage.component'))
const AddJournalPage = lazy(() => import('../pages/AddJournalpage/AddJournalPage.component'))
const FriendOverviewPage = lazy(() => import('../pages/FriendOverviewPage/FriendOverviewPage.component'))
const GoogleLogIn = lazy(() => import('../pages/GoogleLogInpage/GoogleLogIn.component'))




export const history = createBrowserHistory("../pages/Homepage/Homepage.component")
// console.log('history: ',history)
const Approuter = ({ currentUser }) => (
    <ErrorBounday>
        <Suspense fallback={<Spinner/>}>
            <Router history={history}>
                <Header />
                <Switch>
                    <PrivateRouter exact path="/" component={Homepage} />
                    <PrivateRouter path="/journals" component={JournalsPage} />
                    <PrivateRouter path="/add-journal" component={AddJournalPage} />
                    <PrivateRouter path="/:uid/overview" component={FriendOverviewPage} />
                    <Route path="/login" component={GoogleLogIn} />
                </Switch>
            </Router>
        </Suspense>

    </ErrorBounday>

)

export default Approuter