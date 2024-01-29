import { DiCssdeck } from 'react-icons/di';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import Container from './Container';

export default function Header() {
	return (
		<>
			<div className="bg-gray-1000 p-4">
				<Container>
					<div className="flex justify-between">
						<div className="flex items-center">
							<HiOutlineChatAlt2 size="3rem" style={{ color: 'white' }} />
							<a href="" className="text-white text-2xl p-2">
								Video Chat!
							</a>
						</div>
						<div className="flex items-center">
							<DiCssdeck size="3rem" style={{ color: 'white' }} />
							<a href="" className=" text-white text-2xl p-2">
								SoftWay
							</a>
						</div>
					</div>
				</Container>
			</div>
		</>
	);
}
