import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const styles = cva(
  "addon flex h-[44px] grow-0 items-center justify-center border-gray-300 text-gray-400",
  {
    variants: {
      right: {
        true: "border-l",
        false: "border-r",
      },
      isAdvanced: {
        true: "",
        false: "px-3 select-none",
      },
    },
  },
);

export interface AddOnProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styles> {}

const AddOn = ({ className = "", right = false, children }: AddOnProps) => {
  return (
    <div
      className={cn(
        styles({ right, isAdvanced: typeof children === "object" }),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AddOn;
