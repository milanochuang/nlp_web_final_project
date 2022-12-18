import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <>
        <nav>
            <ul className="layout">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Documentation">Documentation</Link>
                </li>
                <li>
                    <Link to="/Latest">Latest</Link>
                </li>
                <li>
                    <Link to="/Materials">Materials</Link>
                </li>
            </ul>
        </nav>
        
        <Outlet/>
        </>
    )
};