import { UseTranslate } from "../hooks/useTranslate";
import ok from "/images/ok.png"
import book from "/images/book.png"
import search from "/images/search.png"


const HowWeWork = () => {
  const translate = UseTranslate({ minValue: 115, maxValue: 155, step: 20 });

  return (
    <div
      className="flex flex-col absolute top-0 bg-bgColor-light h-[100vh] w-full z-30"
      style={{
        transform: `translateY(-${translate}px)`,
      }}
    >
      <div className="m-auto font-oswald text-[10vh] font-extrabold">
        HOW WE WORK
      </div>
      <div className="grid grid-cols-[30%_30%_30%] justify-around w-[95%] m-auto">
        <div className=" flex flex-col">
          <img src={ok} className="h-[30vh] m-auto" />
          <div className="text-center font-oswald text-[4vh]">
            Search for a service based on location and skills.
          </div>
        </div>

        <div className=" flex flex-col">
          <img src={book} className="h-[30vh] m-auto" />
          <div className="text-center font-oswald text-[4vh]">
            Find the desired professional for any skill or location!
          </div>
        </div>

        <div className=" flex flex-col">
          <img src={search} className="h-[30vh] m-auto" />
          <div className="text-center font-oswald text-[4vh]">
            Contact and enjoy the services at your convenience.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
