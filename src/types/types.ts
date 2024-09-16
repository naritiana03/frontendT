import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type TagsType = {
  created_at: string;
  id: number;
  label: string;
  pivot: { event_id: number; tag_id: number };
  updated_at: string;
};

export type TypePlaceType = [
  {
    created_at: string;
    event_id: number;
    id: number;
    is_limited: number;
    nom: string;
    nombre: number;
    prix: number;
    updated_at: string;
  }
];

export type EventType = {
  created_at: string;
  date: string;
  description: string;
  id: number;
  image: string;
  localisation: string;
  status: string;
  titre: string;
  updated_at: string;
  heure: string;
  user_id: number;
  tags: TagsType;
  type_places: TypePlaceType;
};

export type RegisterDataType = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
};

export type RegisterFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldRegister;
  register: UseFormRegister<RegisterDataType>;
  error: FieldError | undefined;
};

export type ValidFieldRegister =
  | "fname"
  | "lname"
  | "email"
  | "password"
  | "confirmPassword"
  | "type";

export const RegisterSchema: ZodType<RegisterDataType> = z
  .object({
    fname: z.string().min(1, {
      message: "Le champ nom complet est obligatoire.",
    }),
    lname: z.string().min(1, {
      message: "Le champ nom d'utilisateur est obligatoire.",
    }),
    email: z
      .string({
        required_error: "Le champ 'email' ne peut pas être vide.",
        invalid_type_error: "Email invalide",
      })
      .email(),
    type: z.string(),
    password: z.string().min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });
