import { InputHTMLAttributes } from 'react';

export type ErrorMessageProps = InputHTMLAttributes<HTMLDivElement> & {
  error: {
    message?: string;
    response?: {
      statusText?: string;
      data?: {
        message?: string;
      }
    };
  };

  onClose?: () => void;
};

export default (props: ErrorMessageProps) => {
  const { error, onClose, ...other } = props;

  const title = error.response?.statusText ?? 'Error';
  const text = error.response?.data?.message ?? error.message ?? error.toString()

  return (
    <article className="message is-danger" {...other}>
      <div className="message-header">
        <p>{title}</p>
        {
          onClose &&
          <button className="delete" onClick={() => onClose()}></button>
        }
      </div>
      <div className="message-body" style={{ textAlign: 'center' }}>{text}</div>
    </article>
  );
};
