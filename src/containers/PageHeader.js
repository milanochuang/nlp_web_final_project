import { Outlet, Link } from "react-router-dom";

// 頁面標頭檔
export default function Layout() {
  return (
    <>
      <nav>
        <ul className="layout">
          {/* <li>
            <Link to="/">首頁</Link>
          </li> */}
          <li>
            <Link to="/Documentation">使用說明</Link>
          </li>
          <li>
            <Link to="/Latest">最新文章</Link>
          </li>
          <li>
            <Link to="/Materials">新聞素材</Link>
          </li>
          <li>
            <Link to="/Contact">聯絡我們</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
