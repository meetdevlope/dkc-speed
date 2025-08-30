import BackButton from "components/BackButton";
import { ImageComponent } from "components/image-component/ImageComponent";
import Link from "next/link";
import { getDeviceId } from "utils/getDKCDeviceId";
import { ROUTES } from "utils/routes";
import LoginForm from "./components/LoginForm";
import SSO from "./components/SSO";

const LoginScreen = (props) => {
  const deviceId = getDeviceId();
  const { searchParams } = props;
  const redirectTo = searchParams?.redirectTo;

  return (
    <div className="gap-8 md:flex">
      <div className="flex h-dvh flex-col px-5 pt-[5vh] pb-4 md:w-[65%] md:pl-16 lg:w-1/2 lg:pl-20">
        <BackButton />
        <div className="mt-[4vh] md:mt-[5vh] lg:mt-[6vh]">
          <h1 className="text-xl md:text-2xl lg:text-3xl">
            Welcome back! Glad to see you again!
          </h1>
          <SSO redirectTo={redirectTo} />

          <LoginForm deviceId={deviceId as string} redirectTo={redirectTo} />
        </div>
        <h6 className="text-description mt-4 pt-2 pb-6 text-center">
          New to DKC?{" "}
          <Link
            className="font-secondary font-semibold text-black underline"
            href={`${ROUTES.REGISTER}?redirectTo=${encodeURIComponent(
              redirectTo,
            )}`}
          >
            Register
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

export default LoginScreen;
