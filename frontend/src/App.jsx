// frontend/src/App.jsx


import {

  BrowserRouter,

  Routes,

  Route

} from "react-router-dom";





import Landing from "./pages/Landing";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import ProfilePage from "./pages/ProfilePage";







function App() {



  return (


    <BrowserRouter>


      <Routes>



        <Route

          path="/"

          element={<Landing />}

        />






        <Route

          path="/login"

          element={<Login />}

        />






        <Route

          path="/register"

          element={<Register />}

        />






        <Route

          path="/dashboard"

          element={<Dashboard />}

        />






        {/* ===============================
            PROFILE PAGE
        =============================== */}



        <Route

          path="/profile"

          element={<ProfilePage />}

        />





      </Routes>


    </BrowserRouter>


  );

}



export default App;