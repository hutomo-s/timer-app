function ButtonPauseResume(props) {
  if(!props.isTimerPaused) {
    return (
      <button type="button" className="btn btn-warning" onClick={props.handleClickPause}>Pause</button>
    )
  }
  else {
    return (
      <button type="button" className="btn btn-primary" onClick={props.handleClickResume}>Resume</button>
    )
  }
}

function ButtonGroup(props) {
  if (!props.isTimerRunning) {
    return (
      <>
        <div>
          <button type="button" className="btn btn-success" onClick={props.handleClickStart}>Start</button>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div>
          <ButtonPauseResume 
            isTimerPaused={props.isTimerPaused}
            handleClickPause={props.handleClickPause}
            handleClickResume={props.handleClickResume}
          />

          <span className="me-3"></span>
          
          <button type="button" className="btn btn-danger" onClick={props.handleClickReset}>Reset</button>
        </div>
      </>
    )
  }

}

export default ButtonGroup;