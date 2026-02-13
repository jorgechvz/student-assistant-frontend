import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { fetchLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/connection";

  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await fetchLogin.mutateAsync(
      { email, password },
      {
        onSuccess: (data: any) => {
          setServerMessage(
            data?.user || JSON.stringify(data) || "Login successful!"
          );
          navigate(from, { replace: true });
        },
        onError: (error: any) => {
          setServerMessage(
            error?.response?.data?.user ||
              error?.message ||
              "An error occurred. Please try again."
          );
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <img src="/src/assets/logoo.svg" alt="Logo Loop" />
              </div>
              <span className="sr-only">Loop</span>
            </a>
            <h1 className="text-3xl font-bold">Welcome to Loop</h1>
            <FieldDescription>
              Don&apos;t have an account?{" "}
              <Link to="/auth/signup" state={location.state}>
                Sign up
              </Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input name="password" id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit">Login</Button>
            {serverMessage && (
              <FieldDescription
                className={`text-center mt-2 ${
                  typeof serverMessage === "string" &&
                  (serverMessage.toLowerCase().includes("error") ||
                    serverMessage.toLowerCase().includes("fail"))
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {typeof serverMessage === "string"
                  ? serverMessage
                  : JSON.stringify(serverMessage)}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
