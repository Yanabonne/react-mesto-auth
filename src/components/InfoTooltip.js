import closeButton from "../images/close.svg";
import doneButton from "../images/done.svg";
import crossButton from "../images/cross.svg";

function InfoToolTip({
    isOpen,
    isRegistered
}) {
    return (
        <div
        className={`${isOpen ? "popup popup_opened" : "popup"}`}
      >
        <div className="popup__container">
          <button type="button" className="popup__close">
            <img src={closeButton} className="popup__cross" alt="Крестик" />
          </button>
          <div className="form">
          <img src={closeButton} className="popup__cross" alt="Крестик" />
          </div>
        </div>
      </div>
    );
  }
  
  export default InfoToolTip;