// Dashboard.jsx
import { useState } from "react";
import Gallery from "./Gallery";
import Messages from "./Messages";

function Dashboard({ user, onLogout }) {
  const [view, setView] = useState("home");

  if (view === "gallery") {
    return <Gallery onBack={() => setView("home")} />;
  }

  if (view === "messages") {
    return <Messages user={user} onBack={() => setView("home")} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-xl font-semibold mb-6 text-white text-center">
        Bun venit în PopBox, {user}!
      </h2>
      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => setView("gallery")}
          className="w-full py-3 rounded-2xl font-semibold text-white text-lg bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition shadow-md"
        >
          🖼️ Galerie
        </button>
        <button
          onClick={() => setView("messages")}
          className="w-full py-3 rounded-2xl font-semibold text-white text-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition shadow-md"
        >
          💬 Mesaje
        </button>
        <button
          onClick={onLogout}
          className="w-full py-2 rounded-2xl font-semibold text-white text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition shadow-md"
        >
          ⬅ Ieși din cont
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
