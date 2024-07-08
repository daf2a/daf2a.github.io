import React from 'react';
import Lottie from 'lottie-react';
import animationData from "@/assets/cat_animation.json";

const LottieAnimationCat: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      style={{ width: 300, height: 300 }}
      loop={true}
      autoplay={true}
    />
  );
};

export default LottieAnimationCat;
