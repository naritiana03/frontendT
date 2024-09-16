import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "../forms/RegisterForm/RegisterForm";
import LoginForm from "../forms/LoginForm/LoginForm";
import { Checkbox } from "@/components/ui/checkbox";

type AuthDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <Tabs defaultValue="s'identifier">
          <TabsList className="grid w-full grid-cols-2 bg-transparent">
            <TabsTrigger value="s'identifier">S'identifier</TabsTrigger>
            <TabsTrigger value="s'inscrire">S'inscrire</TabsTrigger>
          </TabsList>
          <TabsContent value="s'identifier" className="flex flex-col gap-5">
            <h2 className="text-xl font-bold mt-5">Connectez-vous à compte</h2>
            <LoginForm onOpenChange={onOpenChange} />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Se souvenir de moi
              </label>
            </div>
          </TabsContent>

          <TabsContent value="s'inscrire">
            <h2 className="text-xl font-bold my-5">Créer un compte</h2>
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
