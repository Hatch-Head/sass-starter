"use client";

import { forwardRef, useState } from "react";
import Input, { type InputProps } from "../textInput/textInput";

import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = forwardRef<typeof Input, InputProps>(
  ({ ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const buttonClass = "hover:text-primary-600 text-gray-400 h-5 w-5 mr-4";

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        inputClassName={showPassword ? "focus:blur-none blur-xs" : ""}
        rightAccessory={
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()} // prevent button from taking focus on click
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon className={buttonClass} />
            ) : (
              <EyeOffIcon className={buttonClass} />
            )}
          </button>
        }
        {...props}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
