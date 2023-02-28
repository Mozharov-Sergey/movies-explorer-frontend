function Popup({isOpened, children}) {
  return(
  <>
  {isOpened && <div className="popup">{children}</div>}</>
  );
}

export default Popup;