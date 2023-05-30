import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import HeaderLogin from './components/HeaderLogin';

function App() {
  return (
    <div
      className="bg-dark-blue-lol max-w-full h-screen flex flex-col font-volkorn"
    >
      <div>
        <HeaderLogin />
      </div>

      <div
        className="flex justify-center items-center h-full"
      >
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </Switch>
      </div>
    </div>
  );
}

export default App;
