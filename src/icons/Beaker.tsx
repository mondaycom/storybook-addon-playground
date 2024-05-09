import * as React from "react";
import type { SVGProps } from "react";
const SvgBeaker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.48306 4.25H7.33194V9.63621L3.6624 14.3066C3.39004 14.6531 3.22065 15.0692 3.17359 15.5074C3.12653 15.9456 3.20369 16.3882 3.39626 16.7846C3.58883 17.181 3.88904 17.5153 4.26259 17.7491C4.63613 17.983 5.06806 18.1071 5.50877 18.1071H14.919C15.3597 18.1071 15.7915 17.983 16.165 17.7491C16.5386 17.5153 16.8388 17.181 17.0314 16.7846C17.2239 16.3882 17.3011 15.9456 17.254 15.5074C17.207 15.0692 17.0376 14.6531 16.7652 14.3066L13.0957 9.63621V4.25H13.9446C14.3588 4.25 14.6946 3.91421 14.6946 3.5C14.6946 3.08579 14.3588 2.75 13.9446 2.75H6.48306C6.06885 2.75 5.73306 3.08579 5.73306 3.5C5.73306 3.91421 6.06885 4.25 6.48306 4.25ZM8.83194 4.25V9.8956C8.83194 10.0636 8.7755 10.2268 8.67168 10.359L7.48054 11.875H12.9471L11.7559 10.359C11.6521 10.2268 11.5957 10.0636 11.5957 9.8956V4.25H8.83194ZM14.1256 13.375H6.30199L4.84178 15.2335C4.74335 15.3587 4.68202 15.5092 4.66501 15.6676C4.648 15.826 4.67589 15.9859 4.74549 16.1292C4.81508 16.2724 4.92358 16.3932 5.05858 16.4778C5.19354 16.5623 5.34955 16.6071 5.50877 16.6071H14.9187C15.0779 16.6071 15.2341 16.5623 15.369 16.4778C15.504 16.3932 15.6125 16.2724 15.6821 16.1292C15.7517 15.9859 15.7796 15.826 15.7626 15.6676C15.7456 15.5092 15.6844 15.3588 15.5859 15.2336L14.1256 13.375Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgBeaker;
