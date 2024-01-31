import Button from '@/components/Button';
import Container from '@/components/Container';
import Header from '@/components/Header';
import { Input } from '@/components/Input';
import Footer from '@/components/Footer';
import FormWrapper from '@/components/FormWrapper';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-black mx-auto w-full h-full flex flex-1 items-center justify-center">
        <FormWrapper />
      </div>
    </main>
  );
}
