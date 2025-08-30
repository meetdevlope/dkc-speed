import GreenLabel from "components/GreenLabel";
import { ImageComponent } from "components/image-component/ImageComponent";
import SectionTitle from "components/SectionTitle";
import TopBorderText from "components/TopBorderText";
import missionImg from "../../../../public/mission.jpg";

const Mission = () => {
  return (
    <section className="flex flex-col bg-primary-500 p-7">
      <div className="fall flex-col">
        <GreenLabel className="bg-white [&>*]:text-primary-500">
          DESIGNER KIDS CLUB
        </GreenLabel>
        <SectionTitle
          title="OUR STORY & MISSION"
          className="mt-2 mb-7 text-white"
        />
      </div>
      <div className="relative aspect-video h-full w-full md:max-h-[550px]">
        <ImageComponent fill src={missionImg} alt="mission-image-alt" />
      </div>
      <div className="mt-6 flex w-full flex-col items-start justify-center">
        <p className="text-center text-neutral-200 md:mt-3 md:text-sm">
          Our mission is to simplify the process of buying and selling
          second-hand clothing, ensuring that each piece is cared for as it
          transitions from one wardrobe to another.
        </p>
        <div className="fall mt-6 w-full">
          <TopBorderText className="border-t-white text-white" href="/mission">
            Read more
          </TopBorderText>
        </div>
      </div>
    </section>
  );
};

export default Mission;
