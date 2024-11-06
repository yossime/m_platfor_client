import React from "react";
import { SliderStyleComponent } from "../boards/slider/SliderStyle";
import { ProductStyleComponent } from "../boards/product/ProductStyle";
import { HeaderStyleComponent } from "../boards/header/HeaderStyle";
import { ImageStyleComponent } from "../boards/image/ImageStyle";
import { VideoStyleComponent } from "../boards/video/VideoStyle";
import { TestimonialsStyleComponent } from "../boards/testimonials/TestimonialsStyle";
import { ServicesStyleComponent } from "../boards/services/ServicesStyle";
import { GamificationStyleComponent } from "../boards/gamification/GamificationStyle";
import { FormStyleComponent } from "../boards/form/FormStyle";
import { SocialsStyleComponent } from "../boards/socials/SocialsStyle";
import { ArticleStyleComponent } from "../boards/article/ArticleStyle";
import { SubscriptionStyleComponent } from "../boards/subscription/SubscriptionStyle";
import { useSidebarContext } from "@/context/SidebarContext ";
import { GlobalComponent } from "../WorldSideBar/GlobalComponent";

export const StyleComponent: React.FC = () => {
  const { activeSidebarHeader } = useSidebarContext();

  switch (activeSidebarHeader) {
    case "Header":
      return <HeaderStyleComponent />;
    case "Product":
      return <ProductStyleComponent />;
    case "Slider":
      return <SliderStyleComponent />;
    case "Image":
      return <ImageStyleComponent />;
    case "Video":
      return <VideoStyleComponent />;
    case "Testimonials":
      return <TestimonialsStyleComponent />;
    case "Subscription":
      return <SubscriptionStyleComponent />;
    case "Services":
      return <ServicesStyleComponent />;
    case "Gamification":
      return <GamificationStyleComponent />;
    case "Form":
      return <FormStyleComponent />;
    case "Socials":
      return <SocialsStyleComponent />;
    case "Article":
      return <ArticleStyleComponent />;
    case "World":
      return <GlobalComponent />;

    default:
      return <div>No style options available for {activeSidebarHeader}</div>;
  }
};

