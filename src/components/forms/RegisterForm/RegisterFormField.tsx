import { Input } from "@/components/ui/input";
import { RegisterFieldProps } from "@/types/types";

export default function RegisterFormField({
  type,
  placeholder,
  name,
  register,
  error,
}: RegisterFieldProps) {
  return (
    <div>
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="mb-1"
      />
      {error && (
        <span className="text-[13px] text-red-500 ml-2">{error.message}</span>
      )}
    </div>
  );
}
