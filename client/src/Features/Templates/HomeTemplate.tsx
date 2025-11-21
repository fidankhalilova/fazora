import AskedQuestions from "../Sections/Home/AskedQuestions";
import Feedbacks from "../Sections/Home/Feedbacks";
import HouseList from "../Sections/Home/HouseList";
import OrderSteps from "../Sections/Home/OrderSteps";
import VideoIntros from "../Sections/Home/VideoIntros";

const HomeTemplate = () => {
  return (
    <div>
      <HouseList />
      <OrderSteps />
      <VideoIntros />
      <Feedbacks />
      <AskedQuestions />
    </div>
  );
};

export default HomeTemplate;
