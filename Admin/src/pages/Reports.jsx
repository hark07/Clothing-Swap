import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { FaSearch, FaFlag, FaCheckCircle } from "react-icons/fa";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchReports = async () => {
    try {
      const { data } = await API.get("/admin/reports");

      setReports(data.reports);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  const resolveReport = async (id) => {
    try {
      const { data } = await API.put(`/admin/reports/${id}/resolve`);

      toast.success(data.message);

      fetchReports();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resolve report");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter(
    (report) =>
      report.reason?.toLowerCase().includes(search.toLowerCase()) ||
      report.reporter?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const pendingReports = reports.filter(
    (report) => report.status === "pending",
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "resolved",
  ).length;

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Reports Management</h1>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg outline-none"
            />
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Pending Reports</h3>

            <h2 className="text-3xl font-bold mt-2 text-red-500">
              {pendingReports}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Resolved Reports</h3>

            <h2 className="text-3xl font-bold mt-2 text-green-500">
              {resolvedReports}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid gap-5">
            {filteredReports.map((report) => (
              <div key={report._id} className="bg-white rounded-xl shadow p-5">
                <div className="flex flex-col lg:flex-row justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FaFlag className="text-red-500" />

                      <span className="font-bold">Report</span>
                    </div>

                    <p>
                      <strong>Reporter:</strong> {report.reporter?.name}
                    </p>

                    <p>
                      <strong>Reported User:</strong>{" "}
                      {report.reportedUser?.name}
                    </p>

                    <p>
                      <strong>Item:</strong> {report.item?.title || "N/A"}
                    </p>

                    <p>
                      <strong>Reason:</strong> {report.reason}
                    </p>

                    <p className="mt-2 text-gray-600">{report.description}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium text-center ${
                        report.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {report.status}
                    </span>

                    {report.status !== "resolved" && (
                      <button
                        onClick={() => resolveReport(report._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle />
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredReports.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No Reports Found
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Reports;
