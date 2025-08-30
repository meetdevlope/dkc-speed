import BackButton from "components/BackButton";
import { ImageComponent } from "components/image-component/ImageComponent";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import OTPEmail from "./components/OTPEmail";
import OTPVerificationForm from "./components/OTPVerificationForm";
import ResendOTP from "./components/ResendOTP";

const OTPVerificationScreen = (props) => {
  const { searchParams } = props;
  const email = searchParams?.email;
  const redirectTo = searchParams?.redirectTo;

  return (
    <div className="gap-8 md:flex">
      <div className="flex h-dvh flex-col px-5 pt-[5vh] pb-4 md:w-[65%] md:pl-16 lg:w-1/2 lg:pl-20">
        <BackButton />
        <div className="mt-[8vh]">
          <h1>OTP Verification</h1>
          <OTPEmail email={email} />
          <OTPVerificationForm email={email} redirectTo={redirectTo} />
        </div>
        <ResendOTP email={email || ""} />
        <Link
          href={ROUTES.LOGIN}
          className="text-center font-semibold underline"
        >
          Login
        </Link>
      </div>
      <div className="bg-beige relative hidden h-[100vh] md:block md:w-2/5 lg:w-1/2">
        <ImageComponent
          fill
          objectFit="cover"
          objectPosition="top"
          src={"/auth-img.jpg"}
          alt="register-alt-mage"
        />
      </div>
    </div>
  );
};

export default OTPVerificationScreen;
