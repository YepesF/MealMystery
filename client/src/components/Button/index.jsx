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
      "border-gray-400 hover:border-transparent text-gray-700 hover:before:bg-secondary relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-secondary before:transition-all before:duration-500 hover:text-primary hover:border-secondary hover:before:left-0 hover:before:w-full",
    primary:
      "border-secondary bg-primary text-secondary hover:border-transparent hover:before:bg-secondary relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-secondary before:transition-all before:duration-500 hover:text-primary hover:border-secondary hover:before:left-0 hover:before:w-full",
    secondary:
      "border-transparent bg-secondary text-primary hover:before:bg-primary relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary before:transition-all before:duration-500 hover:text-secondary hover:border-secondary hover:before:left-0 hover:before:w-full",
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
      <span class="relative z-10">{children}</span>
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
