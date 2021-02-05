import useCurrentUser from './hooks/useCurrentUser';
import React from 'react'
import Approuter from './Routers/AppRouter.component';


function App() {

  const currentUser = useCurrentUser()

  return (
    <div >
        <Approuter currentUser={currentUser}/>
    </div>
  );
}

export default App;
