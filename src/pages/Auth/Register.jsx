import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setPasswordError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result);
        updateUserProfile(name, photo).then(() => {
          const userInfo = {
            name: name,
            email: email,
            role: "user",
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              toast.success("Registration Successful");
              navigate("/");
            }
          });
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Join LightHouse today
          </p>
        </div>
        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Photo URL
            </label>
            <input
              name="photo"
              type="url"
              required
              className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-2">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg">
            Register
          </button>
        </form>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-emerald-600 hover:text-emerald-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
