interface InputErrorMessagesProps {
  errorMessages: string[] | null;
}

const InputErrorMessages = ({ errorMessages }: InputErrorMessagesProps) => {
  if (!errorMessages || errorMessages.length === 0) return null;

  return (
    <ul className="text-sm mt-1 space-y-1">
      {errorMessages.map((msg, index) => (
        <li key={index}>• {msg}</li>
      ))}
    </ul>
  );
};

export default InputErrorMessages;
