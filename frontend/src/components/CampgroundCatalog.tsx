import Card from "./Card";
import Link from "next/link";
import { CampgroundItem, CampgroundJson } from "interface";

export default async function CampgroundCatalog({
  campgroundJson,
}: {
  campgroundJson: any;
}) {
  const campgroundJsonReady = await campgroundJson;
  return (
    <div className="flex flex-row flex-wrap place-items-around justify-around">
      {campgroundJsonReady.data.map((campgroundItem: CampgroundItem) => (
        <div id="campground-selected-card" key={campgroundItem._id} className="min-w-[300px] w-1/2 my-10 px-[2%]">
          <Link
            href={`/campground/${campgroundItem._id}`}
          >
            <Card
              campgroundName={campgroundItem.name}
              imgSrc={campgroundItem.picture}
              campgroundProvince={campgroundItem.province}
            />
          </Link>
          </div>
      ))}
    </div>
  );
}
