import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { motion } from "framer-motion";

function NewsCards({setSearchParams,news}) {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
      timeZoneName: "short",
    };
    return date.toLocaleString("en-IN", options);
  };

  return (
    <div className="h-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 p-3 mb-4">
      {news.map((article, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05, y: -10 }}
          className="py-4 z-0 h-96"
        >
          <Card key={index} className="py-4 z-0 h-96 xs:m-8 overflow-auto">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{article.title}</p>
              <small className="text-default-500">
                {formatDate(article.publishedAt)}
              </small>
              <h4 className="font-bold text-large">{article.source.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible flex flex-col items-center py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={article.image}
                width={270}
              />
              <p className="text-tiny uppercase font-bold flex flex-col gap-2">
                <div>
                  <small className="font-bold">Description</small>
                </div>
                <div>
                  {article.description.slice(0, 100)}{" "}
                  <span
                    className="text-blue-400 cursor-pointer hover:text-blue-600"
                    onClick={() =>
                      setSearchParams({
                        source: article.source.name,
                        id: index,
                      })
                    }
                  >
                    Read More.....
                  </span>
                </div>
              </p>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default NewsCards;
