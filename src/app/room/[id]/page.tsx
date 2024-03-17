'use client';

import Chat from '@/components/Chat';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SocketContext } from '@/context/SocketContext';
import { useContext, useEffect, useRef } from 'react';

export default function Room({ params }: { params: { id: string } }) {
	const { socket } = useContext(SocketContext);
  const localStream = useRef<HTMLVideoElement>(null);
	const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
	
	console.log("~Room ~peerConnection:", peerConnections.current)

	useEffect(() => {
		socket?.on('connect', async () => {
			socket?.emit('subscribe', {
				roomId: params.id,
				socketId: socket.id,
			});
			await initCamera();
		});

		socket?.on('newUserStart', (data) => {
			console.log("New user arrived", data);
			createPeerConnection(data.sender);
		});

    socket?.on('new user', (data)=>{
      console.log('New user connected ',  data);
			createPeerConnection(data.socketId);
			socket.emit('newUserStart', {
				to: data.socketId,
				sender: socket.id,
			})
    })
	}, [socket]);


	const createPeerConnection = (socketId: string) => {
		const config = {
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302',
				},
			],
		}
		const peer = new RTCPeerConnection(config);
		peerConnections.current[socketId] = peer;
	}


	const initCamera = async () => {
		const video = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: {
				noiseSuppression: true,
				echoCancellation: true,
			},
		});
    if (localStream.current) localStream.current.srcObject = video;
	};

	return (
		<div className="h-screen">
			<Header />
			<div className="flex h-full ">
				<div className="md:w-[85%] w-full m-3 ">
					<div className="grid md:grid-cols-2 grid-cols-1 gap-8">
						<div className="bg-gray-950 w-full rounded-md h-full p-1 relative ">
							<video className="h-full w-full mirror-mode" ref={localStream} autoPlay playsInline />
							<span className="absolute bottom-3 mx-4 text-white">
								Username
							</span>
						</div>
						<div className="bg-gray-950 w-full rounded-md h-full p-1 relative ">
							<video className="h-full w-full"></video>
							<span className="absolute bottom-3 mx-4 text-white">
								Username
							</span>
						</div>
						<div className="bg-gray-950 w-full rounded-md h-full p-1 relative ">
							<video className="h-full w-full"></video>
							<span className="absolute bottom-3 mx-4 text-white">
								Username
							</span>
						</div>
						<div className="bg-gray-950 w-full rounded-md h-full p-1 relative ">
							<video className="h-full w-full"></video>
							<span className="absolute bottom-3 mx-4 text-white">
								Username
							</span>
						</div>
					</div>
				</div>
				<Chat roomId={params.id} />
			</div>
			<Footer />
		</div>
	);
}
