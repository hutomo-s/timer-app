// reference
// https://stackoverflow.com/questions/58847890/how-to-access-method-of-another-component-on-button-click-in-react

function ButtonPauseResume(props) {
  if(!props.isTimerPaused) {
    return (
      <button type="button" className="btn btn-warning me-3" onClick={props.handleClickPause}>Pause</button>
    )
  }
  else {
    return (
      <button type="button" className="btn btn-primary me-3" onClick={props.handleClickResume}>Resume</button>
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
          <button type="button" className="btn btn-danger me-3" onClick={props.handleClickReset}>Reset</button>
        </div>
      </>
    )
  }

}

export default ButtonGroup;