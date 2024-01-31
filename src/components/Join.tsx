import { useRef } from 'react';
import Button from './Button';
import { Input } from './Input';

export default function JoinRoom() {
  const name = useRef<HTMLInputElement>(null);
  const id = useRef<HTMLInputElement>(null);
  return (
    <>
      <Input placeholder="Your name" type="text" ref={name} />
      <Input placeholder="Meeting ID" type="text" ref={id} />

      <Button title="Enter" type="button" />
    </>
  );
}