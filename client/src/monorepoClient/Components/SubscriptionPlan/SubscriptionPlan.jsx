// import React, { useContext } from "react";
// import Card from "../Card/Card";
// import TextComponent from "../TextComponent/TextComponent";
// import "./SubscriptionPlan.scss";
// import blackCheckBox from "../../assets/images/blackCheckBox.svg";
// import ImageComponent from "../ImageComponent/ImageComponent";
// import { ButtonComponent } from "../Button/Button";
// import LeftCardCircle from "../../assets/images/leftCardCircle.svg";
// import BottomCardCircle from "../../assets/images/bottomCardCircle.svg";
// import RightSubscriptionCircle from "../../assets/images/rightSubscriptionCircle.svg";
// import leftSubscriptionCircle from "../../assets/images/leftSubscriptionCircle.svg";
// import { ThemeContext } from "../Themecontext/ThemeContext";
// const SubscriptionPlan = () => {
//   const { darkMode } = useContext(ThemeContext);
//   return (
//     <div
//       id="Pricing"
//       className={
//         darkMode
//           ? "subscriptionPlan subscriptionPlanBlack"
//           : "subscriptionPlan subscriptionPlanWhite"
//       }
//     >
//       <div
//         className={
//           darkMode ? "background backgroundBlack" : "background backgroundWhite"
//         }
//       ></div>
//       <ImageComponent
//         className="rightSubscriptionCircle"
//         src={RightSubscriptionCircle}
//         alt="rightsubscrtiptionCircle"
//       />
//       <ImageComponent
//         className="leftSubscriptionCircle"
//         src={leftSubscriptionCircle}
//         alt="LeftSubscriptionCircle"
//       />
//       <TextComponent
//         className={
//           darkMode
//             ? "planDescription planDescriptionBlack"
//             : "planDescription planDescriptionWhite"
//         }
//       >
//         <h2 id="Pricing">Our Plans</h2>
//         <p>
//           Get more advertising conversions starting today and stop losing
//           customers to slow landing pages. With Swipe Pages you get the power of
//           AMP to build blazing fast mobile landing pages to boost ad
//           conversions.
//         </p>
//       </TextComponent>
//       <div className="planCardList">
//         <Card className="card">
//           <ImageComponent
//             className="leftCardCircle"
//             src={LeftCardCircle}
//             alt="leftCardCircle"
//           />
//           <ImageComponent
//             className="bottomCardCircle"
//             src={BottomCardCircle}
//             alt="bottomCardCircle"
//           />
//           <TextComponent className="cardContent">
//             <h3 className="planHeader">Starter</h3>
//             <h2 className="planPrice">FREE</h2>
//             <div className="serviceText">
//               <ImageComponent src={blackCheckBox} alt={"blackCheckBox"} />
//               <p className="services">Free Hosting</p>
//             </div>
//             <div className="serviceText">
//               <ImageComponent src={blackCheckBox} alt={"blackCheckBox"} />
//               <p className="services">Mobile Responsive templates</p>
//             </div>
//             <div className="serviceText">
//               <ImageComponent src={blackCheckBox} alt={"blackCheckBox"} />
//               <p className="services">Unlimited traffic and leads</p>
//             </div>
//           </TextComponent>
//           <ButtonComponent className="swipPageBtn">
//             Get Swipe Pages Now
//           </ButtonComponent>
//         </Card>
//         <Card className="card">
//           <ImageComponent
//             className="leftCardCircle"
//             src={LeftCardCircle}
//             alt="leftCardCircle"
//           />
//           <ImageComponent
//             className="bottomCardCircle"
//             src={BottomCardCircle}
//             alt="bottomCardCircle"
//           />
//           <TextComponent className="cardContent">
//             <h3 className="planHeader">Super</h3>
//             <h2 className="planPrice">$ 22</h2>
//             <div className="serviceText">
//               <ImageComponent src={blackCheckBox} alt={"blackCheckBox"} />
//               <p className="services">Unlimited A/B Split Testing</p>
//             </div>
//             <div className="serviceText">
//               <ImageComponent src={blackCheckBox} alt={"blackCheckBox"} />
//               <p className="services">Email Trigger links</p>
//             </div>
//             <div className="serviceText">
//               <ImageComponent src={blackCheckBox} alt={"blackCheckBox"} />
//               <p className="services">Advanced integrations</p>
//             </div>
//           </TextComponent>
//           <ButtonComponent className="swipPageBtn">
//             Get Swipe Pages Now
//           </ButtonComponent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPlan;
