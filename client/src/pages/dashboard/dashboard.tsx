import React from "react";
import "./dashboard.scss";
import ThoughtIcon from "../../icons/thoughtIcon";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import { TopButtons } from "../../components/topButton/topButton";
import { NewsDrop } from "../../components/newsDrop/newsDrop";
import { ThoughtComponent } from "../../components/thoughtsContainer/thought";
import { ServiceCompomponent } from "../../components/serviceComponent/serviceComponent";
import { StackComponent } from "../../components/stackComponent/stackComponent";
import { CourseImageComponent } from "../../components/courseImageComponent/courseImages";
import { OverviewComponent } from "../../components/overviewComponent/overviewComponent";

export const Dashboard: React.FC<DashboardProps> = ({
  className,
  pageTitle = "Your Ultimate Tilte which you can easliy customize",
  pageSubtitle = "The Original family of vampires settle down in the city of New Orleans that they helped to construct several",
  topButtonTagOne = "About",
  topButtonTagTwo = "E-Mail",
  newsDropTitile = "News Drop",
  newsDropElements = [
    {
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg",
      title: "Image Title",
      description: "Add your thoughts about this images",
    },
    {
      image:
        "https://img.freepik.com/free-vector/gradient-ui-ux-landing-page-template_23-2149053801.jpg?size=626&ext=jpg&ga=GA1.1.507716930.1702729428&semt=ais",
      title: "Image Title",
      description: "Add your thoughts about this images",
    },
  ],
  thoughtComponentTitle = "Thoughts",
  thoughtComponentSubtitle = "write a small description about this section",
  thoughtElement = [
    {
      icon: <ThoughtIcon width="20" />,
      thought: "Spread your though here ",
      tag: "TagName",
    },
    {
      icon: <ThoughtIcon width="20" />,
      thought: "Spread your though here ",
      tag: "TagName",
    },
    {
      icon: <ThoughtIcon width="20" />,
      thought: "Spread your though here ",
      tag: "TagName",
    },
    {
      icon: <ThoughtIcon width="20" />,
      thought: "Spread your though here ",
      tag: "TagName",
    },
    {
      icon: <ThoughtIcon width="20" />,
      thought: "Spread your though here ",
      tag: "TagName",
    },
    {
      icon: <ThoughtIcon width="20" />,
      thought: "Spread your though here ",
      tag: "TagName",
    },
  ],
  serviceElements = [
    {
      icon: <ThoughtIcon width="20" />,
      title: "Online Courses",
      subtitle: "Dive into our comprehensive course",
      buttonText: "View Course",
    },
    {
      icon: <ThoughtIcon width="20" />,
      title: "Online Courses",
      subtitle: "Dive into our comprehensive course",
      buttonText: "View Course",
    },
  ],
  stackComponentTitle = "Stack",
  stackComponentSubtitle = "Software and resource we cover in this course.",
  stackElement = [
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
    {
      icon: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format",
      title: "Figma",
      subtitle: "Design tools",
    },
  ],
  courseImageElement = [
    {
      image:
        "https://img.freepik.com/free-photo/beautiful-cubism-graffiti_23-2150555449.jpg?t=st=1692893018~exp=1692896618~hmac=6451213434969a21032f756cad5f648e2e946d05f8df815db6593ed3149b3fac",
      courseTitle: "Custom Online Course",
      courseSubtitle:
        "Collaborate with MIT to create custom leadership training and transformative programs for high performing executives.",
    },
    {
      image:
        "https://img.freepik.com/free-photo/beautiful-cubism-graffiti_23-2150555449.jpg?t=st=1692893018~exp=1692896618~hmac=6451213434969a21032f756cad5f648e2e946d05f8df815db6593ed3149b3fac",
      courseTitle: "Custom Online Course",
      courseSubtitle:
        "Collaborate with MIT to create custom leadership training and transformative programs for high performing executives.",
    },
    {
      image:
        "https://img.freepik.com/free-photo/beautiful-cubism-graffiti_23-2150555449.jpg?t=st=1692893018~exp=1692896618~hmac=6451213434969a21032f756cad5f648e2e946d05f8df815db6593ed3149b3fac",
      courseTitle: "Custom Online Course",
      courseSubtitle:
        "Collaborate with MIT to create custom leadership training and transformative programs for high performing executives.",
    },
  ],
  overviewTitle = "Overview",
  overviewMainContent = "a visual presentation, or a brief explanation that gives a quick understanding of the main aspects of a subject. The purpose of an overview is to provide a snapshot or introduction before a more in-depth exploration or examination of the topic.",
  overviewSubcontent = "An overview typically refers to a brief summary or general understanding of a topic, situation, or document. It provides a high-level perspective or summary that highlights key points without delving into specific details. In different contexts, an overview can be presented in various forms, such as a written summary.",
  courseDetailsTitle = "Course details",
  courseDetails = [
    "Duration of 8 weeks",
    "Video lectures, downloads & final exam",
    "Lifetime access",
    "Extra services",
  ],
  overviewButtonOne = "Access now instantly",
  overviewButtonTwo = "View FAQs",
}: DashboardProps) => {
  return (
    <div className={`dashboard`}>
      <div className={`dashboard-container`}>
        <PageTitle title={pageTitle} subtitle={pageSubtitle} />
        <TopButtons
          topButtonTagOne={topButtonTagOne}
          topButtonTagTwo={topButtonTagTwo}
        />
        <NewsDrop
          newsDropTitile={newsDropTitile}
          newsDropElements={newsDropElements}
        />
        <ThoughtComponent
          thoughtComponentTitle={thoughtComponentTitle}
          thoughtComponentSubtitle={thoughtComponentSubtitle}
          thoughtElement={thoughtElement}
        />
        <ServiceCompomponent serviceElements={serviceElements} />
        <StackComponent
          stackComponentTitle={stackComponentTitle}
          stackComponentSubtitle={stackComponentSubtitle}
          stackElement={stackElement}
        />
        <CourseImageComponent courseImageElement={courseImageElement} />
        <OverviewComponent
          overviewTitle={overviewTitle}
          overviewMainContent={overviewMainContent}
          overviewSubcontent={overviewSubcontent}
          courseDetailsTitle={courseDetailsTitle}
          courseDetails={courseDetails}
          overviewButtonOne={overviewButtonOne}
          overviewButtonTwo={overviewButtonTwo}
        />
      </div>
    </div>
  );
};
