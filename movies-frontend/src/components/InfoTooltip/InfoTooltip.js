import Popup from '../Popup/Popup';
import canceled from '../../images/icons/forbidden-cancel-svgrepo-com.svg';
import accepted from '../../images/icons/accept-check-good-mark-ok-tick-svgrepo-com.svg';
import close from '../../images/icons/close.svg';

function Infotooltip({ isOpened, isAcepted, onClose }) {

  function handleCloseInfoTooltip() {
    onClose();
  }
  return <Popup isOpened={isOpened}>
    <div className='infotooltip'>
      <div className='infotooltip__container'>
        {!isAcepted && <img className="infotooltip__icon" src={canceled} alt="Иконка ошибки"></img>}
        {isAcepted && <img className="infotooltip__icon" src={accepted} alt="Иконка ошибки"></img>}
        <p className='infotooltip__message'>Упс, этого функционала пока нет. Но есть попап)</p>
        <img className="infotooltip__close" src={close} alt="Иконка закрытия" onClick={handleCloseInfoTooltip}></img>
      </div>
    </div>
  </Popup>;
}

export default Infotooltip;
