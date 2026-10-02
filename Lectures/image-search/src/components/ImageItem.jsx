// an individual image with a div wrapped around for styling purposes
// receives an individual image as props
const ImageItem = (props) => {
  const {image} = props
  return (
    <>
      <img src={image.urls.small} alt={image.alt_description} />
      <p className="text-sm">Photographer: <a href={image.user.links.html} target="_blank" rel="noreferrer" className="text-blue-500 underline">
        {image.user.name}</a></p>
    </>
  )
}

export default ImageItem
