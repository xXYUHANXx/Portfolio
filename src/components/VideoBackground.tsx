"use client";

export function VideoBackground(){
    return(
        <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      >
        <source
          src="https://cdn.pixabay.com/video/2015/11/07/1285-145117054_small.mp4"
          type="video/mp4"
        />
      </video>
    );
}