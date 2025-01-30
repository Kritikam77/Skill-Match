// import { useState, useEffect } from "react";
// import { UseTranslate } from "../hooks/useTranslate";

const ServiceList = () => {
  // const translate = UseTranslate({ minValue: 72, maxValue: 120, step: 15 });
  // const [smoothTranslate, setSmoothTranslate] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSmoothTranslate((prev) =>prev + (translate - prev) * 0.1);
  //   }, 16); // ~60FPS for smooth animation

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [translate]);

  return (
    <div
      // className="absolute top-0 bg-bgColor-dark h-[100vh] w-full z-40 "
      className="relative bg-bgColor-dark h-[100vh] w-full z-40 "
      style={{
        // transform: `translateY(-${translate}px)`,
      }}
    >
      <div className="flex text-white font-josefin text-[6vh] m-auto text-center w-[80%] h-full ">
        <span className="m-auto">
          We provide a wide range of services, in a wide range of locations, all
          over India!!
        </span>
      </div>
      <div className="text-fontColor-sec font-josefin">
        <div
          // className="absolute top-[90vh] left-[20vw] text-[5vh]"
          className="absolute top-[90vh] left-[20vw] text-[5vh]"
          style={{
            // transform: `translateY(-${smoothTranslate * 0.5}px)`,
          }}
        >
          Coding
        </div>

        <div
          className="absolute top-[30vh] right-[20vw] text-[5vh]"
          style={{
            // transform: `translateY(-${smoothTranslate * 0.5}px)`,
          }}
        >
          Photography
        </div>

        <div
          className="absolute top-[85vh] right-[20vw] text-[5vh]"
          style={{
            // transform: `translateY(-${smoothTranslate * 0.5}px)`,
          }}
        >
          Filmography
        </div>

        <div
          className="absolute top-[70vh] left-[5vw] text-[5vh]"
          style={{
            // transform: `translateY(-${smoothTranslate * 0.5}px)`,
          }}
        >
          Plumbing
        </div>

        <div
          className="absolute top-[10vh] left-[10vw] text-[5vh]"
          style={{
            // transform: `translateY(-${smoothTranslate * 0.5}px)`,
          }}
        >
          Electrician
        </div>

        <div
          className="absolute top-[10vh] left-[45vw] text-[5vh]"
          style={{
            // transform: `translateY(-${smoothTranslate * 0.5}px)`,
          }}
        >
          Beautician
        </div>

        <div
          className="absolute top-[69vh] left-[89vw] text-[5vh]"
          style={{
            // transform: `translateY(-${smoothTranslate * 0.5}px)`,
          }}
        >
          Digital Art
        </div>

        <div
          className="absolute top-[30vh] left-[30vw] text-[5vh]"
          style={{
            // transform: `translateY(-${smoothTranslate * 0.5}px)`,
          }}
        >
          Painter
        </div>

        <div
          className="absolute top-[67vh] left-[250vw] text-[5vh]"
          style={{
            // transform: `translateY(-${smoothTranslate * 0.5}px)`,
          }}
        >
          Organizer
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
