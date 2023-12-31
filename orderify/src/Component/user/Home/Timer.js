import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";

const Timer = forwardRef(({ end_time, start_time }, ref) => {
  const [countDownTime, setCountDownTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isShopOpen, setIsShopOpen] = useState(true);

  useImperativeHandle(ref, () => ({
    startCountDown: startCountDown,
  }));

  const getTimeDifference = () => {

    const currentDate = new Date();
    const targetDate = new Date();
    const startDate = new Date();
    
    targetDate.setHours(end_time.split(":")[0], end_time.split(":")[1], end_time.split(":")[2]); // Set the target time
    startDate.setHours(start_time.split(":")[0], start_time.split(":")[1], start_time.split(":")[2]); // Set the target time

    // console.log(start_time)
    // if(currentDate > targetDate)
    if(currentDate < startDate){
      // targetDate.setDate(targetDate.getDate());
      targetDate.setHours(start_time.split(":")[0], start_time.split(":")[1], start_time.split(":")[2])
      setIsShopOpen(false);
    }else{
      if (currentDate > targetDate) {
        targetDate.setDate(targetDate.getDate() + 1);
        targetDate.setHours(start_time.split(":")[0], start_time.split(":")[1], start_time.split(":")[2])
        setIsShopOpen(false);
      }else{
        setIsShopOpen(true)
      }
    }

    const timeDifference = targetDate - currentDate;

    const hours =
      Math.floor(timeDifference / (1000 * 60 * 60)) >= 10
        ? Math.floor(timeDifference / (1000 * 60 * 60))
        : `0${Math.floor(timeDifference / (1000 * 60 * 60))}`;
    const minutes =
      Math.floor((timeDifference / 1000 / 60) % 60) >= 10
        ? Math.floor((timeDifference / 1000 / 60) % 60)
        : `0${Math.floor((timeDifference / 1000 / 60) % 60)}`;
    const seconds =
      Math.floor((timeDifference / 1000) % 60) >= 10
        ? Math.floor((timeDifference / 1000) % 60)
        : `0${Math.floor((timeDifference / 1000) % 60)}`;

    setCountDownTime({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  };

  const startCountDown = useCallback(() => {
    getTimeDifference();
    const interval = setInterval(() => {
      getTimeDifference();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    startCountDown();
  }, [startCountDown]);

  return (
    <div className="flex h-30 flex-col md:flex-row justify-center items-center bg-gray-800 w-fit rounded px-5 py-3">
      <div className="flex flex-col items-center  w-full h-full gap-2">
        <div className="flex flex-col justify-center gap-1 sm:gap-1">
          <div className="flex justify-between">
            <div className="text-white">Status</div>
            <div className="text-white">---{">"}</div>
            <div
              className={`${isShopOpen ? "bg-green-600" : "bg-red-600"
                } text-white font-semibold px-2 rounded w-fit`}
            >
              {isShopOpen ? "Open" : "Closed"}
            </div>
          </div>
          <div
            className={`font-semibold mb-1 ${!isShopOpen ? "text-green-600" : "text-red-600"
              }`}
          >
            {isShopOpen ? "Closing In :-" : "Opening In :-"}
          </div>
          <div className="flex gap-6">
            {Object.keys(countDownTime).map((item, index) => (
              <div
                key={index}
                className="flex flex-col shadow p-2 bg-gray-700 rounded -m-0.5 -mx-2 relative"
              >
                <div className="h-10 w-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 flex justify-between items-center bg-[#111827] rounded-lg">
                  <div className="relative h-1.5 w-1.5 sm:h-2 sm:w-2 !-left-[6px] rounded-full bg-[#B45309]"></div>
                  <span className="text-lg sm:text-xl font-semibold text-white">
                    {countDownTime[item]}
                  </span>
                  <div className="relative h-1.5 w-1.5 sm:h-2 sm:w-2 -right-[6px] rounded-full bg-[#B45309]"></div>
                </div>
                <span className="text-white text-xs sm:text-sm text-center capitalize">
                  {item}
                </span>
              </div>
            ))}

            {/* clock------------------------  */}

            <div className="flex flex-col shadow p-2 bg-gray-700 rounded -m-0.5 -mx-2 relative">
              <div className="h-10 w-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 flex justify-between items-center bg-[#111827] rounded-lg">
                <div className="relative h-1.5 w-1.5 sm:h-2 sm:w-2 !-left-[6px] rounded-full bg-[#B45309]"></div>
                <span className="relative lg:text-lg sm:text-6xl text-3xl font-semibold text-white">


                  {/* clock wise */}
                  <div style={{ transform: `rotate(${new Date().getHours() * 30}deg)`, transformOrigin: 'bottom center' }} className={`bg-[#B45309] w-1 h-2.5 sm:h-3  rounded-sm absolute bottom-1/2 `}></div>
                  <div style={{ transform: `rotate(${new Date().getMinutes() * 6}deg)`, transformOrigin: 'bottom center' }} className={`bg-white w-1 h-3 sm:h-4 rounded absolute bottom-1/2 `}></div>
                  <div style={{ transform: `rotate(${new Date().getSeconds() * 6}deg)`, transformOrigin: 'bottom center' }} className={`bg-yellow-400  w-0.5 bottom-1/2  h-4 sm:h-5 rounded absolute`}></div>
                  <div className={`bg-yellow-400 translate-y-1/2 w-1 bottom-1/2  h-1 sm:h-1 rounded-full absolute`}></div>

                  {/* anti-clock wise */}
                  {/* <div style={{ transform: `rotate(${countDownTime.hours * 30}deg)`, transformOrigin: 'bottom center' }} className={`bg-[#B45309] w-1 h-2.5 sm:h-3  rounded-sm absolute bottom-1/2 `}></div>
                    <div style={{ transform: `rotate(${countDownTime.minutes * 6}deg)`, transformOrigin: 'bottom center' }} className={`bg-white w-1 h-3 sm:h-4 rounded absolute bottom-1/2 `}></div>
                    <div style={{ transform: `rotate(${countDownTime.seconds * 6}deg)`, transformOrigin: 'bottom center'}} className={`bg-yellow-400  w-0.5 bottom-1/2  h-4 sm:h-5 rounded absolute`}></div>
                    <div className={`bg-yellow-400 translate-y-1/2 w-1 bottom-1/2  h-1 sm:h-1 rounded-full absolute`}></div> */}

                </span>
                <div className="relative h-1.5 w-1.5 sm:h-2 sm:w-2 -right-[6px] rounded-full bg-[#B45309]"></div>
              </div>
              <span className="text-white text-xs sm:text-sm text-center capitalize">
                Clock
              </span>
            </div>

          </div>
        </div>
        <h1 className={`${isShopOpen?'text-red-600':'text-green-600'} font-semibold`}>{isShopOpen?'End Time :- '+end_time:'Start Time :- '+start_time}</h1>
      </div>
    </div>
  );
});

export default Timer;
