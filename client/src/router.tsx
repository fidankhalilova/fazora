import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./Layout";
import Home from "./Features/Pages/Home";
import Login from "./Features/Pages/Login";
import HouseDetail from "./Features/Pages/HouseDetail";
import Register from "./Features/Pages/Register";
import { AuthProvider, useAuth } from "./Auth/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return !user ? <>{children}</> : <Navigate to="/" />;
};

const LayoutWithAuth = () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

const RoutesWithAuth = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    </AuthProvider>
  );
};

const HouseDetailWithAuth = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <HouseDetail />
      </ProtectedRoute>
    </AuthProvider>
  );
};

const LoginWithAuth = () => {
  return (
    <AuthProvider>
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    </AuthProvider>
  );
};

const RegisterWithAuth = () => {
  return (
    <AuthProvider>
      <PublicOnlyRoute>
        <Register />
      </PublicOnlyRoute>
    </AuthProvider>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithAuth />,
    children: [
      {
        path: "/",
        element: <RoutesWithAuth />,
      },
      {
        path: "/house/:id",
        element: <HouseDetailWithAuth />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginWithAuth />,
  },
  {
    path: "/register",
    element: <RegisterWithAuth />,
  },
]);
