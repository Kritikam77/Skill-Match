// import { UseTranslate } from "../hooks/useTranslate";
import photo1 from "/images/1.png";
import photo2 from "/images/2.png";
import photo3 from "/images/3.png";
import photo4 from "/images/4.png";
import photo5 from "/images/5.png";

const Providers = () => {
  // const translate = UseTranslate({ minValue: 160, maxValue: 220, step: 20 });

  return (
    <div
      // className="flex flex-col absolute top-0 bg-bgColor-dark h-auto w-full z-20 mb-10"
      className="flex flex-col bg-bgColor-dark h-[250vh] w-full z-20 mb-10"
      style={{
        // transform: `translateY(-${translate}px)`,
      }}
    >
      <div className="flex font-oswald text-[10vh] font-extrabold h-[40vh] ">
        <span className="m-auto">OUR BEST PROVIDERS !</span>
      </div>
      <div className="h-auto grid grid-cols-[49.5%_1%_49.5%] w-[100vw] ">
        {/* left */}
        <div className="m-auto h-full w-full text-center grid grid-rows-[50vh_50vh_50vh] ">
          <img
            src={photo1}
            className="m-auto w-[50%] h-auto object-contain object-center border-5 border-black  scale-125 rotate-[2deg]"
            style={{
              border: "10px solid black",
            }}
          />
          <img
            src={photo2}
            className="m-auto w-[50%] h-auto object-contain object-center border-5 border-black  scale-125 rotate-[-3deg]"
            style={{
              border: "10px solid black",
            }}
          />
          <img
            src={photo3}
            className="m-auto w-[50%] h-auto object-contain object-center border-5 border-black  scale-125 rotate-[3deg]"
            style={{
              border: "10px solid black",
            }}
          />
        </div>
        <div className="bg-black m-auto h-full w-[50%]"></div>

        {/* right */}
        <div className="m-auto h-full w-full text-center">
          <div className="m-auto h-full w-full text-center grid grid-rows-[50vh_50vh_50vh]">
            <img
              src={photo4}
              className="m-auto w-[50%] h-auto object-contain object-center border-5 border-black  scale-125 rotate-[-2deg]"
              style={{
                border: "10px solid black",
              }}
            />
            <img
              src={photo5}
              className="m-auto w-[50%] h-auto object-contain object-center border-5 border-black  scale-125 rotate-[3deg]"
              style={{
                border: "10px solid black",
              }}
            />
            <img
              src={photo1}
              className="m-auto w-[50%] h-auto object-contain object-center border-5 border-black scale-125 rotate-[-3deg]"
              style={{
                border: "10px solid black",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Providers;
