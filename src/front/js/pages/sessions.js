import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

const Sessions = () => {
    return (
        <div>
            <JitsiMeeting
                configOverwrite={{
                    startWithAudioMuted: true,
                    startWithVideoMuted: true
                }}
                roomName='Session 1'
                getIFrameRef={node => {
                    node.style.height = '90vh';
                    node.style.marginLeft = "250px";
                }}
            />
        </div>
    );
};

export default Sessions;