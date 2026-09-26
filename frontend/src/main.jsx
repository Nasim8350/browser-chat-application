import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import {
  AuthProvider
} from "./context/AuthContext.jsx";


import {
  ChatProvider
} from "./context/ChatContext.jsx";


import "./styles/global.css";



ReactDOM.createRoot(
  document.getElementById("root")
)
  .render(


    <AuthProvider>


      <ChatProvider>


        <App />


      </ChatProvider>


    </AuthProvider>


  );