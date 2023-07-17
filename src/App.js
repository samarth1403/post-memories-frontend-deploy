import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './Components/MainLayout';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import HomePage from './Pages/HomePage';
import Form from './Components/Form';
import UpdateMemoryComponent from './Components/UpdateMemoryComponent';
import Profile from './Pages/Profile';
import { PrivateRoute } from './Routing/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainLayout />}>
          <Route exact index element={<HomePage />} />
          <Route exact path="/sign-in-page" element={<SignInPage />} />
          <Route exact path="/sign-up-page" element={<SignUpPage />} />
          <Route
            exact
            path="/add-memory-page"
            element={
              <PrivateRoute>
                <Form />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/update-memory-page/:id"
            element={
              <PrivateRoute>
                <UpdateMemoryComponent />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/my-profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
