'use client';
import { FaMicrophone } from 'react-icons/fa';
import { FaMicrophoneSlash } from 'react-icons/fa6';
import { FaVideo } from 'react-icons/fa6';
import { FaVideoSlash } from 'react-icons/fa';
import { FaDisplay } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa';
import Container from './Container';
import { useState, MutableRefObject, } from 'react';
import { FaPhoneSlash } from 'react-icons/fa';

export default function Footer({
	videoMediaStream,
	peerConnections,
	logout,
}: {
	videoMediaStream: MediaStream;
	peerConnections: MutableRefObject<Record<string, RTCPeerConnection>>;
	logout: () => void;
}) {
	const [isMuted, setIsMuted] = useState(false);
	const [isCameraOff, setIsCameraOff] = useState(false);
	const [isScreenSharing, setIsScreenSharing] = useState(false);

	const date = new Date();
	const hours = date.getHours().toString().padStart(2, '0') + ':';
	const minutes = date.getMinutes().toString().padStart(2, '0');

	const toggleMuted = () => {
		videoMediaStream?.getAudioTracks().forEach((track) => {
			track.enabled = !isMuted;
		});
		setIsMuted(!isMuted);
	};

	const toggleVideo = () => {
    setIsCameraOff(!isCameraOff);
    videoMediaStream?.getVideoTracks().forEach((track) => {
      track.enabled = isCameraOff;
    });

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(
            videoMediaStream
              ?.getVideoTracks()
              .find((track) => track.kind === 'video') || null,
          );
        }
      });
    });
  };

	return (
		<div className="fixed items-center bottom-0 bg-black py-6 w-full">
			<Container>
				<div className="grid grid-cols-3">
					<div className="flex items-center">
						<p className="text-xl text-white">
							{hours}
							{minutes}
						</p>
					</div>
					<div className="flex space-x-6 justify-center">
						{isMuted ? (
							<FaMicrophoneSlash
								size="3rem"
								className="flex text-white rounded-md p-2 cursor-pointer bg-red-500"
								onClick={() => toggleMuted()}
							/>
						) : (
							<FaMicrophone
								size="3rem"
								className="flex text-white bg-gray-950 rounded-md p-2 cursor-pointer hover:bg-red-500"
								onClick={() => toggleMuted()}
							/>
						)}

						{isCameraOff ? (
							<FaVideoSlash
								size="3rem"
								className="flex text-white rounded-md p-2 cursor-pointer bg-red-500"
								onClick={() => toggleVideo()}
							/>
						) : (
							<FaVideo
								size="3rem"
								className="flex text-white bg-gray-950 rounded-md p-2 cursor-pointer hover:bg-red-500"
								onClick={() => toggleVideo()}
							/>
						)}

						{isScreenSharing ? (
							<FaEyeSlash
								size="3rem"
								className="flex text-white rounded-md p-2 cursor-pointer bg-red-500"
								onClick={() => setIsScreenSharing(!isScreenSharing)}
							/>
						) : (
							<FaDisplay
								size="3rem"
								className="flex text-white bg-gray-950 rounded-md p-2 cursor-pointer hover:bg-red-500"
								onClick={() => setIsScreenSharing(!isScreenSharing)}
							/>
						)}

						<FaPhone
							onClick={logout}
							className="h-12 w-16 text-white hover:bg-red-500 p-2 cursor-pointer bg-primary rounded-md"
						/>
					</div>
				</div>
			</Container>
		</div>
	);
}
