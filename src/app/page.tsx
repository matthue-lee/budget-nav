// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Budget-Nav</h1>
        <p className="text-lg text-gray-600 mb-8">Take control of your finances with ease</p>
        <Link href="/login">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}
