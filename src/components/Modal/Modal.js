import "./index.scss";

const Modal = ({ handleCloseModal }) => {
  return (
    <div className="modal-holder">
      <div className="modal">
        <div className="header">
          <div className="close" onClick={() => handleCloseModal()}>
            <div className="close-inner">
              <div className="cl"></div>
            </div>
          </div>
        </div>
        <div className="body">Body</div>
      </div>
    </div>
  );
};

export default Modal;
