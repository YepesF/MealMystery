import React from "react";
import { Alert, Button } from "@material-tailwind/react";
import Typography from "../../../../components/Typography";

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path
      fillRule="evenodd"
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
      clipRule="evenodd"
    />
  </svg>
);

const AlertComponent = ({ open, setOpen, message, type }) => {
  return (
    <>
      {open && (
        <Alert
          variant={type === "success" ? "gradient" : "filled"}
          open={open}
          icon={type === "success" ? <SuccessIcon /> : <ErrorIcon />}
          action={
            <Button
              variant="text"
              color="white"
              size="sm"
              className="!absolute top-3 right-3"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          }
          className={`fixed bottom-4 right-4 ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <Typography variant="h5" color="white">
            {type === "success" ? "Success" : "Error"}
          </Typography>
          <Typography color="white" className="mt-2 font-normal">
            {message}
          </Typography>
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;
