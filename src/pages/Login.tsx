import Navbar from "../components/Navbar";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authen";
import { useEffect } from "react";

function Login() {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated after login
    if (isAuthenticated) {
      navigate("/"); // Redirect to the home page or any other route
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "loginIdentifier") {
      setLoginIdentifier(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      loginIdentifier,
      password,
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/auth/login`,
        data
      );
      if (response.data.message === "Login successful") {
        login(data);
        setPasswordError(false);
        setAuthError(false);
      } else {
        console.log("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred", error);
      const axiosError = error as AxiosError;
      if (axiosError.response.data.message === "User not found") {
        console.log("invalid username");
        setAuthError(true);
      } else if (axiosError.response.data.message === "Password not valid") {
        console.log("invalid password");
        setPasswordError(true);
      }
    }
  };
  return (
    <div className="flex h-screen w-screen">
      <div className="absolute top-0 w-screen">
        <Navbar />
      </div>
      <div className="flex-1 mx-auto">
        <img
          src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-garden-3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ2FyZGVuLTMiLCJpYXQiOjE2OTM1NDk2NzksImV4cCI6MTcyNTA4NTY3OX0.s3rwwqDSUUgQ_o5RwmhBssmWOz0v3UR5w-ftMYaEJI4&t=2023-09-01T06%3A27%3A59.603Z"
          alt="hotel-exterior"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-1 ">
        <div className=" p-[120px] bg-bg shadow-md flex flex-col justify-center h-full w-full">
          <h1 className="text-[68px] font-noto-serif-display font-medium text-green-800 mb-[60px]">
            Log In
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="font-body1 text-gray-900">
                  Username or Email
                </span>
              </label>
              <input
                type="text"
                id="loginIdentifier"
                name="loginIdentifier"
                value={loginIdentifier}
                onChange={handleChange}
                placeholder="Enter username or email"
                className="w-full Input"
                required
              />
              {authError && (
                <span className="text-body3 text-red">
                  Username or email might not be correct.
                </span>
              )}
            </div>

            <div>
              <label className="label">
                <span className="font-body1 text-gray-900">Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your Password"
                className="w-full Input"
                required
              />
              {passwordError && (
                <span className="text-body3 text-red">
                  Password might be wrong.
                </span>
              )}
            </div>

            <div>
              <button
                className="btn Button w-full border-none mb-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner w-7 bg-orange-600"></span>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
            <p className="text-gray-700 font-body1 text-start">
              Don't have an account yet?{" "}
              <a
                href="/register"
                className="text-orange-500 font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
