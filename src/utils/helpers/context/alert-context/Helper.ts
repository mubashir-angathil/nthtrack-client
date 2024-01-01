/* eslint-disable no-unused-vars */
import React from "react";

export interface AlertContextProps {
  alert: AlertProps;
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

interface AlertProps {
  open: boolean;
  alert: {
    title: null | string;
    message: null | string;
    positiveButton: "Accept" | string;
    negativeButton: "Close" | string;
    response: (res: "accept" | "reject") => void;
  };
}

export const initialAlertState: AlertProps = {
  open: false,
  alert: {
    title: null,
    message: null,
    positiveButton: "Accept",
    negativeButton: "Close",
    response: () => {},
  },
};
