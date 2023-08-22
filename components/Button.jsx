import { Button } from "./ui/button";

const ButtonComponent = ({ text, type, size, icon }) => {
  return (
    <>
      <Button
        type={type}
        className={
          size == "regular"
            ? "text-white bg-dark hover:bg-transparent hover:text-dark text-base gap-2 rounded-md border-[1.7px] border-dark"
            : size == "lg"
            ? "text-white bg-dark hover:bg-transparent hover:text-dark gap-2 rounded-md border-[1.7px] border-dark text-lg p-4"
            : "text-white bg-dark hover:bg-transparent hover:text-dark text-base gap-2 rounded-md border-[1.7px] border-dark"
        }
      >
        {icon && icon}
        {text}
      </Button>
    </>
  );
};

export default ButtonComponent;
