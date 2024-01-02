// import React, { useContext, useState } from 'react'
// import "./FeatureCardList.scss"
// import Card from "../Card/Card"
// import Frontend from "../../assets/images/frontendImage.svg"
// import Backend from "../../assets/images/backendImage.svg"
// import FullStack from "../../assets/images/fullstackImage.svg"
// import ImageComponent from '../ImageComponent/ImageComponent'
// import TextComponent from "../TextComponent/TextComponent"
// import FeatureCardCircle from "../../assets/images/featureCardCircle.svg"
// import BottomCircle from "../../assets/images/bottomCircle.svg"
// import TopCircle from "../../assets/images/topCircle.svg"
// import RightCircle from "../../assets/images/rightSubscriptionCircle.svg"
// import { ThemeContext } from "../Themecontext/ThemeContext";

// const FeatureCardList = () => {
//   const { darkMode } = useContext(ThemeContext);
//   const [showDetailCardOne, setShowDetailCardOne] = useState(false);
//   const [showDetailCardTwo, setShowDetailCardTwo] = useState(false);
//   const [showDetailCardThree, setShowDetailCardThree] = useState(false);
//   const handleOnMouseHoverOneOver = () => {
//     // setShowDetailCardOne(true);
//     setShowDetailCardOne(prev => !prev);
//   }
//   // const handleOnMouseHoverOneOut = () => {
//   //   setShowDetailCardOne(false);
//   // }
//   const handleOnMouseHoverTwoOver = () => {
//     // setShowDetailCardTwo(true);
//     setShowDetailCardTwo((prev) => !prev);
//   }
//   // const handleOnMouseHoverTwoOut = () => {
//   //   setShowDetailCardTwo(false);
//   // };
//   const handleOnMouseHoverThreeOver = () => {
//     // setShowDetailCardThree(true);
//     setShowDetailCardThree((prev) => !prev);
//   }
//   // const handleOnMouseHoverThreeOut = () => {
//   //   setShowDetailCardThree(false);
//   // };
//     return (
//       <div
//         id="Courses"
//         className={
//           darkMode
//             ? "featureCardList featureCardListBlack"
//             : "featureCardList featureCardListWhite"
//         }
//       >
//         <div className="cardContainer">
//           <Card
//             // onMouseOut={handleOnMouseHoverOneOut}
//             // onMouseOver={handleOnMouseHoverOneOver}
//             onClick={handleOnMouseHoverOneOver}
//             className="featureCard"
//           >
//             {showDetailCardOne ? (
//               <div className="courseDetail">
//                 <ImageComponent
//                   className="topCircle"
//                   src={TopCircle}
//                   alt={"TopCircle"}
//                 />
//                 <ImageComponent
//                   className="bottomCircle"
//                   src={BottomCircle}
//                   alt={"BottomCircle"}
//                 />
//                 <ImageComponent
//                   className="rightCircle"
//                   src={RightCircle}
//                   alt={"RightCircle"}
//                 />
//                 <div className="left">
//                   <div className="heading">Frontend Web development</div>
//                   <TextComponent className="week">
//                     <p className="bold">Week 1: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 2: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 3: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 4: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                 </div>
//                 <div className="right">
//                   <div className="duration">
//                     Duration of the course : <span>6 weeks</span>
//                   </div>
//                   <TextComponent className="week">
//                     <p className="bold">Week 1: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 2: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 3: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 4: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <ImageComponent
//                   className="cardImage"
//                   src={Frontend}
//                   alt="frontend"
//                 />
//                 <TextComponent>
//                   <h4>Frontend Web development</h4>
//                   <p className="paragraph">
//                     Duration of the course: <span>6 weeks</span>
//                   </p>
//                 </TextComponent>{" "}
//               </>
//             )}
//           </Card>
//           <Card
//             // onMouseOut={handleOnMouseHoverTwoOut}
//             // onMouseOver={handleOnMouseHoverTwoOver}
//             onClick={handleOnMouseHoverTwoOver}
//             className="featureCard"
//           >
//             {showDetailCardTwo ? (
//               <div className="courseDetail">
//                 <ImageComponent
//                   className="topCircle"
//                   src={TopCircle}
//                   alt={""}
//                 />
//                 <ImageComponent
//                   className="bottomCircle"
//                   src={BottomCircle}
//                   alt={"bottomCircle"}
//                 />
//                 <ImageComponent
//                   className="rightCircle"
//                   src={RightCircle}
//                   alt={"RightCircle"}
//                 />
//                 <div className="left">
//                   <div className="heading">Frontend Web development</div>
//                   <TextComponent className="week">
//                     <p className="bold">Week 1: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 2: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 3: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 4: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                 </div>
//                 <div className="right">
//                   <div className="duration">
//                     Duration of the course : <span>6 weeks</span>
//                   </div>
//                   <TextComponent className="week">
//                     <p className="bold">Week 1: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 2: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 3: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 4: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <ImageComponent
//                   className="cardImage"
//                   src={Backend}
//                   alt="backend"
//                 />
//                 <TextComponent>
//                   <h4>Frontend Web development</h4>
//                   <p className="paragraph">
//                     Duration of the course: <span>6 weeks</span>
//                   </p>
//                 </TextComponent>
//               </>
//             )}
//           </Card>
//           <Card
//             // onMouseOut={handleOnMouseHoverThreeOut}
//             // onMouseOver={handleOnMouseHoverThreeOver}
//             onClick={handleOnMouseHoverThreeOver}
//             className="featureCard"
//           >
//             {showDetailCardThree ? (
//               <div className="courseDetail">
//                 <ImageComponent
//                   className="topCircle"
//                   src={TopCircle}
//                   alt={"TopCircle"}
//                 />
//                 <ImageComponent
//                   className="bottomCircle"
//                   src={BottomCircle}
//                   alt={"BottomCircle"}
//                 />
//                 <ImageComponent
//                   className="rightCircle"
//                   src={RightCircle}
//                   alt={"RightCircle"}
//                 />
//                 <div className="left">
//                   <div className="heading">Frontend Web development</div>
//                   <TextComponent className="week">
//                     <p className="bold">Week 1: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 2: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 3: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 4: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                 </div>
//                 <div className="right">
//                   <div className="duration">
//                     Duration of the course : <span>6 weeks</span>
//                   </div>
//                   <TextComponent className="week">
//                     <p className="bold">Week 1: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 2: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 3: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                   <TextComponent className="week">
//                     <p className="bold">Week 4: </p>
//                     <p>Lorem ipsum dolor sit amet, consectetu</p>
//                   </TextComponent>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <ImageComponent
//                   className="cardImage"
//                   src={FullStack}
//                   alt="fullstack"
//                 />
//                 <TextComponent>
//                   <h4>Frontend Web development</h4>
//                   <p className="paragraph">
//                     Duration of the course: <span>6 weeks</span>
//                   </p>
//                 </TextComponent>
//               </>
//             )}
//           </Card>
//         </div>
//         <ImageComponent
//           className="featureCardCircle"
//           src={FeatureCardCircle}
//           alt="featureCardCircle"
//         />
//       </div>
//     );
// }

// export default FeatureCardList
