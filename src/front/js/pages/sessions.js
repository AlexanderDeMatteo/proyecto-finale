import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Redirect } from 'react-router-dom';

const Sessions = () => {
    return (
        <div>
            <JitsiMeeting
                interfaceConfigOverwrite={{
                    DEFAULT_BACKGROUND: '#040404',
                    DEFAULT_WELCOME_PAGE_LOGO_URL: '',
                    JITSI_WATERMARK_LINK: '',
                    SHOW_JITSI_WATERMARK: false,
                }}
                configOverwrite={{
                    startWithAudioMuted: true,
                    startWithVideoMuted: true
                }}
                roomName='Session 1'
                getIFrameRef={node => {
                    node.style.height = '90vh';
                    node.style.marginLeft = "250px";
                }}
                onReadyToClose={() => { return <Redirect to="/calendar" /> }
                }
                onApiReady={() => console.log("hola")}
            />
        </div>
    );
};

export default Sessions;