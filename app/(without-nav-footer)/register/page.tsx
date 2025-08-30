import BackButton from "components/BackButton";
import { ImageComponent } from "components/image-component/ImageComponent";
import Link from "next/link";
import { getDeviceId } from "utils/getDKCDeviceId";
import { ROUTES } from "utils/routes";
import SSO from "../login/components/SSO";
import RegisterForm from "./components/RegisterForm";

const RegisterScreen = (props) => {
  const deviceId = getDeviceId();
  const { searchParams } = props;
  const redirectTo = searchParams?.redirectTo;

  return (
    <div className="gap-8 md:flex">
      <div className="flex h-dvh w-full flex-col px-5 pt-[5vh] md:w-[65%] md:pl-16 lg:w-1/2 lg:pl-20">
        <BackButton />
        <div className="mt-[4vh]">
          <h1>Welcome to DKC!</h1>
          <SSO redirectTo={redirectTo} />

          <RegisterForm
            deviceId={deviceId as string}
            redirectTo={redirectTo as string}
          />
        </div>
        <h6 className="text-description mt-auto pt-2 pb-6 text-center">
          Already a user?{" "}
          <Link
            className="font-secondary font-semibold text-black underline"
            href={`${ROUTES.LOGIN}?redirectTo=${encodeURIComponent(
              redirectTo,
            )}`}
          >
            Login
          </Link>
        </h6>
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

export default RegisterScreen;
