import {Signup} from 'src/components/components'


import './App.css';

function App() {
  

  return (
    <>
      <div className='upperrow'>
        <div className='signup'>
          <Signup />
        </div>
        <div className='signin'></div>
        <div className='checkout'></div>
        <div className='signout'></div>
      </div>
      <div className='lowerrow'>
        <div className='get'></div>
        <div className='post'></div>
        <div className='put'></div>
        <div className='delete'></div>
        <div className='patch'></div>
      </div>
    </>
  );
}

export default App;
