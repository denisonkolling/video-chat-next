'use client';

import Chat from '@/components/Chat';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SocketContext } from '@/context/SocketContext';
import { useContext, useEffect, useRef, useState } from 'react';

interface IAnswer {
	sender: string;
	description: RTCSessionDescriptionInit;
}

interface ICandidate {
	candidate: RTCIceCandidate;
	sender: string;
}

export default function Room({ params }: { params: { id: string } }) {
	const { socket } = useContext(SocketContext);
	const localStream = useRef<HTMLVideoElement>(null);
	const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
	const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
	const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(null);


	useEffect(() => {
		socket?.on('connect', async () => {
			socket?.emit('subscribe', {
				roomId: params.id,
				socketId: socket.id,
			});
			await initLocalCamera();
		});

		socket?.on('newUserStart', (data) => {
			console.log('New user arrived', data);
			createPeerConnection(data.sender, true);
		});

		socket?.on('new user', (data) => {
			console.log('New user awaiting connection', data);
			createPeerConnection(data.socketId, false);
			socket.emit('newUserStart', {
				to: data.socketId,
				sender: socket.id,
			});
		});

		socket?.on('sdp', (data) => {
			handleAnswer(data);
		});

		socket?.on('ice candidates', (data) => {
			handleIceCandidates(data);
		});
	}, [socket]);

	const handleAnswer = async (data: IAnswer) => {
		const peerConnection = peerConnections.current[data.sender];

		if (data.description.type === 'offer') {
			await peerConnection.setRemoteDescription(data.description);

			const answer = await peerConnection.createAnswer();
			await peerConnection.setLocalDescription(answer);

			socket?.emit('sdp', {
				to: data.sender,
				sender: socket?.id,
				description: peerConnection.localDescription,
			});
		} else if (data.description.type === 'answer') {
			await peerConnection.setRemoteDescription(
				new RTCSessionDescription(data.description)
			);
		}
	};

	const handleIceCandidates = async (data: ICandidate) => {
		const peerConnection = peerConnections.current[data.sender];

		if (data.candidate) {
			await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
		}
	};

	const createPeerConnection = async (
		socketId: string,
		createOffer: boolean
	) => {
		const config = {
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302',
				},
			],
		};

		const peer = new RTCPeerConnection(config);
		peerConnections.current[socketId] = peer;

		const peerConnection = peerConnections.current[socketId];

		if (videoMediaStream) {
      videoMediaStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, videoMediaStream);
      });
    } else {
      const video = await initRemoteCamera();
      video
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, video));
    }

		if (createOffer) {
			const peerConnection = peerConnections.current[socketId];
			const offer = await peerConnection.createOffer();
			await peerConnection.setLocalDescription(offer);

			socket?.emit('sdp', {
				to: socketId,
				sender: socket?.id,
				description: peerConnection.localDescription,
			});
		}

		peerConnection.ontrack = (event) => {
			const remoteStream = event.streams[0];
			setRemoteStreams([...remoteStreams, remoteStream]);
		};

		peer.onicecandidate = (event) => {
			if (event.candidate) {
				socket?.emit('ice candidates', {
					to: socketId,
					sender: socket?.id,
					candidate: event.candidate,
				});
			}
		};
	};

	const initLocalCamera = async () => {
		const video = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: {
				noiseSuppression: true,
				echoCancellation: true,
			},
		});
		if (localStream.current) localStream.current.srcObject = video;
	};

	const initRemoteCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
    return video;
  };

	return (
		<div className="h-screen">
			<Header />
			<div className="flex h-full ">
				<div className="md:w-[85%] w-full m-3 ">
					<div className="grid md:grid-cols-2 grid-cols-1 gap-8">
						<div className="bg-gray-950 w-full rounded-md h-full p-1 relative ">
							<video
								className="h-full w-full mirror-mode"
								ref={localStream}
								autoPlay
								playsInline
							/>
							<span className="absolute bottom-3 mx-4 text-white">
								Username
							</span>
						</div>
						{remoteStreams?.map((stream, index) => {
							return (
								<div className="bg-gray-950 w-full rounded-md h-full p-1 relative" key={index}>
									<video
										className="h-full w-full"
										autoPlay
										playsInline
										ref={(video) => {
											if (video && video.srcObject !== stream)
												video.srcObject = stream;
										}} />
									<span className="absolute bottom-3 mx-4 text-white">
										Username
									</span>
								</div>
							);
						})}
					</div>
				</div>
				<Chat roomId={params.id} />
			</div>
			<Footer />
		</div>
	);
}
