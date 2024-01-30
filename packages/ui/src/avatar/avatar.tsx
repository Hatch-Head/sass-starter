import { cva, VariantProps } from "class-variance-authority";
import { withTooltip } from "../toolTip/toolTip";
import { cn } from "../utils";
const avatar = cva(
  "rounded-full text-blue-500 inline-flex items-center justify-center grow-0 shrink-0 select-none overflow-hidden",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10",
        lg: "w-12 h-12 text-lg",
        xl: "w-14 h-14 text-xl",
        "2xl": "w-16 h-16 text-2xl",
      },
      randomColor: {
        false: "bg-blue-100 text-blue-500",
      },
    },
    defaultVariants: {
      size: "md",
      randomColor: false,
    },
  },
);

export interface AvatarProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatar> {
  name?: string;
  url?: string;
  tooltip?: string;
  tooltipTitle?: string;
}

const colorClasses = [
  "text-blue-500 bg-blue-100",
  "text-green-500 bg-green-100",
  "text-red-500 bg-red-100",
  "text-yellow-500 bg-yellow-100",
  "text-indigo-500 bg-indigo-100",
  "text-pink-500 bg-pink-100",
  "text-purple-500 bg-purple-100",
  "text-gray-500 bg-gray-100",
  "text-orange-500 bg-orange-100",
];

const Avatar = ({
  size,
  name = "",
  url,
  randomColor = false,
  tooltip,
  tooltipTitle,
  className,
}: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const colorIndex =
    Math.abs(name.charAt(0).charCodeAt(0) - 97) % colorClasses.length;

  const colorClass = randomColor ? colorClasses[colorIndex] : "";

  const content = () =>
    url ? <img src={url} /> : initials !== "" ? initials : name;

  const Element = () => (
    <div className={cn(avatar({ size, className, randomColor }), colorClass)}>
      {content()}
    </div>
  );

  return tooltip ? (
    withTooltip(<Element />, tooltip, tooltipTitle)
  ) : (
    <Element />
  );
};

export interface AvatarGhostProps extends Omit<AvatarProps, "name" | "url"> {
  children?: React.ReactNode;
}

export const AvatarGhost = ({
  size,
  children,
  tooltip,
  className,
}: AvatarGhostProps) => (
  <div className={cn(avatar({ size, className }), "bg-blue-100 text-blue-500")}>
    {children}
  </div>
);

export default Avatar;
