import React from 'react'
import { SVG_PROPS } from '../exportables'

function Back_arrow({size, color}:SVG_PROPS) {
    return (
        <svg width={size || "66"} height={size || "66"} viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M30.3334 10.9166C31.1389 11.722 31.1389 13.028 30.3334 13.8334L13.2293 30.9375H57.75C58.8891 30.9375 59.8125 31.8609 59.8125 33C59.8125 34.1391 58.8891 35.0625 57.75 35.0625H13.2293L30.3334 52.1666C31.1389 52.9721 31.1389 54.2779 30.3334 55.0834C29.528 55.8889 28.222 55.8889 27.4166 55.0834L6.79159 34.4584C5.98614 33.653 5.98614 32.347 6.79159 31.5416L27.4166 10.9166C28.222 10.1111 29.528 10.1111 30.3334 10.9166Z" fill="#1579D7" stroke={color || "#1579D7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default Back_arrow