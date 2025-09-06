import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children, footer }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-sm border border-gray-100">
     
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

     
      <div className="text-gray-700">{children}</div>

     
      {footer && <div className="mt-4 border-t pt-2 text-sm">{footer}</div>}
    </div>
  );
};

export default Card;
