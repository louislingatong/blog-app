import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

ImageUpload.propTypes = {
  handleDrop: PropTypes.func.isRequired,
  image: PropTypes.string,
};

function ImageUpload(props) {
  const dragCounter = useRef(0);
  const inputFile = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState(props.image);
  const [imageIsChanged, setImageIsChanged] = useState(false);

  useEffect(() => {
    if (image && imageIsChanged) {
      props.handleDrop(image);
      setImageIsChanged(false);
    }
  }, [image])

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      filesToBase64(e.dataTransfer.files);
      e.dataTransfer.clearData();
      dragCounter.current = 0;
    }
  };

  const handleImageChange = (e) => {
    filesToBase64(e.target.files);
  };

  const filesToBase64 = (files) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function () {
        setImageIsChanged(true);
        setImage(reader.result);
      };
    } else {
      setImage('');
    }
  };

  const handleUpload = (e) => {
    e.preventDefault()
    inputFile.current.click();
  };

  return (
    <React.Fragment>
      <div
        className={dragging ? 'drag-drop-zone overlay' : 'drag-drop-zone'}
        style={image ? {backgroundImage: `url(${image})`} : {backgroundColor: '#d6d6d6'}}
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDrag(e)}
        onDragEnter={e => handleDragIn(e)}
        onDragLeave={e => handleDragOut(e)}
      >
        <div>
          <button onClick={handleUpload}>UPLOAD IMAGE</button>
        </div>
      </div>
      <input ref={inputFile} accept="image/*" id="image" name="image" type="file" multiple={false}
             onChange={handleImageChange} style={{display: 'none'}}/>
    </React.Fragment>
  )
};

export default ImageUpload;