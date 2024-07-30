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
    outlined:
      "border-gray-400 hover:border-transparent hover:before:bg-accent relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-accent before:transition-all before:duration-500 hover:text-primary hover:border-accent hover:before:left-0 hover:before:w-full focus:border-transparent",
    primary:
      "border-accent bg-primary text-accent hover:border-transparent hover:before:bg-accent relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-accent before:transition-all before:duration-500 hover:text-primary hover:border-accent hover:before:left-0 hover:before:w-full",
    accent:
      "border-transparent bg-accent text-primary hover:before:bg-primary relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary before:transition-all before:duration-500 hover:text-accent hover:border-accent hover:before:left-0 hover:before:w-full",
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
      <span className="relative z-10">{children}</span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["outlined", "primary", "accent"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
};

export default Button;
