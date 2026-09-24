import React from "react";

export const Card = ({ children, title, className = "", style = {} }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {title && <h4 className="card-title">{title}</h4>}
      {children}
    </div>
  );
};
