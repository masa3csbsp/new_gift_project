import { useState } from "react";

import Welcome from "./sections/Welcome";
import Letter from "./sections/Letter";
import Timeline from "./sections/Timeline";
import Gallery from "./sections/gallery";
import Wishes from "./sections/Wishes";
import BackButton from "../components/common/BackButton";

export default function Home() {
  const [step, setStep] = useState(0);
  const prevStep = () => {
  if (step > 0) {
    setStep((prev) => prev - 1);
  }
};
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <>
    {step > 0 && <BackButton onBack={prevStep} />}
      {step === 0 && <Welcome onNext={nextStep} />}
      {step === 1 && <Letter onNext={nextStep} />}
      {step === 2 && <Timeline onNext={nextStep} />}
      {step === 3 && <Gallery onNext={nextStep} />}
      {step === 4 && <Wishes onNext={nextStep} />}
    </>
  );
}