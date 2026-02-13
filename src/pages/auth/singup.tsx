import { SignupForm } from "@/components/auth/signup-form";
import LoopLogo from "@/components/logo/logo";

export const SignupPage = () => {
  return (
    <>
      <title>New Account | Loop</title>
      <meta name="description" content="Create a new Loop account" />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-lg flex-col gap-6 items-center">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img src="/src/assets/logoo.svg" alt="Logo" width={28} />
            <LoopLogo size="xs" />
          </a>
          <SignupForm />
        </div>
      </div>
    </>
  );
};
