import './style.css';
import Router from './Router';
import { UseUserContext } from "./userContext";
import { useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import Loading from "./components/Loading"
function App() {
  const { setIsLoggedIn, setUser } = UseUserContext()
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('accessToken') != null) {
      fetch("https://iis-api.herokuapp.com/users/current", {
        method: 'GET',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        }
      })
        .then(response => response.json())
        .then(
          (response) => {
            setIsLoaded(true);
            setUser(response);
            setIsLoggedIn(true)
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
    else{
      setIsLoaded(true)
    }
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return(
      <Loading/>)
  } else {
    return (
      <Router />
    );
  }
}
export default App;
