import React from "react";
import { SVG_PROPS } from "../exportables";

function Menu_sym({color}:SVG_PROPS) {
  return (
    <svg
      width="69"
      height="70"
      viewBox="0 0 69 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.625 19.9062C8.625 18.7154 9.59039 17.75 10.7812 17.75H58.2188C59.4096 17.75 60.375 18.7154 60.375 19.9062C60.375 21.0971 59.4096 22.0625 58.2188 22.0625H10.7812C9.59039 22.0625 8.625 21.0971 8.625 19.9062ZM8.625 35C8.625 33.8091 9.59039 32.8438 10.7812 32.8438H58.2188C59.4096 32.8438 60.375 33.8091 60.375 35C60.375 36.1909 59.4096 37.1562 58.2188 37.1562H10.7812C9.59039 37.1562 8.625 36.1909 8.625 35ZM32.3438 50.0938C32.3438 48.9029 33.3091 47.9375 34.5 47.9375H58.2188C59.4096 47.9375 60.375 48.9029 60.375 50.0938C60.375 51.2846 59.4096 52.25 58.2188 52.25H34.5C33.3091 52.25 32.3438 51.2846 32.3438 50.0938Z"
        fill={color || "#FFF6A4"}
        stroke={color || "#FFF6A4"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Menu_sym;
