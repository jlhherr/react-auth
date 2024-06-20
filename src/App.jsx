import { useState } from "react";
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/Profile";
import Signup from "./components/Auth/Signup";

function App() {
    switch (window.location.pathname) {
        case "/login":
            return <Login />;
        case "/profile":
            return <Profile />;
        case "/signup":
            return <Signup />;
        default:
            return <Login />;
    }
}

export default App;
