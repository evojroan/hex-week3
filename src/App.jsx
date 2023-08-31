import {
  Signup,
  Signin,
  Checkout,
  Signout,
  Todolist
} from 'src/components/components';
import { useState } from 'react';

import './App.css';

function App() {
  const [token, setToken] = useState('');

  //從 <Signin/>取得 token，再給其他元件使用
  function getToken(value) {
    setToken(value);
  }

  return (
    <div className='app'>
      <div className='upperrow'>
        <div className='signup'>
          <Signup />
        </div>
        <div className='signin'>
          <Signin getToken={getToken} />
        </div>
        <div className='checkout'>
          <Checkout token={token} />
        </div>
        <div className='signout'>
          <Signout token={token} />
        </div>
      </div>
      <div className='lowerrow'>
        <div className='todolist'>
          <Todolist token={token}/>
        </div>
        <div className='patch'></div>
      </div>
    </div>
  );
}

export default App;
