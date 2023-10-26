import BookingDetail from "./BookingDetail";
import BookingNote from "./BookingNote";
import { useContext } from "react";
import { PaymentContext } from "../../pages/Payment";
import ButtonNavigation from "./ButtonNavigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormControlLabel, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import StepPropsType from "../../interfaces/StepPropsType";

function SpecialRequest({
  steps,
  activeStep,
  setActiveStep,
  standardRequests,
  specialRequests,
}: StepPropsType) {
  const context = useContext(PaymentContext);
  const handleToggleStandardRequest = context.handleToggleStandardRequest;
  const handleToggleSpecialRequest = context.handleToggleSpecialRequest;
  const handleAdditionalRequest = context.handleAdditionalRequest;
  const additional = context.additional;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#E76B39",
        light: "#E76B39",
        dark: "#E76B39",
      },
    },
  });

  const CheckboxSx = {
    color: "#D6D9E4",

    "&.Mui-checked": {
      color: "#E76B39",
    },
    "& .MuiSvgIcon-root": { fontSize: 33 },
  };
  return (
    <div className="flex gap-6">
      <div className="w-[740px] bg-white border border-gray-300 rounded p-10">
        <>
          <p className="text-gray-600 text-headline5">Standard Request</p>
          <p className="text-gray-600 text-body2 mb-8">
            These requests are not confirmed (Depend on the available room)
          </p>
          <div className="form-control flex flex-col gap-3 text-body-1 text-gray-700">
            <ThemeProvider theme={theme}>
              {standardRequests.map((request) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          handleToggleStandardRequest(request.name)
                        }
                        name={request.name}
                        value={request.checked}
                        checked={request.checked}
                        sx={CheckboxSx}
                      />
                    }
                    label={
                      <Typography
                        sx={
                          request.checked
                            ? {
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "#2A2E3F",
                              }
                            : { fontSize: 18, fontWeight: "regular" }
                        }
                      >
                        {request.name}
                      </Typography>
                    }
                  />
                );
              })}
            </ThemeProvider>
          </div>
        </>
        <>
          <p className="text-gray-600 text-headline5 mt-8">Special Request</p>
          <p className="text-gray-600 text-body2 mb-8">
            Additional charge may apply
          </p>
          <div className="form-control flex flex-col gap-3 text-body-1 text-gray-700">
            <ThemeProvider theme={theme}>
              {specialRequests.map((request) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          handleToggleSpecialRequest(request.name)
                        }
                        name={request.name}
                        value={request.checked}
                        checked={request.checked}
                        sx={CheckboxSx}
                      />
                    }
                    label={
                      <Typography
                        sx={
                          request.checked
                            ? {
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "#2A2E3F",
                              }
                            : { fontSize: 18, fontWeight: "regular" }
                        }
                      >
                        {request.name} (+THB {request.price})
                      </Typography>
                    }
                  />
                );
              })}
            </ThemeProvider>
          </div>
        </>

        <div className="flex flex-col mt-10">
          <label htmlFor="additionRequest" className="text-gray-900 text-body1">
            Additional Request
          </label>
          <textarea
            name="additionRequest"
            id="additionRequest"
            value={additional}
            onChange={(e) => handleAdditionalRequest(e)}
            className="h-20 w-full p-3 rounded bg-white border-2 border-gray-400 resize-none hover:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 "
          ></textarea>
        </div>
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

export default SpecialRequest;
