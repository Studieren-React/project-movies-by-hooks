import './Header.css';

export function Header() {
  return (
    <nav className="orange darken-4 header-nav">
      <div className="nav-wrapper">
        <a href="!#" className="brand-logo">
          React Movies
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="!#">Later</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
