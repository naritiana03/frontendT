import React from "react";
// ---- everUi Kit ----- //
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div className="footer flex justify-between bg-[#242321] text-white py-[5rem] px-[6rem] min-h-[70dvh] custom-900:flex-col custom-900:gap-14 custom-550:px-5">
      <div className="left flex flex-1 flex-col gap-[2rem]">
        <h3 className="font-[900] font-MachinaBold text-[2.5rem] text-[#fff9e2] custom-1100:text-[2rem] custom-760:text-[1.5rem]">
          CONTACT
        </h3>
        <span className="relative">
          <div className="h-fit w-fit px-[2rem] rotate-[-1deg] bg-primary">
            <h3 className="font-MachinaRegular font-[900] rotate-[1deg] text-[1.3rem] text-white custom-1100:text-[1rem] ">
              QUESTIONS ?
            </h3>
          </div>
        </span>
        <ul className="list-none text-[#fff9e2] ">
          <li>Appelez Navas au +261342304165 ou</li>
          <li>Ecrit à nous : rahandrimiray@gmail.com</li>
          <li>Adresse Fianarantsoa 301 Tanamabao Zoara</li>
        </ul>
        <span className="text-[2.5rem] custom-900:text-[2rem] ">😎🎉🎆🎊</span>
      </div>
      <div className="right flex flex-1 flex-col gap-[2rem]">
        <h3 className="font-[900] font-MachinaBold text-[2.5rem] text-[#fff9e2] custom-1100:text-[2rem]  custom-760:text-[1rem]">
          VOUS AIMEZ LE RIRE ?
        </h3>
        <span className="relative">
          <div className="h-fit w-fit px-[2rem] rotate-[-1deg] bg-primary">
            <h3 className="font-MachinaRegular font-[900] rotate-[1deg] text-[1.3rem] text-white custom-1100:text-[1rem] ">
              ABONNEMENT À LA
            </h3>
          </div>
        </span>
        <span className="relative">
          <div className="h-fit w-fit px-[2rem] rotate-[-1deg] bg-primary">
            <h3 className="font-MachinaRegular font-[900] rotate-[1deg] text-[1.3rem] text-white custom-1100:text-[1rem] ">
              NEWSLETTER !
            </h3>
          </div>
        </span>
        <p className="text-[#fff9e2]">
          ...et même si vous ne nous aimez pas, abonnez-vous quand même,
          c&apos;est gratuit, qu&apos;est-ce que vous craignez ?
        </p>
        <span className="flex items-center gap-3">
          <Input
            type="email"
            placeholder="Saisir votre email ici"
            className="text-black"
          />
          <Button>S&apos;abbonner</Button>
        </span>
      </div>
    </div>
  );
};

export default Footer;
