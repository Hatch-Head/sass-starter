import { cva, VariantProps } from "class-variance-authority";
import Avatar, { AvatarGhost, type AvatarProps } from "../avatar/avatar";
import ToolTip from "../toolTip/toolTip";
import { cn } from "../utils";

const avatarGroup = cva("inline-flex", {
  variants: {
    size: {
      // Difference sizes may happen in the design
      xs: "text-xs pr-3",
      sm: "",
      md: "",
      lg: "",
      xl: "",
      "2xl": "",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

const avatar = cva("border-2 border-white dark:border-gray-800", {
  variants: {
    size: {
      xs: "-mr-3 text-xs",
      sm: "-mr-3",
      md: "-mr-4",
      lg: "-mr-5",
      xl: "-mr-5",
      "2xl": "-mr-6",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

const button = cva(
  "rounded-full bg-white text-gray-700 border-2 border-dashed border-gray-300 inline-flex items-center justify-center grow-0 shrink-0 hover:bg-gray-50 active bg-gray-100 active:outline-4 active:outline-gray-100 active:outline",
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
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface AvatarGroupProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroup> {
  users: AvatarProps[];
  max?: number;
  onAddUser?: () => void;
  onUserClick?: (user: AvatarProps) => void;
  tooltip?: string;
}

const AvatarGroup = ({
  users,
  max,
  size = "md",
  className,
  tooltip = "Add User",
  onAddUser = undefined,
  onUserClick = undefined,
}: AvatarGroupProps) => {
  const remainder = max ? Math.max(0, users.length - max) : 0;
  const avatars = max ? users.slice(0, max) : users;
  return (
    <div className="inline-flex">
      <div className={cn(avatarGroup({ size, className }))}>
        {avatars.map((user) => (
          <button
            type="button"
            onClick={() => (onUserClick ? onUserClick(user) : undefined)}
          >
            <Avatar
              key={`${user.name}-${user.url}`}
              {...user}
              size={size}
              randomColor
              onClick={onUserClick && (() => onUserClick(user))}
              className={cn(avatar({ size }), "hover:z-10")}
            />
          </button>
        ))}

        {remainder > 0 && (
          <AvatarGhost size={size} className={avatar({ size })}>
            +{remainder}
          </AvatarGhost>
        )}
      </div>
      {onAddUser !== undefined && (
        <ToolTip title={tooltip}>
          <button className={button({ size })} onClick={onAddUser}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99992 3.33331V12.6666M3.33325 7.99998H12.6666"
                stroke="#98A2B3"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </ToolTip>
      )}
    </div>
  );
};

export default AvatarGroup;
