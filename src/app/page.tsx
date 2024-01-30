import Button from '@/components/Button';
import Container from '@/components/Container';
import Header from '@/components/Header';
import { Input } from '@/components/Input';
import Footer from '@/components/Footer';

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col">
			<Header />
			<div className="flex h-full w-full items-center justify-center mx-auto bg-black">
				<Container>
					<div className="w-full h-full bg-secondary p-4 rounded-lg mt-4">
						<div>
							<span>Ingressar</span>
							<span>Nova reunião</span>
						</div>
						<div className="space-y-4">
							<Input placeholder="Digite o código da reunião" type="text" />
							<Input placeholder="Digite o código da reunião" type="text" />

							<Button title="Entrar" type="button" />
						</div>
					</div>
				</Container>
			</div>
			<Footer />
		</main>
	);
}
