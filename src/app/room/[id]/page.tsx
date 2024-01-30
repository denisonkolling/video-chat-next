import Header from '@/components/Header';

export default function Room({ params }: { params: { id: string } }) {
	return (
		<>
			<Header />
			<h1>Meeting Room</h1>
		</>
	);
}
