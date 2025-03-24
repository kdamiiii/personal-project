type ImageType = {
    src: string
    alt: string
}

export const ResponsiveImage = ({src, alt}: ImageType) => {
    return (
        <img className={`w-[100%]`} src={src} alt={alt}/>
    )
}