'use client';
import { FaMicrophone } from 'react-icons/fa';
import { FaMicrophoneSlash } from 'react-icons/fa6';
import { FaVideo } from 'react-icons/fa6';
import { FaVideoSlash } from 'react-icons/fa';
import { FaDisplay } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa6';
import { FaPhone } from "react-icons/fa";
import Container from './Container';
import { useState } from 'react';
import { FaPhoneSlash } from "react-icons/fa";

export default function Footer({  videoMediaStream,}: {  
	videoMediaStream: MediaStream;  
}) {
	const [isMuted, setIsMuted] = useState(false);
	const [isCameraOff, setIsCameraOff] = useState(false);
	const [isScreenSharing, setIsScreenSharing] = useState(false);
	const [isCallEnded, setIsCallEnded] = useState(false);

	const date = new Date();
	const hours = date.getHours().toString().padStart(2, '0') + ':';
	const minutes = date.getMinutes().toString().padStart(2, '0');

	const toggleMuted = () => {
    videoMediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = !isMuted;
    });
    setIsMuted(!isMuted);
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
								onClick={() => setIsCameraOff(!isCameraOff)}
							/>
						) : (
							<FaVideo
								size="3rem"
								className="flex text-white bg-gray-950 rounded-md p-2 cursor-pointer hover:bg-red-500"
								onClick={() => setIsCameraOff(!isCameraOff)}
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

						{isCallEnded ? (
							<FaPhoneSlash
								size="3rem"
								className="flex text-whiterounded-md p-2 cursor-pointer bg-red-500"
								onClick={() => setIsCallEnded(!isCallEnded)}
							/>
						) : (
							<FaPhone
								size="3rem"
								className="flex text-white bg-gray-950 rounded-md p-2 cursor-pointer hover:bg-red-500"
                onClick={() => setIsCallEnded(!isCallEnded)}
							/>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
}
