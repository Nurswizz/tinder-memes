import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Feed from "./pages/Feed";
import ProtectedRoute from "./components/ProtectedRoute";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import Suggestions from "./pages/Suggestions";
import Bot from "./pages/Bot";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <Saved />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/suggestions"
            element={
              <ProtectedRoute>
                <Suggestions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bot"
            element={
              <ProtectedRoute>
                <Bot />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
