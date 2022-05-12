import { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'bootstrap';
import './timer.css';
import Navbar from './components/Navbar';
import ButtonGroup from './components/ButtonGroup';

function App() {

  const defaultSeconds = 121
  const defaultTimerName = 'Push Up'
  const [timerName, setTimerName] = useState(defaultTimerName)
  const [configuredSeconds, setConfiguredSeconds] = useState(defaultSeconds)
  const [seconds, setSeconds] = useState(configuredSeconds)
  const [timer, setTimer] = useState('')
  const [isTimerRunning, setisTimerRunning] = useState(false)
  const [isTimerPaused, setisTimerPaused] = useState(false)
  const timerRef = useRef

  const optionsSecond = [...Array(60).keys()];
  const optionsMinute = [...Array(60).keys()];

  const [modal, setModal] = useState(null)
  const exampleModal = useRef()

  const ss = Math.floor(seconds % 60)
  const mm = Math.floor((seconds / 60) % 60)

  const [formData, setFormData] = useState({
    timerName: defaultTimerName,
    totalMinutes: mm,
    totalSeconds: ss,
  })

  useEffect(() => {
    setModal(
      new Modal(exampleModal.current)
    )
  }, [])

  useEffect(() => {

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
        return ((seconds > 0) && seconds - 1) || 0
      })
    }, 1000)

    setisTimerPaused(false)
  }

  const handleClickReset = () => {
    clearInterval(timerRef.current)
    setSeconds(configuredSeconds)
    setisTimerRunning(false)
    setisTimerPaused(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTimerName(formData.timerName)

    const totalDuration = parseInt(formData.totalMinutes * 60) + parseInt(formData.totalSeconds)

    setSeconds(() => {  
      return totalDuration
    })

    setConfiguredSeconds(() => {
      return totalDuration
    })

    modal.hide()
  }

  const handleCloseModal = () => {

    const ss = Math.floor(configuredSeconds % 60)
    const mm = Math.floor((configuredSeconds / 60) % 60)

    // reset form data using latest updated data
    setFormData({
      timerName: timerName,
      totalMinutes: mm,
      totalSeconds: ss,
    })
    
    modal.hide()
  }

  return (
    <>
      
      {/* Navbar Section */}
      <Navbar />

      <div className='container-sm pt-4 container-timer'>
        <div className='row'>
          <div className='col-12'>
            <p>Good morning, Guest</p>

            <div className='row mb-2'></div>

            <ul className="list-group">
              <li className="list-group-item p-3">
                <div className="row">
                  <div className="col-9">
                    <p>{timerName}</p>
                  </div>

                  <div className="col-3 d-flex justify-content-end">
                    <button type="button" onClick={() => modal.show() } className="btn btn-primary">
                      Edit
                    </button>
                  </div>

                  <div className="col-12">
                    <h1 className="text-center">{seconds}</h1>
                    <h1 className="text-center">{timer}</h1>

                    <div className="row mb-3"></div>

                    <div className="d-flex justify-content-center">
                      <ButtonGroup
                        isTimerRunning={isTimerRunning}
                        isTimerPaused={isTimerPaused}
                        handleClickStart={handleClickStart}
                        handleClickResume={handleClickResume}
                        handleClickPause={handleClickPause}
                        handleClickReset={handleClickReset}
                      />
                    </div>
                  </div>

                </div>

              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" ref={exampleModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Timer</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Timer Name</label>
                  <input type="text" className="form-control" aria-describedby="Timer Name" 
                    value={formData.timerName}
                    onChange={(e) => setFormData({...formData, timerName: e.target.value})} 
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label">Minutes</label>
                    <select className="form-select"
                      aria-label="Minutes"
                      value={formData.totalMinutes}
                      onChange={(e) => setFormData({...formData, totalMinutes: e.target.value})}>
                      {optionsMinute.map((om, index) => {
                        return <option key={index} value={om}>{om}</option>
                      })}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Seconds</label>
                    <select className="form-select"
                      aria-label="Seconds"
                      value={formData.totalSeconds}
                      onChange={(e) => setFormData({...formData, totalSeconds: e.target.value})}>
                      {optionsSecond.map((os, index) => {
                        return <option key={index} value={os}>{os}</option>
                      })}
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Update Timer Data</button>
              </form>
            </div>
            <div className="modal-footer d-none">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
