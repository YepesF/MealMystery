import PropTypes from "prop-types";

const Button = ({children}) => {
  return (
    <div>{children}</div>
  );
};

Button.propTypes = {
    children: PropTypes.node,
};

export default Button;