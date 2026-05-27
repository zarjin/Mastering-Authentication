export default function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-96 border border-gray-200 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>

        <form className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full h-11 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full h-11 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
