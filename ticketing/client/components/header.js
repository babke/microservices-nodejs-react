import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} className="nav-link">
            {label}
          </Link>
        </li>
      );
    });

  return (
    <div className="container-fluid">
      {' '}
      <nav className="navbar navbar-light bg-light">
        <Link href="/" className="navbar-brand">
          {/* <a className="navbar-brand">Tix</a> */}
          Tix
        </Link>
        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">
            {currentUser ? currentUser : null}
            {links}
          </ul>
        </div>
      </nav>
    </div>
  );
};
