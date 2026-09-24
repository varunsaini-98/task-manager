import React from "react";

export const Badge = ({ children, status = "info" }) => {
  const normalizedStatus = String(status).toLowerCase().replace(/\s+/g, "-");
  return <span className={`badge badge-${normalizedStatus}`}>{children}</span>;
};
