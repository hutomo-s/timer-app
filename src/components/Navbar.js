function Navbar() {
  return (
    <nav className='sticky-top shadow-sm bg-white'>
      <div className='container container-timer'>
        <div className='row'>
          <div className='col-12 ps-4 pt-2'>
            <a className="navbar-brand" href="">Timer App</a>
          </div>
          <div className='col-12'>
            <ul className="list-group list-group-horizontal">
              <li className="d-inline">
                <a className="nav-link text-body active" aria-current="page" href="#">TIMER</a>
              </li>
              <li className="d-inline">
                <a className="nav-link text-body" aria-current="page" href="https://github.com/hutomo-s/timer-app" target="_blank" rel="noreferrer">ABOUT</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar;