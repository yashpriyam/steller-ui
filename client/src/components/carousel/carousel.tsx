import React, { useState, useEffect, useRef } from "react";
import "./carousel.scss";
import LeftArrowIcon from "../../icons/leftCarouserArrow";
import RightArrowIcon from "../../icons/rightCarouselArrow";

interface CarouselProps {
  className?: string;
  style?: React.CSSProperties;
  withIndicators?: boolean;
  leftArrowIcon?: string;
  rightArrowIcon?: string;
  options?: React.ReactNode[];
  images? : string[];
  height?: string;
  width?: string;
  loop?: boolean;
  isDraggable?: boolean;
  withControls?: boolean;
  controlSize?: SizeType;
  controlOffset?: SizeType;
  slideGap?: SizeType;
  orientation?: "vertical" | "horizontal";
  slideSize?: number;
  progressIndicator?: boolean;
  noOfIndicators?: number;
  align?: "start" | "center" | "end";
}

type SizeType = 1 | 2 | 3 | 4 | 5;

export const Carousel: React.FC<CarouselProps> = ({
  className,
  style,
  withIndicators = true,
  leftArrowIcon = "‹",
  rightArrowIcon = "›",
  options= [],
  images =[],
  height,
  width,
  loop = false,
  isDraggable= false,
  withControls= true,
  controlSize = 5,
  controlOffset,
  slideGap,
  orientation = 'horizontal',
  slideSize = 100,
  progressIndicator = false,
  noOfIndicators = 5,
  align = 'center',
}: CarouselProps) => {

  const [currentPosition, setCurrentPosition] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);


  const controlSizeController = {
    1: "controler-size-one",
    2: "controler-size-two",
    3: "controler-size-three",
    4: "controler-size-four",
    5: "controler-size-five"
  }

  const controlOffsetController = {
    1: "controler-offset-one",
    2: "controler-offset-two",
    3: "controler-offset-three",
    4: "controler-offset-four",
    5: "controler-offset-five"
  }

  const scrollToRight = () => {
    const nextPage = currentPosition + 1;

    if (images.length > nextPage) {
      carouselRef.current?.children[nextPage].scrollIntoView({
        behavior: "smooth",
        block: 'nearest',
      });
      setCurrentPosition(nextPage);
    }
  };

  const scrollToLeft = () => {
    const previousPage = currentPosition - 1;
    if (previousPage >= 0) {
      carouselRef.current?.children[previousPage].scrollIntoView({
        behavior: "smooth",
        block: 'nearest',
      });
      setCurrentPosition(previousPage);
    }
  };

  return (
        <div className={`carousel-container ${className}`} style = {{ justifyContent : align, width: width, height:height}}>
      {
        <div ref={carouselRef} className="carousel-image-container">
          {images.map((option, index) =>{
            return (
                <img className={`carousel-images`} src ={option} key = {index}/>
            )
          })}
        </div>
      }
      { withControls && (<div className={`arrow carousel-arrow-left ${controlSizeController[controlSize]}`} onClick={scrollToLeft}>
        {leftArrowIcon}
      </div>)}

      { withControls && (<div className={`arrow carousel-arrow-right ${controlSizeController[controlSize]}`} onClick={scrollToRight}>
        {rightArrowIcon}
      </div>)}

      {withIndicators && (<div className="slide-indicators">
        {images.map((obj, index) => {
          return (
            <div
              className={`indicator-bullets ${
                index === currentPosition && `is-indicator-bullets-active`
              }`}
            ></div>
          );
        })}
      </div>)}
    </div>
  );
};
