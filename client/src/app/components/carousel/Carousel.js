import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {LOAD_ARTICLES} from '../../graphql/Queries';
import moment from 'moment';
import Loader from '../common/loader/Loader';
import './carouselStyles.css';

function Carousel() {
  const [sliderData, setSliderData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const length = sliderData.length;

  const {called, loading, data} = useQuery(LOAD_ARTICLES, {
    fetchPolicy: "network-only",
    variables: {limit: 3}
  });

  useEffect(() => {
    if (data) {
      setSliderData(data.posts);
    }
  }, [data]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) return null;

  return (
    <div className="carousel-outer-wrapper">
      {called && loading && <Loader type="circular"/>}
      <div className="carousel-inner-wrapper" style={{backgroundImage: `url(${sliderData[currentSlide].image})`}}>
        <div className="left-content" onClick={prevSlide}>
          <span>{'<'}</span>
        </div>
        <div className="center-content">
          <div className="content-container">
            <div className="title">{sliderData[currentSlide].title}</div>
            <div className="date">
              {sliderData[currentSlide].createdAt && moment(sliderData[currentSlide].createdAt).format('YYYY.MM.DD')}
            </div>
          </div>
          <div className="indicator-container">
            {
              sliderData.map((data, i) => {
                return <div key={i} className={currentSlide === i ? "indicator active" : "indicator"}
                            onClick={() => setCurrentSlide(i)}/>
              })
            }
          </div>
        </div>
        <div className="right-content" onClick={nextSlide}>
          <span>{'>'}</span>
        </div>
      </div>
    </div>
  );
}

export default Carousel;