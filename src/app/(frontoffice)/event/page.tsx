"use client";

import Image from "next/image";
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEvents } from "@/hooks/frontoffice/event";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Page = () => {
  const [date, setDate] = React.useState<Date>();
  const router = useRouter();

  const { events } = useEvents();

  const seeDetailEvent = async (id: number) => {
    console.log(id);
    router.push(`/event/${id}`);
  };

  return (
    <>
      <div className="px-[6rem] custom-1080:px-[3.5rem] custom-550:px-[2rem] relative bg-[url('/images/hero-bg.jpg')] bg-no-repeat bg-cover bg-center min-h-[40dvh] ">
        <div className="px-[6rem] py-[3rem] custom-1080:px-0 ">
          <h1 className="text-white text-[2rem] font-[900] custom-760:text-[1.2rem]  ">
            AGENDA DES ÉVÉNEMENTS
          </h1>
          <span className="relative">
            <div className="h-fit w-fit px-[2rem] rotate-[-1deg] bg-primary">
              <h3 className="font-MachinaRegular font-[900] mt-4 rotate-[1deg] text-[1.3rem] custom-760:text-[1rem] text-white">
                à propos d&apos;evenement...
              </h3>
            </div>
          </span>
        </div>
        <div className="bg-[url('/images/event-filter.jpg')] rounded-xl custom-1080:w-[90%] bg-cover bg-center bg-no-repeat w-[75%] absolute custom-760:hidden custom-760:relative left-[50%] translate-x-[-50%] translate-y-[-7%] h-[15rem] custom-760:h-[20rem] "></div>
        <div className="bg-gradient-to-b from-[#0f5ae0] to-[#7400ba] custom-1080:w-[90%] rounded-xl opacity-70 w-[75%] absolute custom-760:hidden left-[50%] translate-x-[-50%] translate-y-[-7%] h-[15rem] custom-760:h-[20rem] "></div>
        <div className=" px-4 p-6 w-[75%] custom-1080:w-[90%] custom-760:w-full custom-760:px-0 absolute custom-760:relative left-[50%] rounded-xl translate-x-[-50%] translate-y-[-7%] h-[15rem] custom-760:h-[20rem] ">
          <div className="flex justify-between items-center custom-900:flex-col custom-900:items-start ">
            <span className="uppercase">
              <h2 className="text-primary font-bold custom-550:text-[.8rem]  ">
                welcome to Boleto
              </h2>
              <h3 className="text-[1.5rem] custom-550:text-[1.2rem] text-white  font-[900]">
                what are you looking for
              </h3>
            </span>
            <span className="flex items-center gap-4">
              <div className="flex items-center w-fit py-1 px-4 rounded-full gap-1 bg-[#7d78ff] text-white font-[800] custom-550:text-[.8rem] ">
                <Image
                  className="w-[1.5rem] custom-550:w-[1rem] "
                  src={"/images/event-type-2.png"}
                  width={500}
                  height={500}
                  alt="event-type"
                />
                EVENT
              </div>
              <div className="flex items-center w-fit py-1 px-4 rounded-full gap-1 bg-gradient-to-l from-[#0f5ae0] to-[#7400ba] text-white font-[800] custom-550:text-[.8rem]  ">
                <Image
                  className="w-[2rem] custom-550:w-[1rem]"
                  src={"/images/event-type-1.png"}
                  width={500}
                  height={500}
                  alt="event-type"
                />
                MOVIE
              </div>
              <div className="flex items-center w-fit py-1 px-4 rounded-full gap-1 bg-[#7d78ff] text-white font-[800] custom-550:text-[.8rem]  ">
                <Image
                  className="w-[2rem] custom-550:w-[1rem]"
                  src={"/images/event-type-3.png"}
                  width={500}
                  height={500}
                  alt="event-type"
                />
                SPORT
              </div>
            </span>
          </div>
          <div className="mt-6">
            <h3 className="text-white mb-2">Filter votre evenement</h3>
            <div className="flex gap-2 custom-760:flex-col ">
              <span className="flex items-center gap-1  rounded-sm bg-white px-2 flex-2">
                <Search />
                <input
                  type="text"
                  id="search"
                  placeholder="Recherche par titre ou par localisation"
                  className="outline-none w-full bg-transparent border-none custom-760:py-3"
                />
              </span>
              <div className="flex items-center gap-3">
                <span className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Date début</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </span>
                <span className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Date fin</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" min-h-screen top-0  pb-[5rem] pt-[10rem] custom-760:pt-[2rem] ">
        <div className="w-[75%] custom-760:w-[90%] m-auto bg-white rounded-xl shadow-[0px_5px_10px_#ddd] p-6">
          <h1 className="font-MachinaRegular text-[1.7rem] text-center font-[900]">
            Featured Upcoming Evenemement
          </h1>
          <p className="text-center text-[14px] mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Distinctio, amet? Nisi deleniti fuga, saepe enim numquam
            consequatur, facere non quibusdam voluptatem debitis error,
            voluptates recusandae accusamus.
          </p>
          <div className="mt-[2rem] flex flex-col gap-8">
            {events?.map((value: EventType, index: number) => {
              return (
                <div
                  key={index}
                  className="cardEvent rounded-lg flex justify-between py-3 px-10 custom-550:px-3 relative min-h-[20rem] bg-[#ddd] w-full before:contents-[''] before:w-[3rem] before:h-[3rem] before:bg-white before:top-[50%] before:translate-y-[-50%] before:rounded-full before:left-[-1.4rem] before:absolute before:contents-[''] after:w-[3rem] after:h-[3rem] after:bg-white after:top-[50%] after:translate-y-[-50%] after:rounded-full after:right-[-1.4rem] after:absolute custom-760:flex-col-reverse">
                  <div className="left w-[60%] flex flex-col gap-4 custom-760:w-full ">
                    <div className="flex flex-col w-fit custom-760:w-full custom-760:text-center custom-760:mt-8">
                      <span className="bg-[#F1E8E6] p-3">
                        <p className="font-[900]">{value?.date}</p>
                      </span>
                      <span className="bg-[#302019] p-2 text-center text-white">
                        {value?.heure}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="mt-2">
                        <p>{value?.localisation}</p>
                        <h1 className="text-[1.5rem] font-MachinaRegular font-[800] ">
                          {value?.titre}
                        </h1>
                        <small className="">{value?.description}</small>
                        <div className="mt-4 flex flex-col">
                          <h3 className="font-[400]">Type de ticket</h3>
                          {value?.type_places?.map((value, index: number) => {
                            return (
                              <span key={index}>
                                {value?.nom} :
                                <strong> {value?.prix} Ar </strong>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex items-center mt-4 gap-2">
                        <Button onClick={() => seeDetailEvent(value?.id)}>
                          Reserver
                        </Button>
                        <Button
                          onClick={() => seeDetailEvent(value?.id)}
                          className="bg-transparent hover:bg-transparent border border-black rounded-sm text-black ">
                          Voir les détails
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="right w-[40%] mr-[-1.8rem] max-h-[22rem] custom-760:w-[100%] custom-760:max-h-fit ">
                    <Image
                      className="w-full h-full object-cover rounded-lg"
                      src={value?.image}
                      width={1000}
                      height={1000}
                      alt="event"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <span className="flex justify-center items-center">
            <Button className="mt-[1rem]"> TOUS LES EVENEMENT </Button>
          </span>
        </div>
      </div>
    </>
  );
};

const SELECT_ITEMS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
] as const;

export default Page;
