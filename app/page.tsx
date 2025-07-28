import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { kv } from "@vercel/kv";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

// Компонент Cart — обычная async-функция, не export default
async function Cart({ user }: { user: string }) {
  const cart = await kv.get<{ id: string; quantity: number }[]>(user);
  return (
    <div className="mt-6 space-y-2 text-zinc-400 text-sm">
      <h3 className="text-zinc-200 font-semibold">Cart Items:</h3>
      {cart?.map((item) => (
        <div key={item.id}>
          {item.id} — {item.quantity}
        </div>
      )) ?? <p>No items</p>}
    </div>
  );
}

// Главная страница
export default async function Home() {
  const user = "demo-user"; // 👈 тут можно подставить своего пользователя

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Aleksandar
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          18 year old talent — Aleksandar
        </h2>

        {/* 👇 Вставляем Cart прямо сюда */}
        <Cart user={user} />
      </div>
    </div>
  );
}
