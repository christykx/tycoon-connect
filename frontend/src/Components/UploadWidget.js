import { useEffect, useRef } from 'react';

const UploadWidget = ({ children, onUpload }) => {
  const cloudinary = useRef();
  const widget = useRef();

  // Store the Cloudinary window instance to a ref when the page renders

  useEffect(() => {
    cloudinary.current = window.cloudinary;
  }, []);

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {


    const options = {
        cloudName:'dlqjouxmp',
        uploadPreset:'igh89oap',
        allowedFormats: ['jpg', 'png'],
        // cropping: true, //add a cropping step
    }

    return cloudinary.current?.createUploadWidget(options,
      function (error, result) {
        if (error) {
          // Handle error by showing message to user and closing the widget
          alert('Error uploading file: please try to upload png/jpg files' );
          widget?.current?.close();
        } else if (result.event === 'success') {
          // Handle success by passing result to parent component and closing the widget
          onUpload(error, result, widget?.current);
          widget?.current?.close();
        }
      }
    );
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    if ( !widget?.current ) {
      widget.current = createWidget();
    }
    widget?.current && widget.current.open();
  }

  return (
    <>
      {children({ cloudinary: cloudinary.current, widget: widget.current, open })}
    </>
  )
}

export default UploadWidget;