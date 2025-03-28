type ImageType = {
    src: string
    alt: string
}

export const ResponsiveImage = ({src, alt}: ImageType) => {
    return (
        <img className={`h-[100%]`} src={src} alt={alt}/>
    )
}