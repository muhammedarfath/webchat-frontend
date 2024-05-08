import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";

function CardUser() {
    const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="mb-3">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
          </div>
        </div>
        <Button
          className="border-default-200 bg-[#420BA1] text-white"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
        </p>
        <span className="pt-2">
          #FrontendWithZoey 
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardUser
