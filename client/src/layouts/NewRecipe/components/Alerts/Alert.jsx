import React from "react";
import { Alert } from "@material-tailwind/react";
import Typography from "../../../../components/Typography";
import { BiSolidError } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";

const AlertComponent = ({ open, setOpen, message, type }) => {
  return (
    open && (
      <Alert
        variant={type === "success" ? "gradient" : "filled"}
        open={open}
        onClose={() => setOpen(false)}
        icon={
          type === "success" ? (
            <FaCircleCheck className="h-6 w-6" />
          ) : (
            <BiSolidError className="h-6 w-6" />
          )
        }
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        color={type === "success" ? "green" : "red"}
        className="absolute bottom-8 right-4 w-1/5 flex items-center"
      >
        <Typography variant="h5" color="white">
          {type === "success" ? "Success" : "Error"}
        </Typography>
        <Typography color="white" className="font-normal">
          {message}
        </Typography>
      </Alert>
    )
  );
};

export default AlertComponent;
