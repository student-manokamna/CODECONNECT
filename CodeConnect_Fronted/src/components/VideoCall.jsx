import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';

const VideoCall = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const myMeeting = async (element) => {
        const appID = 1529323448;
        const serverSecret = "348655bfa5086b2ba024ed22e264303f";

        if (!user) return;

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            user._id,
            user.firstName + " " + user.lastName
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: window.location.protocol + '//' + window.location.host + window.location.pathname,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
            onLeaveRoom: () => navigate(`/chat/${roomId.split('_').find(id => id !== user._id)}`),
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div ref={myMeeting} className="w-full h-full" />
        </div>
    );
};

export default VideoCall;
