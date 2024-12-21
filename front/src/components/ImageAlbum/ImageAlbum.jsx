import React, { useEffect } from 'react';
import './ImageAlbum.css';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import fjGallery from 'flickr-justified-gallery';

export const ImageAlbum = (props) => {
  useEffect(() => {
    fjGallery(document.querySelectorAll('.gallery'), {
      itemSelector: '.gallery__item',
      rowHeight: 180,
      lastRow: 'start',
      gutter: 2,
      rowHeightTolerance: 0.1,
      calculateItemsHeight: false,
    });
  }, []);
console.log(props.images);

  return (
    <div>
      <LightGallery
        plugins={[lgZoom, lgVideo]}
        mode="lg-fade"
        pager={true}
        thumbnail={true}
        galleryId={'nature'}
        autoplayFirstVideo={true}
        elementClassNames={'gallery'}
        mobileSettings={{
          controls: true,
          showCloseIcon: true,
          download: true,
          rotate: true,
        }}
      >
        {
            props.images.map((item, index)=>{return(
                <a
                className="gallery__item"
                data-src={item.src}
                >
                <img
                    className="img-responsive"
                    src={item.src}
                />
                </a>
            )})
        }
      </LightGallery>
    </div>
  );
};
