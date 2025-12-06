import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/Shared/SectionTitle";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();

  return (
    <div>
      <SectionTitle heading="My Profile" subHeading={`Welcome back, ${role}`} />
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 shadow-md object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {user?.displayName}
              </h2>
              <p className="text-slate-500 font-medium">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
                {role}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  User ID
                </label>
                <p className="font-mono text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-slate-600 dark:text-slate-400">
                  {user?.uid}
                </p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Last Login
                </label>
                <p className="font-mono text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-slate-600 dark:text-slate-400">
                  {user?.metadata?.lastSignInTime}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
