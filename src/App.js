import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './timer.css';

function App() {

  const defaultSeconds = 60
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [showStartBtn, setShowStartBtn] = useState(true)
  const [showResumeBtn, setShowResumeBtn] = useState(false)

  const timer = useRef

  const getSecondsRemaining = () => {
    setSeconds((seconds) => {
      return ((seconds > 0) && seconds - 1) || 0
    })
  }

  const handleClickStart = () => {
    timer.current = setInterval(() => {
      getSecondsRemaining()
    }, 1000)

    setShowStartBtn(false)
  }

  const handleClickPause = () => {
    clearInterval(timer.current)
    setShowResumeBtn(true)
  }

  const handleClickResume = () => {
    timer.current = setInterval(() => {
      getSecondsRemaining()
    }, 1000)

    setShowResumeBtn(false)
  }

  const handleClickReset = () => {
    clearInterval(timer.current)
    setSeconds(defaultSeconds)
    setShowStartBtn(true)
    setShowResumeBtn(false)
  }

  return (
    <>
      <nav className='sticky-top shadow-sm'>
        <div className='container container-timer'>
          <div className='row'>
            <div className='col-12 ps-4 pt-2'>
              <a className="navbar-brand" href="">Timer App</a>
            </div>
            <div className='col-12'>
              <ul className="list-group list-group-horizontal">
                <li className="d-inline"><a className="nav-link text-body active" aria-current="page" href="#">TIMER</a></li>
                <li className="d-inline"><a className="nav-link text-body" aria-current="page" href="#">MY PROFILE</a></li>
                <li className="d-inline"><a className="nav-link text-body" aria-current="page" href="#">ABOUT</a></li>
              </ul>
            </div>

          </div>
        </div>
      </nav>

      <div className='container-sm pt-4 container-timer'>
        <div className='row'>
          <div className='col-12'>
            <p>Good evening, Hutomo</p>

            <ul className="list-group">
              <li className="list-group-item">
                <p>Push Up</p>
                <h1>{seconds}</h1>
                {
                  showStartBtn ?
                    (
                      <div>
                        <button type="button" className="btn btn-success" onClick={handleClickStart}>Start</button>
                      </div>
                    ) :
                    (
                      <div>
                        { showResumeBtn ? 
                            (
                              <button type="button" className="btn btn-primary me-3" onClick={handleClickResume}>Resume</button>
                            ) :
                            (
                              <button type="button" className="btn btn-warning me-3" onClick={handleClickPause}>Pause</button>
                            )
                        }
                        <button type="button" className="btn btn-danger me-3" onClick={handleClickReset}>Reset</button>
                      </div>
                    )
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
