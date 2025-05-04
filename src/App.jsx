import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

function App() {
  const [name, setName] = useState(null);
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("popboxUser");
    if (savedUser) {
      setName(savedUser);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === "1234") {
      localStorage.setItem("popboxUser", name);
      setLoggedIn(true);
    } else {
      alert("Cod PIN greșit.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("popboxUser");
    setName(null);
    setPin("");
    setLoggedIn(false);
  };

  if (loggedIn === null) {
    return (
      <div className="text-center text-blue-600 p-6 font-semibold text-lg">
        Se încarcă sesiunea...
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Overlay întunecat + blur */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-2xl z-0" />

      <div className="relative z-10 w-full max-w-sm bg-white bg-opacity-40 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white border-opacity-30">
        {loggedIn && name ? (
          <Dashboard user={name} onLogout={handleLogout} />
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center text-white mb-6">
              PopBox – Login Familie
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Prenume
                </label>
                <input
                  type="text"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Petra"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Cod PIN
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="****"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Intră în PopBox
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
