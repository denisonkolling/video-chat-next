'use client'
import { useRef } from 'react';
import Button from './Button';
import { Input } from './Input';

export function CreateRoom() {

  const name = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input placeholder="Your name" type="text" ref={name} />

      <Button title="Enter" type="button" />
    </>
  );
}