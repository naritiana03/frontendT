import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { RegisterDataType, RegisterSchema } from "@/types/types";
import RegisterFormField from "./RegisterFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleCheck, CircleX } from "lucide-react";
import axiosClient from "@/lib/axios";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterDataType>({
    resolver: zodResolver(RegisterSchema),
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = async (data: RegisterDataType) => {
    setLoading(true);
    setShowAlert(false);
    setErrorMessage("");
    axiosClient
      .post("/api/register", data)
      .then(() => {
        reset();
        setLoading(false);
        setShowAlert(true);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
        setLoading(false);
        setShowAlert(true);
      });
  };

  const displayAlert =
    errorMessage.length > 0
      ? AlertError(errorMessage)
      : AlertSuccess("Votre compte à été bien crée. Veuillez-vous connectez !");

  return (
    <form
      action="#"
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {showAlert && displayAlert}
      <RegisterFormField
        type="text"
        placeholder="Nom complet *"
        name="fname"
        register={register}
        error={errors.fname}
      />

      <RegisterFormField
        type="text"
        placeholder="Nom d'utilisateur *"
        name="lname"
        register={register}
        error={errors.lname}
      />

      <RegisterFormField
        type="email"
        placeholder="Email *"
        name="email"
        register={register}
        error={errors.email}
      />

      <RegisterFormField
        type="password"
        placeholder="Mot de passe *"
        name="password"
        register={register}
        error={errors.password}
      />

      <RegisterFormField
        type="password"
        placeholder="Rétaper votre mot de passe *"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
      />

      <div className="flex gap-8">
        <div className="flex items-center space-x-2">
          <Input
            type="radio"
            value="customer"
            id="customer"
            className="w-4 cursor-pointer"
            defaultChecked
            {...register("type")}
          />
          <Label htmlFor="customer" className="whitespace-nowrap">
            Utilisateur normal
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="radio"
            value="organiser"
            id="organiser"
            className="w-4 cursor-pointer"
            {...register("type")}
          />
          <Label htmlFor="organiser" className="whitespace-nowrap">
            Organisateur
          </Label>
        </div>
      </div>

      {loading ? (
        <Button disabled className="w-full rounded-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          S'inscrire
        </Button>
      ) : (
        <Button type="submit" className="w-full rounded-full">
          S'inscrire
        </Button>
      )}
    </form>
  );
}

const AlertError = (message: string) => {
  return (
    <div className="error">
      <Alert>
        <div className="inline-block">
          <CircleX fill="#f4511f" color="white" strokeWidth={2} />
        </div>
        <AlertDescription className="text-[#f4511f] ml-2">
          {message}
        </AlertDescription>
      </Alert>
    </div>
  );
};

const AlertSuccess = (message: string) => {
  return (
    <div className="success">
      <Alert>
        <div className="inline-block">
          <CircleCheck fill="#22c55e" color="white" strokeWidth={2} />
        </div>
        <AlertDescription className="text-green-500 ml-2">
          {message}
        </AlertDescription>
      </Alert>
    </div>
  );
};
