import BookingDetail from "./BookingDetail";
import BookingNote from "./BookingNote";
import ButtonNavigation from "./ButtonNavigation";
import { useAuth } from "../../contexts/authen.jsx";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import StepPropsType from "../../interfaces/StepPropsType.ts";

function BasicInfo({ steps, activeStep, setActiveStep }: StepPropsType) {
  const auth = useAuth();

  let fullName;
  let email;
  let dateOfBirth;
  let idNumber;
  let country;

  if (auth.isAuthenticated && auth.state.userData) {
    fullName = auth.state.userData.fullName;
    email = auth.state.userData.email;
    dateOfBirth = auth.state.userData.birthDate;
    idNumber = auth.state.userData.idNumber;
    country = auth.state.userData.country;
  }

  // console.log(auth.state.userData);

  return (
    <div className="flex gap-6">
      <div className="w-[740px] bg-white rounded border border-gray-300 p-10">
        <p className="text-gray-600 text-headline5 pb-10">Basic Information</p>
        <form className="flex flex-col gap-10">
          <div>
            <label htmlFor="fname">
              <p className="font-body1 text-gray-900 mb-1">Full Name</p>
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={fullName}
              className="w-full InputSuccess"
              disabled
            />
          </div>

          <div>
            <label htmlFor="email">
              <p className="font-body1 text-gray-900 text-start mb-1">Email</p>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="w-full InputSuccess"
              disabled
            />
          </div>

          <div>
            <label htmlFor="idNumber">
              <p className="font-body1 text-gray-900 text-start mb-1">
                ID Number
              </p>
            </label>
            <input
              type="tel"
              id="idNumber"
              name="idNumber"
              value={idNumber}
              className="w-full InputSuccess"
              disabled
            />
          </div>

          <div>
            <label htmlFor="birthDate">
              <p className="font-body1 text-gray-900 text-start mb-1">
                Date of Birth
              </p>
            </label>
            <DatePicker
              value={dayjs(dateOfBirth)}
              format="dd, DD MMMM YYYY"
              disabled
              slotProps={{
                textField: { size: "medium" },
              }}
              sx={{
                "& input": {
                  padding: "14px",
                  width: "580px",
                  fontFamily: "inter",
                },
              }}
            />
          </div>

          <div>
            <label htmlFor="country">
              <p className="font-body1 text-gray-900 text-start mb-2">
                Country
              </p>
            </label>
            <select className="select  Disabled-select  bg-white " disabled>
              <option value={country}>{country}</option>
            </select>
          </div>
        </form>
        <ButtonNavigation
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
      </div>
      <div className="flex flex-col gap-4">
        <BookingDetail />
        <BookingNote />
      </div>
    </div>
  );
}

export default BasicInfo;
