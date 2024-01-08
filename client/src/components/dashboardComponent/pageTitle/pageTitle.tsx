import React from "react";
import "./pageTitle.scss";
interface PageTitleProps{
    title?: string;
    subtitle?: string;
}
export const PageTitle: React.FC<PageTitleProps>=({
    title,
    subtitle
}:PageTitleProps)=>{
    return(
        <div className={`titles-container`}>
          <div className="page-title">
            <div className={`title`}>{title}</div>
            <div className={`subtitle`}>{subtitle}</div>
          </div>
        </div>
    );
};