"use client";
import Link from "next/link";
import "./page.css";

const routes = [
  { path: "/demos/Rainbow", name: "Rainbow Demo" },
  { path: "/demos/AirPods", name: "AirPods Demo" },
  { path: "/demos/Baisc", name: "Baisc Demo" },
  { path: "/demos/NavLink", name: "NavLink Demo" },
  { path: "/demos/Parallax", name: "Parallax Demo" },
  { path: "/three/basic", name: "Three.js Basic Demo" },
];

export default function Home() {
  return (
    <div className="route-list-container">
      <h1 className="route-list-title">demos</h1>
      <ul className="route-list-ul">
        {routes.map((route) => (
          <li key={route.path} className="route-list-li">
            <Link
              href={route.path}
              className="block w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400  text-lg font-medium text-center shadow hover:from-cyan-400 hover:to-blue-500 transition route-list-link"
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
