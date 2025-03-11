/* eslint-disable @next/next/no-img-element */
import NextImage from "next/image";
import { memo } from "react";
import { allowedDomains } from "../../../next.config";


interface ImageProps {
    src: string
    alt: string,
    width?: number
    height?: number
    fill?: boolean,
    className?: string
}

export default memo(function Image(props: ImageProps) {
    const isAllowed = props.src.startsWith("/") || allowedDomains?.some((domain) => props.src.includes(domain));

    return isAllowed ? (
        <NextImage {...props}/>
    ) : (
        <img  {...props} loading="lazy" alt={props.alt || ""} />
    );
})