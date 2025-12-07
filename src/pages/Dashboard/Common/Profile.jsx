import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { User, Mail, Camera, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role] = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateUserProfile(data.name, data.photoURL);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <SectionTitle heading="My Profile" subHeading={`Welcome back, ${role}`} />

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">
        <div className="h-48 bg-gradient-to-r from-emerald-600 to-teal-600 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="px-8 pb-8 relative">
          <div className="relative -mt-20 mb-6 inline-block">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-40 h-40 rounded-full border-4 border-white dark:border-slate-900 shadow-lg object-cover bg-slate-200"
            />
            {isEditing && (
              <div className="absolute bottom-2 right-2 bg-emerald-600 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-emerald-700 transition">
                <Camera size={20} />
              </div>
            )}
          </div>

          {isEditing ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    defaultValue={user?.displayName}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Photo URL
                  </label>
                  <input
                    {...register("photoURL", { required: true })}
                    defaultValue={user?.photoURL}
                    type="url"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div className="opacity-60 cursor-not-allowed">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email (Read Only)
                  </label>
                  <input
                    value={user?.email}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 disabled:bg-slate-400">
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <Save size={18} />
                  )}
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                  <X size={18} /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                  {user?.displayName}
                </h2>
                <p className="text-slate-500 font-medium text-lg flex items-center gap-2">
                  <Mail size={16} /> {user?.email}
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="inline-flex items-center px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm">
                    <User size={14} className="mr-1.5" /> {role}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    User ID
                  </label>
                  <p className="font-mono text-sm text-slate-600 dark:text-slate-300 truncate">
                    {user?.uid}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Last Login
                  </label>
                  <p className="font-mono text-sm text-slate-600 dark:text-slate-300">
                    {user?.metadata?.lastSignInTime}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-white transition shadow-lg">
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
