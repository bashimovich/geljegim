import React, { useState } from 'react';
import './VideoPlayer.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const VideoPlayer = ({ videoSrc, thumbnailSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <div className="video-player">
            {isPlaying ? (
                <video controls autoPlay>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="thumbnail" onClick={handlePlay}>
                    <img src={thumbnailSrc} alt="Video Thumbnail" />
                    <button className="play-button"><PlayCircleIcon /></button>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
