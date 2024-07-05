import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import Places from "../components/Places.jsx";

const Account = () => {
  const { user, ready, setUser, setReady } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { subpage } = useParams();
  const [page, setPage] = useState(subpage);

  useEffect(() => {
    setPage(subpage);
  }, [subpage]);

  useEffect(() => {
    if (user && !ready) {
      setReady(true);
    }
  }, [user, ready, setReady]);

  useEffect(() => {
    if (ready && !user) {
      navigate("/login");
    }
  }, [ready, user, navigate]);

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-96 animate-pulse">
        Loading...
      </div>
    );
  }

  const logoutHandler = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      setReady(false);
      enqueueSnackbar("Logged out successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Failed to log out", { variant: "error" });
    }
  };
  return (
    <div>
      <nav className="flex justify-center w-full mt-8 mb-4 gap-4">
        <Link
          to={"/account"}
          className={`${
            page === undefined ? "bg-primary text-white" : "bg-gray-200"
          } inline-flex gap-1 md:px-6 md:py-2 rounded-full max-md:p-2 max-sm:p-1 max-sm:rounded-md`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          My Account
        </Link>
        <Link
          to={"/account/bookings"}
          className={`${
            page === "bookings" ? "bg-primary text-white" : "bg-gray-200"
          } inline-flex gap-1 md:px-6 md:py-2 rounded-full max-md:p-2 max-sm:p-1 max-sm:rounded-md`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          My Bookings
        </Link>
        <Link
          to={"/account/places"}
          className={`${
            page === "places" ? "bg-primary text-white" : "bg-gray-200"
          } inline-flex gap-1 md:px-6 md:py-2 rounded-full max-md:p-2 max-sm:p-1 max-sm:rounded-md`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 max-md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
          My Accommodations
        </Link>
      </nav>
      {subpage === undefined && user && (
        <div className="text-center mx-auto max-w-lg mt-8">
          Logged In as {user.name} ({user.email}) <br />
          <button
            className="primary mt-4 text-white rounded-full max-w-sm"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && user && <Places />}
    </div>
  );
};

export default Account;