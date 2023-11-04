import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authen";
import jwtDecode from "jwt-decode";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Stack } from "@mui/material";

interface RouteParams {
  profileID: string;
  [key: string]: string | undefined;
}

function Profile() {
  const auth = useAuth();
  const params = useParams<RouteParams>();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    idNumber: "",
    birthDate: "",
    country: "",
    profile_image: "",
  });
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [avatars, setAvatars] = useState<{ [key: string]: File }>({});
  const [checkUser, setCheckUser] = useState(null);

  //validation
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [idNumberError, setIdNumberError] = useState(false);
  const [birthDayError, setBirthDayError] = useState(false);
  const [countriesError, setCountriesError] = useState(false);

  // ID Number ซ้ำ
  const [idNumberValidError, setidNumberValidError] = useState(false);

  //invalid file
  const [invalidFile, setInvalidFile] = useState("");

  //loading
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateFullName = (name: string) => {
    if (typeof name !== "string" || name.trim() === "") {
      setFullNameError(true);
    } else {
      const names = name.trim().split(" ");
      if (
        names.length !== 2 ||
        !/^[a-zA-Z]*$/.test(names[0]) ||
        !/^[a-zA-Z]*$/.test(names[1])
      ) {
        setFullNameError(true);
      } else {
        setFullNameError(false);
      }
    }
  };
  //check age
  const validateBirthDay = (birthDate: string) => {
    const dob = new Date(birthDate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();

    return age >= 18;
  };

  // ฟังก์ชันเช็ค country ว่าถูกเลือกหรือไม่
  const validateCountry = () => {
    if (!user.country) {
      setCountriesError(true);
    } else {
      setCountriesError(false);
    }
  };

  //check user
  const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDataFromToken = jwtDecode(token);
      const result = await axios.get(
        `https://neatly-dj6ygctp8-lavalse41.vercel.app/validUser/${userDataFromToken.user_id}`
      );
      setCheckUser(result);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  useEffect(() => {
    validateCountry();
  }, [user.country]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uniqueId = Date.now();
    const file = event.target.files?.[0];

    if (file) {
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const fileExtension = file.name.toLowerCase().slice(-4);
      if (
        file.size <= 2 * 1024 * 1024 &&
        allowedExtensions.includes(fileExtension)
      ) {
        setAvatars({
          ...avatars,
          [uniqueId.toString()]: file,
        });
        setInvalidFile("");
      } else {
        setInvalidFile(
          "Your file is invalid. Please select a file that is no larger than 2 MB and is .jpg, .jpeg, or .png"
        );
      }
    }
  };

  const handleRemoveImage = (avatarKey: string) => {
    const { [avatarKey]: deletedAvatar, ...newAvatars } = avatars;
    setAvatars(newAvatars);
  };

  const getProfileID = async () => {
    const token = localStorage.getItem("token");
    console.log(auth.state.userData);
    if (token) {
      try {
        const response = await axios.get(
          `https://neatly-dj6ygctp8-lavalse41.vercel.app/profile/${auth.state.userData.id}`
        );
        console.log(response.data.data);
        const data = response.data.data;
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getProfileID();
  }, [checkUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const isAvatarSelected = Object.keys(avatars).length > 0;

    if (!isAvatarSelected && !user.profile_image) {
      setInvalidFile("Please upload a profile picture before updating.");
      setIsLoading(false);
      return;
    }
    // Check full name
    validateFullName(user.fullName);

    if (!/^\d{13}$/.test(user.idNumber)) {
      setIdNumberError(true);
      setIsLoading(false);
      return;
    } else {
      setIdNumberError(false);
    }

    validateCountry();

    let isEmailChanged = false;
    let isIdNumberChanged = false;

    if (user.email !== auth.state.userData.email) {
      isEmailChanged = true;
    }

    if (user.idNumber !== auth.state.userData.idNumber) {
      isIdNumberChanged = true;
    }

    if (isEmailChanged) {
      const queryParamsEmail = `?email=${user.email}`;
      const validEmail = await axios.get(
        `https://neatly-dj6ygctp8-lavalse41.vercel.app/validUser/email${queryParamsEmail}`
      );
      if (validEmail.data.data.length === 1) {
        setEmailError(true);
        setIsLoading(false);
        return;
      } else {
        setEmailError(false);
      }
    }

    if (isIdNumberChanged) {
      const queryParamsIdNumber = `?idNumber=${user.idNumber}`;
      const validIdNumber = await axios.get(
        `https://neatly-dj6ygctp8-lavalse41.vercel.app/validUser/idNumber${queryParamsIdNumber}`
      );
      if (validIdNumber.data.data.length === 1) {
        setidNumberValidError(true);
        setIsLoading(false);
        return;
      } else {
        setidNumberValidError(false);
      }
    }

    setIsLoading(true);

    // Validate birthDate
    const isAgeValid = validateBirthDay(user.birthDate);
    if (!isAgeValid) {
      setBirthDayError(true);
      setIsLoading(false);
      return;
    } else {
      setBirthDayError(false);
    }

    try {
      const formData = new FormData();
      formData.append("fullName", user.fullName);
      formData.append("email", user.email);
      formData.append("idNumber", user.idNumber);
      formData.append("birthDate", user.birthDate);
      formData.append("country", user.country);

      for (let avatarKey in avatars) {
        formData.append("avatar", avatars[avatarKey]);
      }
      if (
        idNumberError ||
        fullNameError ||
        emailError ||
        birthDayError ||
        countriesError
      ) {
        setIsLoading(false);
        return;
      } else {
        try {
          const response = await axios.put(
            `https://neatly-dj6ygctp8-lavalse41.vercel.app/profile/${params.profileID}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          setIsLoading(false);
          document.getElementById("my_modal_1").showModal();

          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    targetProperty?: string
  ) => {
    if (typeof e === "string") {
      setUser((prevUser) => ({
        ...prevUser,
        [e]: targetProperty || "",
      }));
    } else {
      const { name, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryOptions: { value: string; label: string }[] = data.map(
          (country: { name: { common: string } }) => ({
            value: country.name.common,
            label: country.name.common,
          })
        );
        const sortedCountries = countryOptions.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setCountries(sortedCountries);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // theme date picker
  const theme = createTheme({
    components: {},
    palette: {
      primary: {
        main: "#E76B39",
        light: "#E76B39",
        dark: "#E76B39",
      },
    },
  });

  return (
    <div className="flex flex-col items-center w-screen bg-bg">
      <Navbar />
      <div className="flex flex-col w-[930px] ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between mt-[80px] items-center">
            <h1 className="font-noto-serif-display text-[68px] font-medium text-green-800">
              Profile
            </h1>
            <button
              className="btn Button w-[258px] h-[48px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner w-7 bg-orange-600"></span>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
          <p className="text-headline5 mt-[58px] mb-[38px] text-gray-600">
            Basic Information
          </p>
          <div className="relative">
            <label htmlFor="fullName">
              <p className="font-body1 text-gray-900 mb-[4px]">Full Name</p>
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your name and lastname"
              className={`w-full Input mb-[4px] text-black focus:outline-none focus:border-orange-500 ${
                fullNameError ? "border-[#B61515]" : "focus:outline-none"
              }`}
              value={user.fullName}
              onChange={(e) => {
                handleChange(e, "fullName");
                validateFullName(e.target.value);
              }}
              required
            />
            {fullNameError && (
              <>
                <div className="absolute right-5 top-[50px] transform -translate-y-1/2">
                  <img
                    src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                    alt="Error Icon"
                    className="h-5 w-5"
                  />
                </div>
                <p className="text-body3  text-red absolute">
                  The full name should include both the first name and the last
                  name and cannot contain any numbers.
                </p>
              </>
            )}
          </div>
          <div className="grid grid-rows-2 grid-flow-col gap-x-[22px] mb-[38px]">
            <div className="relative">
              <label htmlFor="email">
                <p className="font-body1 text-gray-900 mt-[38px] mb-[4px]">
                  Email
                </p>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                className={` Input w-[453px] mb-[4px] text-black focus:outline-none focus:border-orange-500 ${
                  emailError ? "border-[#B61515]" : "focus:outline-none"
                }`}
                value={user.email}
                onChange={(e) => handleChange(e, "email")}
                required
              />
              {emailError && (
                <>
                  <div className="absolute right-5 top-[90px] transform -translate-y-1/2">
                    <img
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                      alt="Error Icon"
                      className="h-5 w-5"
                    />
                  </div>

                  <p className="text-body3 text-red absolute">
                    Email already in use. Please choose a different email.
                  </p>
                </>
              )}
            </div>
            <div className="relative pt-[34px]">
              <label htmlFor="birthDate">
                <p className="font-body1 text-gray-900 text-start">
                  Date of Birth
                </p>
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: birthDayError && "#B61515",
                        borderWidth: birthDayError && "2px",
                        borderRadius: "3px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#E76B39",
                      },
                      "&.Mui-focused.Mui-error fieldset": {
                        borderColor: "#E76B39 !important",
                      },
                    },
                    "& .MuiInputBase-root.Mui-error": {
                      color: "#FFFFFF !important",
                    },

                    "& .MuiOutlinedInput-root.Mui-error": {
                      "& fieldset": {
                        borderColor: "#D6D9E4 !important",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "15px 12px 15px 12px",
                      width: "380px",
                      fontFamily: "inter",
                      background: "#FFF",
                      color: "#2A2E3F",
                    },
                  }}
                >
                  <DemoContainer components={["DatePicker"]}>
                    <ThemeProvider theme={theme}>
                      <DatePicker
                        showDaysOutsideCurrentMonth
                        fixedWeekNumber={6}
                        value={dayjs(user.birthDate)}
                        format="YYYY-MM-DD"
                        disableFuture
                        onChange={(selectedDate) => {
                          const formattedDate =
                            dayjs(selectedDate).format("YYYY-MM-DD");
                          handleChange("birthDate", formattedDate);
                        }}
                        slotProps={{ textField: { size: "medium" } }}
                      />
                    </ThemeProvider>
                  </DemoContainer>
                </Stack>
                {birthDayError && (
                  <span className="text-body3 text-red absolute left-0 -bottom-5">
                    You must be at least 18 years old to register.
                  </span>
                )}
              </LocalizationProvider>
            </div>

            <div className="relative">
              <label htmlFor="idNumber">
                <p className="font-body1 text-gray-900 mt-[38px] mb-[4px]">
                  ID Number
                </p>
              </label>
              <input
                id="idNumber"
                type="tel"
                name="idNumber"
                pattern="\d*"
                maxLength={13}
                placeholder="Enter your ID Number"
                className={`Input w-[453px] mb-[4px] text-black focus:outline-none focus:border-orange-500 ${
                  idNumberError || idNumberValidError
                    ? "border-[#B61515]"
                    : "focus:outline-none"
                }`}
                value={user.idNumber}
                onChange={(e) => handleChange(e, "idNumber")}
                required
              />
              {idNumberError && (
                <>
                  <div className="absolute right-5 top-[90px] transform -translate-y-1/2">
                    <img
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                      alt="Error Icon"
                      className="h-5 w-5"
                    />
                  </div>
                  <p className="text-body3 text-red absolute">
                    ID Number must be 13 digits.
                  </p>
                </>
              )}
              {idNumberValidError && (
                <>
                  <div className="absolute right-5 top-[90px] transform -translate-y-1/2">
                    <img
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                      alt="Error Icon"
                      className="h-5 w-5"
                    />
                  </div>

                  <p className="text-body3 text-red absolute">
                    ID Number already in use. Please choose a different ID
                    Number.
                  </p>
                </>
              )}
            </div>
            <div className="relative">
              <label htmlFor="country">
                <p className="font-body1 text-gray-900 text-start mt-[38px] mb-[4px]">
                  Country
                </p>
              </label>
              <select
                name="country"
                id="country"
                value={user.country}
                onChange={(e) => {
                  setUser({ ...user, country: e.target.value });
                }}
                className={` Input w-[453px] mb-[4px] text-black  h-[53px] focus:outline-none focus:border-orange-500 ${
                  countriesError ? "border-[#B61515]" : "focus:outline-none"
                }`}
              >
                <option value="" className="w-full Input mb-[38px] text-black">
                  Select your country
                </option>
                {countries.map((country) => (
                  <option
                    key={country.value}
                    value={country.value}
                    className="w-full Input mb-[38px] text-black"
                  >
                    {country.label}
                  </option>
                ))}
              </select>

              {countriesError && (
                <span className="text-body3  text-red absolute left-0 -bottom-5">
                  Please select your country.
                </span>
              )}
            </div>
          </div>
          <div className="h-[2px] bg-gray-300 mb-[38px]" />

          <div className="flex flex-col items-start relative">
            <p className="text-headline5 mb-[38px] text-gray-600 ">
              Profile Picture
            </p>
            <div className="flex flex-row  mb-[38px]">
              {Object.keys(avatars).length === 0 ? (
                <div className="relative">
                  <label htmlFor="upload">
                    <div
                      className={`w-[170px] h-[167px] bg-gray-200 rounded mb-[25px] flex flex-col justify-center items-center border-2 ${
                        invalidFile ? "border-[#B61515]" : "focus:outline-none"
                      }`}
                    >
                      {user.profile_image ? (
                        <img
                          className="w-[167px] h-[167px] rounded object-cover"
                          src={user.profile_image}
                          alt="Profile"
                        />
                      ) : (
                        <div
                          className={`w-[167px] h-[167px] flex flex-col justify-center items-center border-2 rounded  transition border-gray-200 ${
                            invalidFile
                              ? "border-[#B61515]"
                              : "hover:border-orange-500"
                          }`}
                        >
                          <p className="text-orange-500 text-[30px] font-medium text-center">
                            +
                          </p>
                          <p className="text-orange-500 text-sm font-medium text-center">
                            Upload photo
                          </p>
                        </div>
                      )}
                      <input
                        id="upload"
                        name="avatar"
                        type="file"
                        onChange={handleFileChange}
                        disabled={Object.keys(avatars).length > 0}
                        accept="image/jpg, image/jpeg, image/png"
                        hidden
                      />
                    </div>
                  </label>
                  {user.profile_image && (
                    <button
                      className="h-[24px] w-[24px] text-white rounded-full bg-[#B61515] flex items-center justify-center absolute -top-2 -right-2 hover:bg-orange-700 active:bg-orange-800"
                      onClick={() => {
                        setUser({ ...user, profile_image: "" });
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
              ) : null}
              {Object.keys(avatars).map((avatarKey) => {
                const file = avatars[avatarKey];
                return (
                  <div
                    key={avatarKey}
                    className="w-[167px] h-[167px] mb-[25px] relative"
                  >
                    <img
                      className="w-[167px] h-[167px] rounded object-cover"
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                    />
                    <button
                      className="h-[24px] w-[24px] text-white rounded-full bg-[#B61515] flex items-center justify-center absolute -mt-[176px] ml-[154px] hover:bg-orange-700 active:bg-orange-800"
                      onClick={() => handleRemoveImage(avatarKey)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
              {/* Invalid File */}
              <div className="h-[35px]">
                {invalidFile && (
                  <p className="text-body3 text-red absolute left-0 mt-[180px]">
                    {invalidFile}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>

        <dialog id="my_modal_1" className="modal">
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20 w-screen h-screen">
            <div className="modal-box flex flex-col items-center justify-center rounded shadow-xl w-[400px] h-[460px] bg-white">
              <img
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/check-mark-600.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NoZWNrLW1hcmstNjAwLnBuZyIsImlhdCI6MTY5NTg5OTA0OCwiZXhwIjoxNzI3NDM1MDQ4fQ.VhlmEajz9lcOHnjyCP7t3jYbFEYu-JGzQpq18PcC22Y&t=2023-09-28T11%3A04%3A08.587Z"
                alt="Check-Mark"
                className="h-[150px] w-[150px] color-green-400"
              />
              <h1 className="font-noto-serif-display font-semibold text-[40px] text-green-600">
                Success
              </h1>
              <p className="font-Inter py-4 font-semibold text-[20px] text-center">
                Your profile details have <br /> been updated successfully
                <br />
              </p>
              <div className="modal-action">
                <button
                  className="font-Inter w-[200px] h-[50px] rounded-md bg-green-600 border-none hover:bg-green-500 text-[20px] active:bg-green-700 text-white"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Profile;
