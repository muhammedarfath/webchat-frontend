import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

function SkeletonLoader({count}) {
  return (
    <div className="h-screen overflow-auto relative bg-white w-full">
      <div className="columns-2 xl:columns-4 p-4 gap-4 space-y-4">
        {[...Array(count)].map((_, index) => (
          <Card key={index} className="w-full h-auto rounded-3xl">
            <Skeleton className="rounded-lg">
              <div
                className="rounded-lg bg-default-300"
                style={{ height: `${Math.random() * 300 + 300}px` }}
              ></div>
            </Skeleton>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoader;
