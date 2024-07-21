import { SkeletonFive } from "./skeleton/SkeletonFive";
import { SkeletonFour } from "./skeleton/SkeletonFour";
import { SkeletonOne } from "./skeleton/SkeletonOne";
import { SkeletonThree } from "./skeleton/SkeletonThree";
import { SkeletonTwo } from "./skeleton/SkeletonTwo";

export const items = (users, latestNews, isLoading) => [
    {
      title: "Chatify",
      header: <SkeletonOne users={users} />,
      className: "md:col-span-1",
    },
    {
      title: "Newsify",
      header: <SkeletonTwo latestNews={latestNews} />,
      className: "md:col-span-1",
    },
    {
      title: "Houseify",
      header: <SkeletonThree />,
      className: "md:col-span-1",
    },
    {
      title: "Reelsify",
      header: <SkeletonFour />,
      className: "md:col-span-2",
    },
  
    {
      title: "Snapify",
      header: <SkeletonFive />,
      className: "md:col-span-1",
    },
  ];
  