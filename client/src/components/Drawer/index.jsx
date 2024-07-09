import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Drawer = ({
  open,
  size = 250,
  placement = "left",
  overlay = true,
  overlayRef,
  overlayProps,
  dismiss,
  onClose,
  transition = { type: "tween", duration: 0.5 },
  className = "",
  children,
}) => {
  const handleOverlayClick = () => {
    if (dismiss && typeof onClose === "function") {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up overflow style on component unmount or when open changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {overlay && (
            <motion.div
              ref={overlayRef}
              {...overlayProps}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleOverlayClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            ></motion.div>
          )}
          <motion.div
            initial={{ [placement]: `-${size}px` }}
            animate={{ [placement]: 0 }}
            exit={{ [placement]: `-${size}px` }}
            transition={transition}
            className={`fixed ${placement}-0 top-0 bottom-0 z-50 bg-white ${className}`}
            style={{
              width:
                placement === "left" || placement === "right" ? size : "auto",
              height:
                placement === "top" || placement === "bottom" ? size : "auto",
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
