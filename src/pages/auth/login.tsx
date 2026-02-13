import { LoginForm } from "@/components/auth/login-form";

export const LoginPage = () => {
  return (
    <>
      <title>Login | Loop</title>
      <meta name="description" content="Sign in to your Loop account" />

      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
