import { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './timer.css';
import ButtonGroup from './ButtonGroup';

function App() {

  const defaultSeconds = 121
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [timer, setTimer] = useState('')
  const [isTimerRunning, setisTimerRunning] = useState(false)
  const [isTimerPaused, setisTimerPaused] = useState(false)
  const timerRef = useRef

  useEffect(() => {
    console.log('[useeffect] seconds', seconds);

    const ss = Math.floor(seconds % 60)
    const mm = Math.floor((seconds / 60) % 60)
    
    if(seconds >= 0) {
      
      const showSs = ss < 10 ? '0' + ss : ss
      const showMm = mm < 10 ? '0' + mm : mm
      setTimer(showMm + ":" + showSs)

      if (seconds === 0)
        clearInterval(timerRef.current)
    }
    
  }, [seconds, timerRef]);

  const handleClickStart = () => {

    timerRef.current = setInterval(() => {
      setSeconds((seconds) => {
        console.log('[setSeconds] seconds', seconds)
        return ((seconds > 0) && seconds - 1) || 0
      })
    }, 1000)

    setisTimerRunning(true)
  }

  const handleClickPause = () => {
    clearInterval(timerRef.current)
    setisTimerPaused(true)
  }

  const handleClickResume = () => {
    timerRef.current = setInterval(() => {
      setSeconds((seconds) => {
        console.log('[setSeconds] seconds', seconds)
        return ((seconds > 0) && seconds - 1) || 0
      })
    }, 1000)

    setisTimerPaused(false)
  }

  const handleClickReset = () => {
    clearInterval(timerRef.current)
    setSeconds(defaultSeconds)
    setisTimerRunning(false)
    setisTimerPaused(false)
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

            <div className='row mb-2'></div>

            <ul className="list-group">
              <li className="list-group-item p-3">
                <p>Push Up</p>
                <h1>{seconds}</h1>
                <h1>{timer}</h1>

                <ButtonGroup
                  isTimerRunning={isTimerRunning}
                  isTimerPaused={isTimerPaused}
                  handleClickStart={handleClickStart}
                  handleClickResume={handleClickResume}
                  handleClickPause={handleClickPause}
                  handleClickReset={handleClickReset}
                />

              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
