// app/login/page.tsx
export default function Login() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Log In to Budget-Nav</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
  