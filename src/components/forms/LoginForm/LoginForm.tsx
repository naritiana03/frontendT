import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import axiosClient from "@/lib/axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleX } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { Loader2 } from "lucide-react";

type LoginFormProps = {
  onOpenChange: (open: boolean) => void;
};

export default function LoginForm({ onOpenChange }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuthStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axiosClient
      .post("/api/login", { email, password })
      .then((res) => {
        setErrorMessage("");
        login(res.data.data.user, res.data.data.token);
        setLoading(false);
        onOpenChange(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
        setLoading(false);
      });
  };

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {errorMessage?.length > 0 && AlertError(errorMessage)}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {loading ? (
          <Button disabled className="w-full rounded-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Se connecter
          </Button>
        ) : (
          <Button type="submit" className="w-full rounded-full">
            Se connecter
          </Button>
        )}
      </form>
    </>
  );
}

const AlertError = (message: string) => {
  return (
    <Alert>
      <div className="inline-block">
        <CircleX fill="#f4511f" color="white" strokeWidth={2} />
      </div>
      <AlertDescription className="text-[#f4511f] ml-2">
        {message}
      </AlertDescription>
    </Alert>
  );
};
