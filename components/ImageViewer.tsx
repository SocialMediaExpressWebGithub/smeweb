"use client"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";



export default function ImageViewer({imagearr} : {imagearr : string[]}){
  const images = imagearr.map(url => ({
    original: url,
    thumbnail: url
  }));

    return (
      <>
      <ImageGallery items={images} />
      </>
        
    );
}