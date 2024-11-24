import { BounceLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div className="">
      <div className="flex bg-white p-6 rounded-xl bg-opacity-50 flex-col items-center gap-10 z-10 relative">
        <BounceLoader color={"#123abc"} loading={true} size={100} />
        <p className="text-2xl text-black">ครูบากำลังช่วยเหลือหมูเด้ง</p>
      </div>
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="sound/krubavideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loading;
