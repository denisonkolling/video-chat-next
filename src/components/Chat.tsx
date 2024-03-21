import { SocketContext } from '@/context/SocketContext';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';

export default function Chat({ roomId }: { roomId: string }) {
	interface IChatMessage {
		message: string;
		username: string;
		roomId: string;
		time: string;
	}

	const { socket } = useContext(SocketContext);
	const currentMsg = useRef<HTMLInputElement>(null);
	const [chat, setChat] = useState<IChatMessage[]>([]);
	const username = sessionStorage.getItem('username');

	useEffect(() => {
		socket?.on('chat', (data) => {
			console.log('message: ', data);
			setChat((prevState) => [...prevState, data]);
		});
	}, [socket]);

	function sendMessage(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(currentMsg.current?.value);
		if (currentMsg.current && currentMsg.current?.value !== '') {
			const sendMsgToServer = {
				message: currentMsg.current?.value,
				username: username || '',
				roomId,
				time: new Date().toLocaleTimeString(),
			};

			socket?.emit('chat', sendMsgToServer);
			setChat((prevState) => [...prevState, sendMsgToServer]);

			currentMsg.current.value = '';
		}
	}

	return (
		<div className="bg-gray-900 p-4 pt-4 md:w-[20%] hidden md:flex rounded-md m-3 h-[80%]">
			<div className="relative h-full w-full ">
				<div className=" h-full w-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
					{chat.map((chat, index) => {
						return (
							<div className="bg-gray-950 rounded p-2 mb-4" key={index}>
								<div className="flex items-center text-pink-400 space-x-2">
									<span>{chat.username}</span>
									<span>{chat.time}</span>
								</div>
								<div className="mt-1 text-sm text-white">
									<p>{chat.message}</p>
								</div>
							</div>
						);
					})}
				</div>
				<form
					action=""
					className="absolute bottom-0 w-full"
					onSubmit={(e) => {sendMessage(e);}}>
					<div className="flex relative ">
						<input
							type="text"
							name=""
							id=""
							ref={currentMsg}
							placeholder="Send message..."
							className="px-3 py-2 bg-gray-200 rounded-md w-full bottom-0"
						/>
						<button type="submit">
							<IoSend
								size="1.5rem"
								className="absolute right-2 top-2 cursor-pointer"
							/>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
