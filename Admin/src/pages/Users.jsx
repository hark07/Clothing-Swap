import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../api/axios";
import { toast } from "react-hot-toast";

import { FaUserSlash, FaUserCheck, FaSearch } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");

      setUsers(data.users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (id) => {
    try {
      const { data } = await API.put(`/admin/users/${id}/block`);

      toast.success(data.message);

      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to block user");
    }
  };

  const unblockUser = async (id) => {
    try {
      const { data } = await API.put(`/admin/users/${id}/unblock`);

      toast.success(data.message);

      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unblock user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Users Management</h1>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <>
            {/* Desktop Table */}

            <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Location</th>
                    <th className="p-4 text-left">Role</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="border-t">
                      <td className="p-4">{user.name}</td>

                      <td className="p-4">{user.email}</td>

                      <td className="p-4">{user.location || "-"}</td>

                      <td className="p-4 capitalize">{user.role}</td>

                      <td className="p-4">
                        {user.isBlocked ? (
                          <span className="text-red-500 font-medium">
                            Blocked
                          </span>
                        ) : (
                          <span className="text-green-600 font-medium">
                            Active
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        {user.isBlocked ? (
                          <button
                            onClick={() => unblockUser(user._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => blockUser(user._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                          >
                            Block
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}

            <div className="grid gap-4 lg:hidden">
              {filteredUsers.map((user) => (
                <div key={user._id} className="bg-white rounded-xl shadow p-4">
                  <h2 className="font-bold text-lg">{user.name}</h2>

                  <p className="text-gray-600">{user.email}</p>

                  <p className="mt-2">
                    <strong>Location:</strong> {user.location || "-"}
                  </p>

                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {user.isBlocked ? "Blocked" : "Active"}
                  </p>

                  <div className="mt-4">
                    {user.isBlocked ? (
                      <button
                        onClick={() => unblockUser(user._id)}
                        className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FaUserCheck />
                        Unblock User
                      </button>
                    ) : (
                      <button
                        onClick={() => blockUser(user._id)}
                        className="w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FaUserSlash />
                        Block User
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
