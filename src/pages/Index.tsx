
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: number;
    username: string;
    userType: string;
  } | null>(null);

  const handleLogin = (user: { id: number; username: string; userType: string }) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Juice Depot Management System</h1>
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <span>Welcome, {currentUser?.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        {isLoggedIn ? (
          <Dashboard user={currentUser!} />
        ) : (
          <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <LoginForm onLogin={handleLogin} />
          </div>
        )}
      </main>
      
      <footer className="bg-gray-100 p-4 border-t">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; 2025 Juice Depot Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
