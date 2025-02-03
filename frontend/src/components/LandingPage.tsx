import Header from "../components/Header";
// import { UseTranslate } from "../hooks/useTranslate";
import home from "/images/home.png";

const LandingPage = () => {
  // const translate = UseTranslate({ minValue: -10, maxValue: 70, step: 20 });

  return (
    <div
      // className="z-50 w-full h-auto bg-bgColor flex flex-col absolute top-0 transform transition-all"
      className="z-50 w-full h-auto bg-bgColor flex flex-col transform transition-all"
      style={{
        borderBottomLeftRadius: "8rem",
        borderBottomRightRadius: "8rem",
        // transform: `translateY(-${translate}px)`,
      }}
    >
      <Header />
      {/* first */}
      <div className="relative h-[90vh] w-full mb-20">
        <div className="w-[100vw] md:w-[50vw] h-full absolute  ">
          <img
            src={home}
            className="top-[15vh] md:left-[10vw] absolute h-[80vh] w-auto bg-blur-600"
          />
        </div>
        <div className="w-[100vw] md:w-[70vw] h-full absolute md:right-0 mt-[22vh]">
          <div className="text-fontColor-prim font-oswald text-[5vh] md:text-[11vh] text-center font-bold w-[90%] m-auto md:w-[100%]">
            Skilled Professionals at Your Fingertips
          </div>
          <div
            className="text-[3vh] md:text-[5vh] font-oswald text-center "
            style={{ textShadow: "2px 2px 4px rgba(255,255,0,.2)" }}
          >
            From coding to carpentry, find experts who match your needs
            perfectly.
          </div>
        </div>
      </div>

      {/* second */}
      <div className="relative h-[100vh] w-full grid grid-cols-[49.5vw_1vw_49.5vw] mt-10">
        <div className="w-full h-full text-right text-[7vh] md:text-[20vh] font-extrabold font-oswald flex">
          <span className="mt-auto mb-auto text-right w-full mr-[1vh] md:mr-[3vh]">
            What <br /> We <br /> Provide
          </span>
        </div>
        <div className="w-[40%] bg-black h-[90%]">{/* whatever */}</div>
        <div className=" w-[70%] mt-auto mb-auto text-[2.5vh] md:text-[4.5vh] font-josefin ml-[3vh] md:ml-[5vh] leading-relaxed">
          Looking for someone to fix or create something for you?
          <br />
          <br /> Search professionals by location, skills, and availability.{" "}
          <br />
          <br /> Browse detailed profiles with reviews, and book the right
          expert for your needs—all in just a few clicks!
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
