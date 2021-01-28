import useCurrentUser from './hooks/useCurrentUser';

import Approuter from './Routers/AppRouter.component';


function App() {

  const currentUser = useCurrentUser()
  console.log('usr from app.js ',currentUser);
  return (
    <div >
        <Approuter currentUser={currentUser}/>
    </div>
  );
}

export default App;
