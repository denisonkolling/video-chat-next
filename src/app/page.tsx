import Button from '@/components/Button';
import Container from '@/components/Container';
import Header from '@/components/Header';
import { Input } from '@/components/Input';

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col bg-gray-1000">
			<Header />
			<div className="flex max-w-[580px] h-full w-full items-center justify-center mx-auto">
				<Container>
					<div>
						<span>Ingressar</span>
						<span>Nova reunião</span>
					</div>
					<div className='space-y-4'>
						<Input placeholder="Digite o código da reunião" type="text" />
						<Input placeholder="Digite o código da reunião" type="text" />

						<Button title="Entrar" type="button" />
					</div>
				</Container>
			</div>
		</main>
	);
}
