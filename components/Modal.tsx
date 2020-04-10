import { ReactNode } from "react";

export type ModalProps = {
  active?: boolean;
  title?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
};

const Modal = (props: ModalProps) => {
  const { active, title, children, onClose } = props;

  return (
    <div className={`modal ${active ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          {
            onClose &&
            <button className="delete" onClick={() => onClose()}></button>
          }
        </header>
        {children}
      </div>
    </div>
  );
};

type WithChildren = {
  children?: ReactNode;
};

Modal.Body = (props: WithChildren) => {
  return (
    <section className="modal-card-body">
      {props.children}
    </section>
  );
};

Modal.Footer = (props: WithChildren) => {
  return (
    <footer className="modal-card-foot">
      {props.children}
    </footer>
  );
};

export default Modal;