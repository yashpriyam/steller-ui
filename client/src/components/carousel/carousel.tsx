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
  indicatorImage?: boolean;
  options?: React.ReactNode[];
  images?: string[]; // new add
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
  // slideWidth?:number;
  // slideHeight?:number;
  progressIndicator?: boolean;
  noOfIndicators?: number;
  align?: "start" | "center" | "end";
}

type SizeType = 1 | 2 | 3 | 4 | 5;

export const Carousel: React.FC<CarouselProps> = ({
  className,
  style,
  withIndicators = true,
  indicatorImage = false,
  leftArrowIcon = "‹",
  rightArrowIcon = "›",
  options = [],
  images = [],
  height,
  width,
  loop = true,
  isDraggable = false,
  withControls = true,
  controlSize = 4,
  controlOffset = 2,
  slideGap = 2,
  orientation = "horizontal",
  slideSize = 30,
  // slideWidth = 100,
  // slideHeight = 100,
  progressIndicator = false,
  noOfIndicators = 5,
  align = "center",
}: CarouselProps) => {
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [indicatorCurrentPosition, setIndicatorCurrentPosition] =
    useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const controlSizeController = {
    1: "controler-size-one",
    2: "controler-size-two",
    3: "controler-size-three",
    4: "controler-size-four",
    5: "controler-size-five",
  };

  const controlOffsetControllerLeft = {
    1: "controler-offset-left-one",
    2: "controler-offset-left-two",
    3: "controler-offset-left-three",
    4: "controler-offset-left-four",
    5: "controler-offset-left-five",
  };

  const controlOffsetControllerRight = {
    1: "controler-offset-right-one",
    2: "controler-offset-right-two",
    3: "controler-offset-right-three",
    4: "controler-offset-right-four",
    5: "controler-offset-right-five",
  };

  const slideGapControler = {
    1: "slide-gap-one",
    2: "slide-gap-two",
    3: "slide-gap-three",
    4: "slide-gap-four",
    5: "slide-gap-five",
  };

  const imageData = (options.length) !== 0 ? options : images

  console.log(options.length)
  console.log(imageData.length);

  const scrollToRightImage = (refer: any) => {
    // const nextPage = (currentPosition + 1) % images.length;
    let nextPage = currentPosition + 1;
    console.log("nextPage", nextPage);
    console.log("lenght", imageData);
    if (loop) {
      if (imageData.length === nextPage) {
        // nextPage = 0;
        setCurrentPosition(0);
      }
    }
    if (imageData.length > nextPage) {
      refer.current?.children[nextPage].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      setCurrentPosition(nextPage);
      setTimeout(() => {
        setIndicatorCurrentPosition(nextPage);
      }, 600);
    }
  };

  const scrollToLeftImage = (refer: any) => {
    let previousPage = currentPosition - 1;
    // const previousPage = (currentPosition - 1 + imageData.length) % images.length;
    if (previousPage >= 0) {
      refer.current?.children[previousPage].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      setCurrentPosition(previousPage);
      setTimeout(() => {
        setIndicatorCurrentPosition(previousPage);
      }, 600);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentPosition(index);
    setIndicatorCurrentPosition(index);
    carouselRef.current?.children[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  return (
    <div
      className={`carousel-container ${className}`}
      style={{ justifyContent: align, width: width, height: height }}
    >
      {
        <div ref={carouselRef} className="carousel-image-container">
          {options.length
            ? options.map((option, index) => {
                return (
                  <div
                  className={`carousel-options-images ${slideGapControler[slideGap]}`}
                    key={index}
                    // style={{ width: `${slideSize}%  `}}
                  >{option}</div>
                  );
              })
            : images.map((option, index) => {
                return (
                  <img
                    className={`carousel-images ${slideGapControler[slideGap]}`}
                    src={option}
                    key={index}
                    style={{ width: `${slideSize}%`}}
                  />
                );
              })}
        </div>
      }
      {withControls && (
        <div
          className={`arrow carousel-arrow-left ${controlSizeController[controlSize]} ${controlOffsetControllerLeft[controlOffset]}`}
          onClick={() => {
            scrollToLeftImage(carouselRef);
            setTimeout(() => scrollToLeftImage(indicatorRef), 555);
          }}
        >
          {leftArrowIcon}
        </div>
      )}

      {withControls && (
        <div
          className={`arrow carousel-arrow-right ${controlSizeController[controlSize]} ${controlOffsetControllerRight[controlOffset]}`}
          onClick={() => {
            scrollToRightImage(carouselRef);
            setTimeout(() => scrollToRightImage(indicatorRef), 555);
          }}
        >
          {rightArrowIcon}
        </div>
      )}

      {withIndicators && (
        <div ref={indicatorRef} className="slide-indicators">
          {imageData.map((img, index) => {
            return (
              <div
                className={`indicator-bullets ${
                  index === indicatorCurrentPosition &&
                  `is-indicator-bullets-active`
                } ${
                  index - 1 === indicatorCurrentPosition && "before-active-one"
                } ${
                  index + 1 === indicatorCurrentPosition && "after-active-one"
                }
                ${
                  index - 2 === indicatorCurrentPosition && "before-active-two"
                } ${
                  index + 2 === indicatorCurrentPosition && "after-active-two"
                }`}
                onClick={() => handleIndicatorClick(index)}
                key={index}
              >
                {indicatorImage}
              </div>
            );
          })}
        </div>
      )}
      {progressIndicator && (
        <meter
          value={currentPosition}
          min="0"
          max={images.length - 1}
          className={`progress-indicator`}
        ></meter>
      )}
    </div>
  );
};
