import useCurrentUser from './hooks/useCurrentUser';
import React,{useEffect} from 'react'
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
