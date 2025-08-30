import { cn } from "utils/helpers";

type OrDividerProps = {
  className?: string;
  text?: string;
};

const OrDivider: React.FC<OrDividerProps> = (props) => {
  const { className, text } = props;

  return (
    <div className={cn("my-4 flex items-center", className)}>
      <div className="flex-grow border-t border-neutral-100"></div>
      <span className="mx-4 text-neutral-400">{text || "OR"}</span>
      <div className="flex-grow border-t border-neutral-100"></div>
    </div>
  );
};

export default OrDivider;
