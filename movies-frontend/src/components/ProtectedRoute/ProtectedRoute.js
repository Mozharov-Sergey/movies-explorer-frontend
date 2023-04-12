import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUserContext';

export default function ProtectedRoute({ component: Component, ...props }) {
  const [login, isLogin] = React.useState(false);

  React.useEffect(() => {
    // const jwt = localStorage.getItem('token')
    // console.log(jwt);
    // if(jwt) {
    //   isLogin(true)
    // }
    isLogin(true);
  }, []);

  return <Route path={props.path}>{() => (login ? <Component {...props} /> : <Redirect to="/" />)}</Route>;
}
