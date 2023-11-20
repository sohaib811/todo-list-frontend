import React from "react";

const ImageSection = () => {
  return (
    <div className="mb-8 flex items-center justify-center">
      <img
        src="./assets/images/profile.jpg"
        alt="Your Image"
        className="rounded-full h-32 w-32 object-cover mr-4 border-4"
      />
    </div>
  );
};

export default ImageSection;
