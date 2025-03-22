import React from 'react';

type Props = {
  videoId: number;
};

const YouTube = ({ videoId }: Props) => (
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${videoId}`}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
);

export default YouTube;
