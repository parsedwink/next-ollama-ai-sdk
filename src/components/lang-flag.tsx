"use client"

import { LangCode } from "@/config/appconfig"
import { CircleFlag, CircleFlagLanguage } from "react-circle-flags"
import { ReactElement } from "react"

// wtf
const FLAGS: Record<LangCode, ReactElement<SVGElement>> = {
  ro: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <mask id="a">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#a)">
        <path fill="#eee" d="M0 0h512v256l-265 45.2z" />
        <path fill="#d80027" d="M210 256h302v256H0z" />
        <path fill="#0052b4" d="M0 0v512l256-256L0 0z" />
      </g>
    </svg>
  ),
  en: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <mask id="a">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#a)">
        <path fill="#eee" d="M0 0h512v256l-265 45.2z" />
        <path fill="#d80027" d="M210 256h302v256H0z" />
        <path fill="#0052b4" d="M0 0v512l256-256L0 0z" />
      </g>
    </svg>
  ),
  it: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <mask id="a">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#a)">
        <path fill="#eee" d="M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z" />
        <path fill="#6da544" d="M0 0h167v512H0z" />
        <path fill="#d80027" d="M345 0h167v512H345z" />
      </g>
    </svg>
  ),
  de: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <mask id="a">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#a)">
        <path fill="#ffda44" d="m0 345 256.7-25.5L512 345v167H0z" />
        <path fill="#d80027" d="m0 167 255-23 257 23v178H0z" />
        <path fill="#333" d="M0 0h512v167H0z" />
      </g>
    </svg>
  ),
  cz: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <mask id="a">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#a)">
        <path fill="#eee" d="M0 0h512v256l-265 45.2z" />
        <path fill="#d80027" d="M210 256h302v256H0z" />
        <path fill="#0052b4" d="M0 0v512l256-256L0 0z" />
      </g>
    </svg>
  ),
}

export default function LangFlag({
  code,
  size = 28,
}: {
  code: LangCode
  size?: number
}) {
  return <CircleFlagLanguage languageCode={code} width={size} height={size} />
}
