import React from "react";

import "./index.less";

export interface AppLoaderProps {
  imageSrc: string;
}

const AppLoader: React.FC<AppLoaderProps> = ({ imageSrc }) => {
  return (
    <div className="loader">
      <div className="loader-wrapper">
        <div className="loader-container">
          <div className="loader-logo-container">
            <div className="loader-logo">
              <img alt="loader" src={imageSrc} />
            </div>
          </div>
        </div>
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};

export default AppLoader;
