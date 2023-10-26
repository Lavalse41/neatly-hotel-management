import { useNavigate, useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useAuth } from "../contexts/authen.jsx";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { logout } = useAuth();

  let userProfileImage;
  let notification;
  const blankUserProfileImage =
    "https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/Profile.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvUHJvZmlsZS5qcGciLCJpYXQiOjE2OTUyNzE4MjUsImV4cCI6MTcyNjgwNzgyNX0.dvTq9W3yfIv7bAc8y45BRbKT-2UXvggmbuY_YOVl6Zc&t=2023-09-21T04%3A50%3A25.510Z";
  if (auth.isAuthenticated && auth.state.userData) {
    if (auth.state.userData.profile_image === null) {
      userProfileImage = blankUserProfileImage;
    } else {
      userProfileImage = auth.state.userData.profile_image;
      notification = auth.state.userData.notification;
      console.log(notification);
    }
  }

  const linkHomePage = () => {
    navigate("/");
  };

  const linkLogin = () => {
    navigate("/login");
  };

  function logoutAndNavigate() {
    logout();
    navigate("/login");
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (location.pathname === "/") {
    return (
      <div className="sticky z-50 top-0 flex justify-between bg-white h-[100px] w-full px-40">
        <div className="flex flex-row items-center ">
          <Link smooth to="/#top">
            <button>
              <img
                className="h-11"
                alt="logo"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20color.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyBjb2xvci5zdmciLCJpYXQiOjE2OTM1NTQ1NzgsImV4cCI6MTcyNTA5MDU3OH0.XvlMNW7d055OdT9qXJ5FFOGAOm6r_Kz3stsZXlfV0e8&t=2023-09-01T07%3A49%3A37.938ZLogo"
              ></img>
            </button>
          </Link>
          <ul className="ml-12 flex text-body2">
            <li className="px-6 text-black">
              <Link smooth to="#about">
                About Neatly
              </Link>
            </li>
            <li className="px-6 text-black">
              <Link smooth to="#services">
                Service & Facilities
              </Link>
            </li>
            <li className="px-6 text-black">
              <Link smooth to="#roomSuits">
                Rooms & Suits
              </Link>
            </li>
          </ul>
        </div>
        {auth.isAuthenticated ? (
          <div className="flex items-center relative">
            <div className="dropdown dropdown-end z-20">
              <label
                tabIndex={0}
                className={`${
                  Array.isArray(notification) && notification.length > 0
                    ? "hover:cursor-pointer"
                    : ""
                } flex flex-row`}
              >
                <div
                  onClick={toggleDropdown}
                  className={`flex justify-center items-center w-12 h-12 rounded-full bg-gray-100 mr-4 relative border ${
                    Array.isArray(notification) && notification.length > 0
                      ? "hover:border-orange-500"
                      : null
                  }`}
                >
                  <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/Frame.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL0ZyYW1lLnBuZyIsImlhdCI6MTY5NjA2OTE4OCwiZXhwIjoxNzI3NjA1MTg4fQ.8XKGfs9tibHfNFCfwJt7FdZfLlmTxt-DYtYcSRyExl8&t=2023-09-30T10%3A19%3A48.642Z"></img>
                  {Array.isArray(notification) && notification.length > 0 ? (
                    <>
                      <div className="flex bg-orange-500 w-4 h-4 absolute bottom-0 right-0 rounded-lg justify-center items-center text-[12px] text-white font-noto-serif-display">
                        <p>!</p>
                      </div>
                    </>
                  ) : null}
                </div>
              </label>
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content absolute top-[82px] rounded w-[350px] z-10 drop-shadow-lg bg-white px-2 overflow-y-auto max-h-[200px]"
                >
                  {Array.isArray(notification) && notification.length > 0
                    ? notification.map((noti, index) => (
                        <li
                          key={index}
                          className="text-[14px] px-2 py-1 hover:bg-gray-200"
                        >
                          <div className="flex flex-row justify-between items-center hover:cursor-default">
                            <img
                              alt="noti icon"
                              className="w-10 h-10 mr-5"
                              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/noti-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL25vdGktaW1hZ2UucG5nIiwiaWF0IjoxNjk2MDcwMjE1LCJleHAiOjE3Mjc2MDYyMTV9.wZ3upw5bmvD3c2eUDazWYX7qlixRc7y5hZtBSiQlq7A&t=2023-09-30T10%3A36%3A55.588Z"
                            ></img>
                            <span className="text-gray-700 ">{noti}</span>
                          </div>
                          <hr className="mt-2 border-gray-400  mb-1"></hr>
                        </li>
                      ))
                    : null}
                </ul>
              )}
            </div>
            <div className="dropdown dropdown-end z-20">
              <label
                tabIndex={0}
                className="hover:cursor-pointer flex flex-row"
              >
                <div
                  className="bg-cover bg-center w-12 h-12 rounded-full"
                  style={{ backgroundImage: `url(${userProfileImage})` }}
                  onClick={toggleDropdown}
                ></div>
              </label>
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="menu dropdown-content absolute top-[82px] -left-20 rounded-[4px] z-10 drop-shadow-lg bg-white w-52 [&_li>*]:rounded-[4px]"
                >
                  <li>
                    <button
                      className="py-2 px-2"
                      onClick={() =>
                        navigate(`/profile/${auth.state.userData.id}`)
                      }
                    >
                      <img
                        alt="profile icon"
                        className="w-4 h-4"
                        src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/profile.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL3Byb2ZpbGUuc3ZnIiwiaWF0IjoxNjk0NDA0NTg3LCJleHAiOjE3MjU5NDA1ODd9.vDd8aSTyukskfIfkrxEkLxUXT4FmUzE-tprRpxC3Y2Y&t=2023-09-11T03%3A56%3A25.801Z"
                      ></img>
                      <span className="text-gray-700">Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="py-2 px-2"
                      onClick={() =>
                        navigate(
                          `/paymentmethod/${auth.state.userData.credit_card_id}`
                        )
                      }
                    >
                      <img
                        alt="payment method icon"
                        className="w-4 h-4"
                        src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/credit.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWRpdC5zdmciLCJpYXQiOjE2OTQ0MDU3MDUsImV4cCI6MTcyNTk0MTcwNX0.wwSq3XrBgaEqb4U3QeRXYhQjKItIn7FSStx40IDj7jE&t=2023-09-11T04%3A15%3A04.217Z"
                      ></img>
                      <span className="text-gray-700">Payment Method</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="py-2 px-2"
                      onClick={() => {
                        navigate(`/booking/user/${auth.state.userData.id}`);
                        window.location.reload();
                      }}
                    >
                      <img
                        alt="booking history icon"
                        className="w-4 h-4"
                        src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/booking_history.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Jvb2tpbmdfaGlzdG9yeS5zdmciLCJpYXQiOjE2OTQ0MDU3MzksImV4cCI6MTcyNTk0MTczOX0.8Fjox_ROepJ6S3GYITg9FKlG2s1Wzk6ahtnEXYmWnI8&t=2023-09-11T04%3A15%3A38.237Z"
                      ></img>
                      <span className="text-gray-700">Booking History</span>
                    </button>
                  </li>
                  <hr className="mt-2 border-gray-400"></hr>
                  <li>
                    <button
                      className="py-2 px-2"
                      onClick={() => logoutAndNavigate()}
                    >
                      <img
                        alt="log out icon"
                        className="w-4 h-4"
                        src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/logout.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2xvZ291dC5zdmciLCJpYXQiOjE2OTQ0MDUyMjcsImV4cCI6MTcyNTk0MTIyN30.QQWg08pQQG_UXibP0RzqSxor94ssvDnTFV7t5oh56QE&t=2023-09-11T04%3A07%3A05.943Z"
                      ></img>
                      <span className="text-gray-700">Log Out</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <button
              className="px-6 text-body2 text-orange-500"
              onClick={linkLogin}
            >
              Log in
            </button>
            <button
              className="btn Button"
              onClick={(e) => {
                e.preventDefault();
                const userInput = {
                  checkInDate: "",
                  checkOutDate: "",
                  room: 1,
                  person: 2,
                  night: 1,
                };

                // Convert the object to a JSON string before storing it
                localStorage.setItem("userInput", JSON.stringify(userInput));
                navigate("/search");
              }}
            >
              Find Room
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex justify-between bg-white h-[100px] w-full px-40">
        <div className="flex flex-row items-center ">
          <button onClick={linkHomePage}>
            <img
              className="h-11"
              alt="logo"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20color.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyBjb2xvci5zdmciLCJpYXQiOjE2OTM1NTQ1NzgsImV4cCI6MTcyNTA5MDU3OH0.XvlMNW7d055OdT9qXJ5FFOGAOm6r_Kz3stsZXlfV0e8&t=2023-09-01T07%3A49%3A37.938ZLogo"
            ></img>
          </button>
          <ul className="ml-12 flex text-body2">
            <li className="px-6 text-black">
              <Link
                smooth
                to="#about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                About Neatly
              </Link>
            </li>
            <li className="px-6 text-black">
              <Link
                smooth
                to="#services"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Service & Facilities
              </Link>
            </li>
            <li className="px-6 text-black">
              <Link
                smooth
                to="#roomSuits"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Rooms & Suits
              </Link>
            </li>
          </ul>
        </div>
        {auth.isAuthenticated ? (
          <div className="flex items-center relative">
            <div className="dropdown dropdown-end z-20">
              <label
                tabIndex={0}
                className={`${
                  Array.isArray(notification) && notification.length > 0
                    ? "hover:cursor-pointer"
                    : ""
                } flex flex-row`}
              >
                <div
                  onClick={toggleDropdown}
                  className={`flex justify-center items-center w-12 h-12 rounded-full bg-gray-100 mr-4 relative border ${
                    Array.isArray(notification) && notification.length > 0
                      ? "hover:border-orange-500"
                      : null
                  }`}
                >
                  <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/Frame.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL0ZyYW1lLnBuZyIsImlhdCI6MTY5NjA2OTE4OCwiZXhwIjoxNzI3NjA1MTg4fQ.8XKGfs9tibHfNFCfwJt7FdZfLlmTxt-DYtYcSRyExl8&t=2023-09-30T10%3A19%3A48.642Z"></img>
                  {Array.isArray(notification) && notification.length > 0 ? (
                    <>
                      <div className="flex bg-orange-500 w-4 h-4 absolute bottom-0 right-0 rounded-lg justify-center items-center text-[12px] text-white font-noto-serif-display">
                        <p>!</p>
                      </div>
                    </>
                  ) : null}
                </div>
              </label>
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content absolute top-[82px] rounded w-[350px] z-10 drop-shadow-lg bg-white px-2 overflow-y-auto max-h-[200px]"
                >
                  {Array.isArray(notification) && notification.length > 0
                    ? notification.map((noti, index) => (
                        <li
                          key={index}
                          className="text-[14px] px-2 py-1 hover:bg-gray-200"
                        >
                          <div className="flex flex-row justify-between items-center hover:cursor-default">
                            <img
                              alt="noti icon"
                              className="w-10 h-10 mr-5"
                              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/noti-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL25vdGktaW1hZ2UucG5nIiwiaWF0IjoxNjk2MDcwMjE1LCJleHAiOjE3Mjc2MDYyMTV9.wZ3upw5bmvD3c2eUDazWYX7qlixRc7y5hZtBSiQlq7A&t=2023-09-30T10%3A36%3A55.588Z"
                            ></img>
                            <span className="text-gray-700 ">{noti}</span>
                          </div>
                          <hr className="mt-2 border-gray-400 mb-1"></hr>
                        </li>
                      ))
                    : null}
                </ul>
              )}
            </div>
            <div className="dropdown dropdown-end z-20">
              <label
                tabIndex={0}
                className="hover:cursor-pointer flex flex-row"
              >
                <div
                  className="bg-cover bg-center w-12 h-12 rounded-full"
                  style={{ backgroundImage: `url(${userProfileImage})` }}
                  onClick={toggleDropdown}
                ></div>
              </label>
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="menu dropdown-content absolute top-[65px] -left-20 rounded-[4px] z-[1] drop-shadow-lg w-52 mt-4 px-2 [&_li>*]:rounded-[4px] bg-white"
                >
                  <li>
                    <button
                      className="py-2"
                      onClick={() =>
                        navigate(`/profile/${auth.state.userData.id}`)
                      }
                    >
                      <img
                        alt="profile icon"
                        className="w-4 h-4"
                        src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/profile.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL3Byb2ZpbGUuc3ZnIiwiaWF0IjoxNjk0NDA0NTg3LCJleHAiOjE3MjU5NDA1ODd9.vDd8aSTyukskfIfkrxEkLxUXT4FmUzE-tprRpxC3Y2Y&t=2023-09-11T03%3A56%3A25.801Z"
                      ></img>
                      <span className="text-gray-700">Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="py-2"
                      onClick={() =>
                        navigate(
                          `/paymentmethod/${auth.state.userData.credit_card_id}`
                        )
                      }
                    >
                      <img
                        alt="payment method icon"
                        className="w-4 h-4"
                        src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/credit.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWRpdC5zdmciLCJpYXQiOjE2OTUwMTY3OTYsImV4cCI6MTcyNjU1Mjc5Nn0.-yf1cXPo7kI1UmUzqxlNKB52Ljq-haxosjubFwsuWX4&t=2023-09-18T05%3A59%3A58.024Z"
                      ></img>
                      <span className="text-gray-700">Payment Method</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="py-2"
                      onClick={() => {
                        navigate(`/booking/user/${auth.state.userData.id}`);
                        window.location.reload();
                      }}
                    >
                      <img
                        alt="booking history icon"
                        className="w-4 h-4"
                        src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/booking_history.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Jvb2tpbmdfaGlzdG9yeS5zdmciLCJpYXQiOjE2OTQ0MDU3MzksImV4cCI6MTcyNTk0MTczOX0.8Fjox_ROepJ6S3GYITg9FKlG2s1Wzk6ahtnEXYmWnI8&t=2023-09-11T04%3A15%3A38.237Z"
                      ></img>
                      <span className="text-gray-700">Booking History</span>
                    </button>
                  </li>
                  <hr className="mt-2 border-gray-400"></hr>
                  <li>
                    <button
                      className="py-2"
                      onClick={() => logoutAndNavigate()}
                    >
                      <img
                        alt="log out icon"
                        className="w-4 h-4"
                        src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/logout.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2xvZ291dC5zdmciLCJpYXQiOjE2OTQ0MDUyMjcsImV4cCI6MTcyNTk0MTIyN30.QQWg08pQQG_UXibP0RzqSxor94ssvDnTFV7t5oh56QE&t=2023-09-11T04%3A07%3A05.943Z"
                      ></img>
                      <span className="text-gray-700">Log Out</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-cols items-center">
            <button
              className="px-6 text-body2 text-orange-500"
              onClick={linkLogin}
            >
              Log in
            </button>
            <button className="btn Button">
              <Link
                smooth
                to="#book"
                onClick={(e) => {
                  e.preventDefault();
                  const userInput = {
                    checkInDate: "",
                    checkOutDate: "",
                    room: 1,
                    person: 2,
                    night: 1,
                  };

                  // Convert the object to a JSON string before storing it
                  localStorage.setItem("userInput", JSON.stringify(userInput));
                  navigate("/search");
                }}
              >
                Find Room
              </Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
