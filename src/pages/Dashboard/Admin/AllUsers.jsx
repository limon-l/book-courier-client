import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import Swal from "sweetalert2";
import { Users, Shield } from "lucide-react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeLibrarian = (user) => {
    axiosSecure.patch(`/users/librarian/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is a Librarian Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle heading="Manage Users" subHeading="System Users" />
      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <table className="table w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
            <tr>
              <th className="py-4 pl-6 text-left">#</th>
              <th className="py-4 text-left">Name</th>
              <th className="py-4 text-left">Email</th>
              <th className="py-4 text-left">Role</th>
              <th className="py-4 pr-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-300">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b border-slate-100 dark:border-slate-800 last:border-none">
                <td className="py-4 pl-6 font-bold">{index + 1}</td>
                <td className="py-4 font-medium">{user.name}</td>
                <td className="py-4 text-sm">{user.email}</td>
                <td className="py-4 capitalize font-bold text-emerald-600">
                  {user.role || "user"}
                </td>
                <td className="py-4 pr-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {user.role === "admin" ? (
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-3 py-1.5 rounded-lg cursor-not-allowed">
                        Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                        <Shield size={14} /> Make Admin
                      </button>
                    )}
                    {user.role === "librarian" ? (
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-3 py-1.5 rounded-lg cursor-not-allowed">
                        Librarian
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeLibrarian(user)}
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                        <Users size={14} /> Make Librarian
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
