import { SpecialType, StandardType } from "../interfaces/RequestType";

export default interface StepPropsType {
  steps: string[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  selectedPayment?: string;
  lastThreeCardNumber?: string;
  setSelectedPayment: (req: string) => void;
  setLastThreeCardNumber: (number: string) => void;
  standardRequests: StandardType[];
  specialRequests: SpecialType[];
}
