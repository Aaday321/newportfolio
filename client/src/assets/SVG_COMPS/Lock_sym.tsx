import React from 'react'
import { SVG_PROPS } from '../exportables';

function Lock_sym({color, size}:SVG_PROPS) {
  return (
    <svg
      width={size?.toString() || "216"}
      height={size?.toString() || "216"}
      viewBox={`0 0 ${size || "216"} ${size || "216"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 13.5C81.9045 13.5 60.75 34.6545 60.75 60.75V87.75C45.8383 87.75 33.75 99.8383 33.75 114.75V175.5C33.75 190.412 45.8383 202.5 60.75 202.5H155.25C170.162 202.5 182.25 190.412 182.25 175.5V114.75C182.25 99.8383 170.162 87.75 155.25 87.75V60.75C155.25 34.6545 134.095 13.5 108 13.5ZM141.75 87.75V60.75C141.75 42.1104 126.64 27 108 27C89.3604 27 74.25 42.1104 74.25 60.75V87.75H141.75Z"
        fill={color || "#FFF9C6"}
      />
    </svg>
  );
}

export default Lock_sym