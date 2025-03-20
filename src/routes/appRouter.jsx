import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/landingPage"; // ✅ Landing Page
import App from "../App"; // ✅ Main App

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const accessGranted = sessionStorage.getItem("access_granted"); // Check sessionStorage
    return accessGranted ? children : <Navigate to="/" />; // Redirect to home if not authorized
};

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
                <Route 
                    path="/app" 
                    element={
                        <ProtectedRoute>
                            <App />
                        </ProtectedRoute>
                    } 
                /> {/* Protected App Page */}
            </Routes>
        </Router>
    );
}

export default AppRouter;
