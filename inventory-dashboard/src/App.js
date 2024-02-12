// App.js

// import React from 'react';
// import ItemList from './components/ItemList';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Welcome to My Inventory Dashboard</h1>
//       </header>
//       <main>
//         <ItemList />
//       </main>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemList from './components/ItemList';
import Login from './components/Login';
import Registration from './components/Registration';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordResetConfirm from './components/PasswordResetConfirm';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My Inventory Dashboard</h1>
        </header>
        <main>
          <Routes>
            {/* <Route path="/" element={localStorage.getItem('token') ? <ItemList /> : <Navigate replace to="/login" />} /> */}
            <Route path="/" element={localStorage.getItem('token') ? <ItemList /> :  <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            {/* <Route path="/password-reset-request" element={<PasswordResetRequest />} />
            <Route path="/password-reset/:uid/:token" element={<PasswordReset />} />
            <Route path="/password-reset-confirm/:uidb64/:token" element={<PasswordResetConfirm />} /> */}
            <Route path="/password-reset-request" element={<PasswordResetRequest />} />
            <Route path="/password-reset-confirm//:uidString" element={<PasswordResetConfirm />} />
            {/* <Route path="*" element={<PasswordResetRequest />} /> */}
         


            

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


