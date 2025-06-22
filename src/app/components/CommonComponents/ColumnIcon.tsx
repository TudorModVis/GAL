import React from "react";

interface ColumnProps {
  color: string;
}

const ColumnIcon: React.FC<ColumnProps> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_476_550)">
        <path
          className={`${props.color} transition duration-300`}
          d="M0 1.25C0 0.559644 0.559644 0 1.25 0H5.75C6.44036 0 7 0.559644 7 1.25V5.75C7 6.44036 6.44036 7 5.75 7H1.25C0.559644 7 0 6.44036 0 5.75V1.25ZM9 1.25C9 0.559644 9.55964 0 10.25 0H14.75C15.4404 0 16 0.559644 16 1.25V5.75C16 6.44036 15.4404 7 14.75 7H10.25C9.55964 7 9 6.44036 9 5.75V1.25ZM16 10.25C16 9.55964 15.4404 9 14.75 9H10.25C9.55964 9 9 9.55964 9 10.25V14.75C9 15.4404 9.55964 16 10.25 16H14.75C15.4404 16 16 15.4404 16 14.75V10.25ZM0 10.25C0 9.55964 0.559644 9 1.25 9H5.75C6.44036 9 7 9.55964 7 10.25V14.75C7 15.4404 6.44036 16 5.75 16H1.25C0.559644 16 0 15.4404 0 14.75V10.25Z"
          fill={props.color}
        />
      </g>
      <defs>
        <clipPath id="clip0_476_550">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ColumnIcon;
