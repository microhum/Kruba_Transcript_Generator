import { BounceLoader } from 'react-spinners';

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-10">
            <BounceLoader color={"#123abc"} loading={true} size={100} />
            <p className='text-2xl text-black'>ครูบากำลังช่วยเหลือหมูเด้ง</p>
        </div>
    );
};

export default Loading;