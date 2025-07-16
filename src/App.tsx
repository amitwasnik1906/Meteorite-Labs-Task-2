import { useEffect, useState } from "react"
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/Signup";
import type { User, AuthState } from "./utils/types";

// Main App Component
const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');

  // Check localStorage for user and token on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        const user: User = JSON.parse(storedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          token: storedToken
        });
      } catch (e) {
        // If parsing fails, clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleAuth = (authData: any) => {
    setAuthState({
      isAuthenticated: true,
      user: authData.user,
      token: authData.jwt
    });
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('token', authData.token);
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (authState.isAuthenticated) {
    return <Dashboard authState={authState} onLogout={handleLogout} />;
  }

  return currentView === 'login' ? (
    <LoginForm
      onLogin={handleAuth}
      switchToSignup={() => setCurrentView('signup')}
    />
  ) : (
    <SignupForm
      onSignup={handleAuth}
      switchToLogin={() => setCurrentView('login')}
    />
  );
};

export default App;