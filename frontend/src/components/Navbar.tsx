import { useAppDispatch, useAppSelector } from "../redux/typesHooks";
import { Logout } from "../redux/features/authSlice";
import { Link } from "react-router";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const isLogin = !!accessToken;

  const logout = () => {
    dispatch(Logout());
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full border-b bg-white bg-opacity-80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          {/* Logo */}
          <div className="flex flex-1 items-stretch justify-start">
            <a href="#" className="flex flex-shrink-0 items-center">
              <img
                className="block h-12 w-auto"
                src="https://www.svgrepo.com/show/501888/donut.svg"
                alt="Logo"
              />
            </a>
          </div>

          {/* Buttons */}
          <div className="">
            {isLogin ? (
              <Link
                onClick={logout}
                to={"/login"}
                className="text-sm font-medium text-red-700 hover:text-red-500"
              >
                Logout
              </Link>
            ) : (
              <div className="flex flex-shrink-0 items-center space-x-8 px-2 py-3">
                <div className="flex flex-shrink-0 items-center space-x-8 px-2 py-3">
                  <Link
                    to={"/login"}
                    className="text-sm font-medium text-gray-700 hover:text-indigo-700"
                  >
                    Login
                  </Link>

                  <Link
                    to={"/register"}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-indigo-200"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
