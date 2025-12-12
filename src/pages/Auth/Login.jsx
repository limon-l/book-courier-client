import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login Successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log("User sync response:", res.data);
          toast.success("Google Login Successful");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-xl relative block w-full px-5 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm transition-all"
                placeholder="Enter your email"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-xl relative block w-full px-5 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm transition-all"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 shadow-lg shadow-emerald-500/20">
            Sign in
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-slate-300 dark:border-slate-600 shadow-sm text-sm font-bold rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-emerald-600 hover:text-emerald-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
