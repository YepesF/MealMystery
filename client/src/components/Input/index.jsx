import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FiX } from "react-icons/fi";

const Input = ({
  variant = "outlined",
  size = "md",
  color = "gray",
  label = "",
  error = false,
  success = false,
  icon,
  labelProps,
  containerProps,
  className = "",
  shrink = false,
  inputRef,
  clearable = false,
  value,
  onChange,
  onClear,
  autoFocus = false,
  ...props
}) => {
  const internalRef = useRef();

  const baseClasses =
    "block w-full rounded-md shadow-sm focus:outline-none bg-primary dark:bg-primaryDark text-accent";
  const variantClasses = {
    outlined: "border ",
    filled: "bg-gray-100 border border-transparent",
    standard: "border-b",
  };
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };
  const colorClasses = {
    current: "border-current dark:border-accent",
    gray: "border-gray-300 focus:border-indigo-500",
    red: "border-red-500 focus:border-red-700",
    blue: "border-blue-500 focus:border-blue-700",
    green: "border-green-500 focus:border-green-700",
  };
  const errorClasses = error
    ? "border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
    : "";
  const successClasses = success
    ? "border-green-500 text-green-900 placeholder-green-300 focus:ring-green-500 focus:border-green-500"
    : "";

  useEffect(() => {
    if (autoFocus && internalRef.current) {
      internalRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div
      {...containerProps}
      className={classNames("relative mb-4", containerProps?.className)}
    >
      {label && (
        <label
          {...labelProps}
          className={classNames(
            "mb-1 block text-sm font-medium text-gray-700 dark:text-accent/20",
            labelProps?.className,
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-accent">
            {icon}
          </span>
        )}
        <input
          ref={inputRef || internalRef}
          value={value}
          onChange={onChange}
          className={classNames(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            colorClasses[color],
            errorClasses,
            successClasses,
            {
              "pl-10": icon,
              "pr-10": clearable,
            },
            className,
          )}
          {...props}
        />
        {clearable && value && onClear && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-accent"
            onClick={onClear}
          >
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.oneOf(["current", "gray", "red", "blue", "green"]),
  label: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  icon: PropTypes.node,
  labelProps: PropTypes.object,
  containerProps: PropTypes.object,
  className: PropTypes.string,
  shrink: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  clearable: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  autoFocus: PropTypes.bool,
};

export default Input;
