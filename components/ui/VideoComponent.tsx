"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactPlayer from "react-player";

const VideoComponent = ({
  isVideo,
  video,
}: {
  isVideo: boolean;
  video: any;
}) => {
  const videoSource = "/video/react.mp4";
  return (
    <div className="border border-red-800">
      <DialogContent className="border border-red-900 bg-black">
        <div className="flex justify-center items-center ">
          {isVideo && (
            <ReactPlayer url={video} controls width={"400px"} />
          )}
        </div>
      </DialogContent>
    </div>
  );
};

export default VideoComponent;
