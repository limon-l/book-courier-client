import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { User, Mail, Camera, Save, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="max-w-4xl mx-auto py-12 px-4">
      <SectionTitle heading="My Profile" subHeading={`Welcome back, ${role}`} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative group">
        <div className="h-48 md:h-64 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-white/0 via-white/10 to-white/0 skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>

        <div className="px-6 md:px-10 pb-10 relative">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative -mt-20 md:-mt-24 mb-6 inline-block">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-32 h-32 md:w-44 md:h-44 rounded-full border-[6px] border-white dark:border-slate-900 shadow-xl object-cover bg-slate-200"
            />
            {isEditing && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute bottom-2 right-2 bg-emerald-600 text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-emerald-700 transition">
                <Camera size={20} />
              </motion.div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.form
                key="edit-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 max-w-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      {...register("name", { required: true })}
                      defaultValue={user?.displayName}
                      type="text"
                      className="w-full px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Photo URL
                    </label>
                    <input
                      {...register("photoURL", { required: true })}
                      defaultValue={user?.photoURL}
                      type="url"
                      className="w-full px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                    />
                  </div>
                  <div className="opacity-60 cursor-not-allowed">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Email (Read Only)
                    </label>
                    <input
                      value={user?.email}
                      readOnly
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 shadow-inner"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 disabled:bg-slate-400">
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                    <X size={18} /> Cancel
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="view-profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    {user?.displayName}
                  </h2>
                  <p className="text-slate-500 font-medium text-lg flex items-center gap-2">
                    <Mail size={18} className="text-emerald-500" />{" "}
                    {user?.email}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="inline-flex items-center px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm">
                      <User size={14} className="mr-1.5" /> {role}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition hover:shadow-md">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      User ID
                    </label>
                    <p className="font-mono text-sm text-slate-600 dark:text-slate-300 truncate select-all">
                      {user?.uid}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition hover:shadow-md">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Last Login
                    </label>
                    <p className="font-mono text-sm text-slate-600 dark:text-slate-300">
                      {user?.metadata?.lastSignInTime}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(true)}
                    className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-white transition shadow-xl">
                    Edit Profile
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
