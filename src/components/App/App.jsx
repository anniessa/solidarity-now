import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
const {TranslationServiceClient} = require('@google-cloud/translate');

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import OffersForm from '../OffersForm/OffersForm';
import SolidarityWeb from '../SolidarityWeb/SolidarityWeb';
import BottomNav from '../BottomNav/BottomNav';
import ResourcesPage from '../ResourcesPage/ResourcesPage';
import AnimatedLanding from '../AnimatedLanding/AnimatedLanding';


import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  // Instantiates a client
const translationClient = new TranslationServiceClient();

const projectId = 'solidarity-now';
const location = 'global';
const text = 'Hello, world!';

async function translateText() {
  // Construct request
  const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      mimeType: 'text/plain', // mime types: text/plain, text/html
      sourceLanguageCode: 'en',
      targetLanguageCode: 'es',
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  for (const translation of response.translations) {
      console.log(`Translation: ${translation.translatedText}`);
  }
}
translateText();


  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    
    <Router>
      <div>
        <Nav />
        
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/landing" />

          <Route exact path="/landing">
            <AnimatedLanding />
          </Route>

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route
          exact
          path="/resources">
          <ResourcesPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path='/offersForm'>
            {/* logged in shows Offers/Request Form else shows LoginPage */}
            <OffersForm />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path='/solidarityWeb'>
            {/* logged in shows Solidarity Web else shows LoginPage */}
            <SolidarityWeb />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /home page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
  
}

export default App;
