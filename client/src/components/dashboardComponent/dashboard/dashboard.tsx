import React from "react";
import "./dashboard.scss";
import ThoughtIcon from "../../../icons/thoughtIcon";
import { PageTitle } from "../pageTitle/pageTitle";
import { TopButtons } from "../top-button/topButton";
import { newsDrop, NewsDrop } from "../news-drop/newsDrop";
import { Thoughts, ThoughtComponent } from "../thoughts-container/thought";
import {
  ServiceBox,
  ServiceCompomponent,
} from "../serviceComponent/serviceComponent";
import { StackBox, StackComponent } from "../stackComponent/stackComponent";
import {
  CourseImage,
  CourseImageComponent,
} from "../courseImageComponent/CourseImages";
import { OverviewComponent } from "../overviewComponent/overviewComponent";

interface DashboardProps {
  className?: string;
  page_title?: string;
  page_subtitle?: string;
  top_button_tag_one?: string;
  top_button_tag_two?: string;
  news_drop_titile?: string;
  news_drop_elements?: newsDrop[];
  thought_component_title?: string;
  thought_component_subtitle?: string;
  thought_element?: Thoughts[];
  service_elements?: ServiceBox[];
  stack_component_title?: string;
  stack_component_subtitle?: string;
  stack_element?: StackBox[];
  course_image_element?: CourseImage[];
  overview_title?: string;
  overview_main_content?: string;
  overview_subcontent?: string;
  course_details_title?: string;
  course_details?: string[];
  overview_button_one?: string;
  overview_button_two?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  className,
  page_title = "Your Ultimate Tilte which you can easliy customize",
  page_subtitle = "The Original family of vampires settle down in the city of New Orleans that they helped to construct several",
  top_button_tag_one = "About",
  top_button_tag_two = "E-Mail",
  news_drop_titile = "News Drop",
  news_drop_elements = [
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
  thought_component_title = "Thoughts",
  thought_component_subtitle = "write a small description about this section",
  thought_element = [
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
  service_elements = [
    {
      icon: <ThoughtIcon width="20" />,
      title: "Online Courses",
      subtitle: "Dive into our comprehensive course",
      button_text: "View Course",
    },
    {
      icon: <ThoughtIcon width="20" />,
      title: "Online Courses",
      subtitle: "Dive into our comprehensive course",
      button_text: "View Course",
    },
  ],
  stack_component_title = "Stack",
  stack_component_subtitle = "Software and resource we cover in this course.",
  stack_element = [
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
  course_image_element = [
    {
      image:
        "https://img.freepik.com/free-photo/beautiful-cubism-graffiti_23-2150555449.jpg?t=st=1692893018~exp=1692896618~hmac=6451213434969a21032f756cad5f648e2e946d05f8df815db6593ed3149b3fac",
      course_title: "Custom Online Course",
      course_subtitle:
        "Collaborate with MIT to create custom leadership training and transformative programs for high performing executives.",
    },
    {
      image:
        "https://img.freepik.com/free-photo/beautiful-cubism-graffiti_23-2150555449.jpg?t=st=1692893018~exp=1692896618~hmac=6451213434969a21032f756cad5f648e2e946d05f8df815db6593ed3149b3fac",
      course_title: "Custom Online Course",
      course_subtitle:
        "Collaborate with MIT to create custom leadership training and transformative programs for high performing executives.",
    },
    {
      image:
        "https://img.freepik.com/free-photo/beautiful-cubism-graffiti_23-2150555449.jpg?t=st=1692893018~exp=1692896618~hmac=6451213434969a21032f756cad5f648e2e946d05f8df815db6593ed3149b3fac",
      course_title: "Custom Online Course",
      course_subtitle:
        "Collaborate with MIT to create custom leadership training and transformative programs for high performing executives.",
    },
  ],
  overview_title = "Overview",
  overview_main_content = "a visual presentation, or a brief explanation that gives a quick understanding of the main aspects of a subject. The purpose of an overview is to provide a snapshot or introduction before a more in-depth exploration or examination of the topic.",
  overview_subcontent = "An overview typically refers to a brief summary or general understanding of a topic, situation, or document. It provides a high-level perspective or summary that highlights key points without delving into specific details. In different contexts, an overview can be presented in various forms, such as a written summary.",
  course_details_title = "Course details",
  course_details = [
    "Duration of 8 weeks",
    "Video lectures, downloads & final exam",
    "Lifetime access",
    "Extra services",
  ],
  overview_button_one = "Access now instantly",
  overview_button_two = "View FAQs",
}: DashboardProps) => {
  return (
    <div className={`dashboard`}>
      <div className={`dashboard-container`}>
        <PageTitle title={page_title} subtitle={page_subtitle} />
        <TopButtons
          top_button_tag_one={top_button_tag_one}
          top_button_tag_two={top_button_tag_two}
        />
        <NewsDrop
          news_drop_titile={news_drop_titile}
          news_drop_elements={news_drop_elements}
        />
        <ThoughtComponent
          thought_component_title={thought_component_title}
          thought_component_subtitle={thought_component_subtitle}
          thought_element={thought_element}
        />
        <ServiceCompomponent service_elements={service_elements} />
        <StackComponent
          stack_component_title={stack_component_title}
          stack_component_subtitle={stack_component_subtitle}
          stack_element={stack_element}
        />
        <CourseImageComponent course_image_element={course_image_element} />
        <OverviewComponent
          overview_title={overview_title}
          overview_main_content={overview_main_content}
          overview_subcontent={overview_subcontent}
          course_details_title={course_details_title}
          course_details={course_details}
          overview_button_one={overview_button_one}
          overview_button_two={overview_button_two}
        />
      </div>
    </div>
  );
};
