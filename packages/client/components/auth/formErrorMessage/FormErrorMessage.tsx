//* interface *//
interface Props {
  message: string;
}

export const FormErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="m-0 flex items-center justify-center rounded-md border border-dark bg-light font-bold">
      <span className="p-3 text-center text-sm text-dark">{message}</span>
    </div>
  );
};
