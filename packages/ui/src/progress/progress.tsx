import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const styles = cva("text-gray-700 text-xs flex", {
  variants: {
    labelPosition: {
      left: "space-x-2 flex-row items-start items-center left",
      bottom: "flex-col items-end justify-end bottom space-y-1",
    },
  },
  defaultVariants: {
    labelPosition: "left",
  },
});

const barStyles = cva(
  "h-[8px] rounded-full transition-all transition-duration-300",
  {
    variants: {
      success: {
        true: "bg-success-500",
        false: "bg-primary-600",
      },
      error: {
        true: "bg-error-500",
        false: "",
      },
    },
  },
);

export interface ProgressProps extends VariantProps<typeof styles> {
  progress?: number;
  base?: number;
  label?: boolean;
  className?: string;
  error?: string;
}

const Progress = ({
  className = "",
  progress = 0,
  base = 100,
  label = false,
  labelPosition,
  error,
}: ProgressProps) => {
  const percent = progress > 0 ? Math.floor((progress / base) * 100) : 0;
  const width = error ? "100%" : `${percent}%`;

  const position = error ? "bottom" : labelPosition || "left";
  const showLabel = label || error;

  return (
    <div className={cn(styles({ labelPosition: position }), className)}>
      <div className="bg-primary-100 inline-flex inline-flex h-[8px] w-full  overflow-hidden rounded-full">
        <div
          className={barStyles({
            success: progress >= 100,
            error: !!error,
          })}
          style={{ width }}
        />
      </div>
      {showLabel && <div className="animation-fade-up">{error || width}</div>}
    </div>
  );
};

export default Progress;
