import { useLocation, useNavigate } from "react-router-dom";
import { Home, Compass, Map, Users, User } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Skills", path: "/skill-passport" },
  { icon: Map, label: "Map", path: "/map" },
  { icon: Users, label: "Network", path: "/networking" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenPaths = ["/", "/processing"];
  if (location.pathname.startsWith("/quest")) return null;
  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-3xl border-t border-white/50 px-2 py-2 flex justify-around bg-white/60 backdrop-blur-xl">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                active ? "text-primary" : "text-muted-foreground/50"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[10px]">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
