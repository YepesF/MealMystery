import PropTypes from "prop-types";

const Typography = ({ variant, className, children }) => {
  const baseStyle = "text-slate-50";

  const variants = {
    h1: { element: "h1", styles: "text-4xl font-bold" },
    h2: { element: "h2", styles: "text-3xl font-semibold" },
    h3: { element: "h3", styles: "text-2xl font-semibold" },
    h4: { element: "h4", styles: "text-xl font-medium" },
    h5: { element: "h5", styles: "text-lg font-medium" },
    h6: { element: "h6", styles: "text-base font-medium" },
    body1: { element: "p", styles: "text-base" },
    body2: { element: "p", styles: "text-sm" },
    caption: { element: "span", styles: "text-xs" },
    button: { element: "span", styles: "text-base font-semibold uppercase" },
  };

  const variantConfig = variants[variant] || variants.body1;
  const Component = variantConfig.element;
  const variantStyle = variantConfig.styles;

  return (
    <Component className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </Component>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "body1",
    "body2",
    "caption",
    "button",
  ]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Typography;
