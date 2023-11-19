import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashbaordPage from "./pages/DashbaordPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./utils/store/store";
import Alert from "./components/Alert";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<DashbaordPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
export default App;
