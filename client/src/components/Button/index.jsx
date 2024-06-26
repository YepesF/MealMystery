import PropTypes from "prop-types";

const Button = ({
  children,
  variant = "outlined",
  size = "medium",
  className = "",
  ...props
}) => {
  const baseStyle = "border rounded px-4 py-2";
  const variantStyles = {
    outlined: "border-gray-400 text-gray-700",
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
  };
  const sizeStyles = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const variantStyle = variantStyles[variant] || variantStyles.outlined;
  const sizeStyle = sizeStyles[size] || sizeStyles.medium;

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["outlined", "primary", "secondary"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
};

export default Button;
