// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ component: Component, ...props }) {
//   return (
//     <Route path={props.path}>
//       {() => (props.isLoggedIn ? <Component {...props} /> : <Navigate to="/" />)}
//     </Route>
//   );
// }


import React from 'react';
import {Navigate} from 'react-router-dom';

function ProtectedRoute ({isLoggedIn, children}) {
  
  return isLoggedIn ? children : <Navigate to="/" replace />
}

export default ProtectedRoute;

