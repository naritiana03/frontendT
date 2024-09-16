"use client";

import React, { useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { EventType, TypePlaceType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEvents } from "@/hooks/frontoffice/event";

// ---- everUi kit ----- //
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const { events } = useEvents();

  console.log(events);

  const seeDetailEvent = async (id: number) => {
    console.log(id);
    router.push(`/event/${id}`);
  };

  return (
    <main className="landing-page">
      <section className="hero relative overflow-hidden px-[6rem] custom-1000:px-[0rem] flex flex-col gap-4 items-center justify-center min-h-[95dvh] w-full custom-900:min-h-fit">
        <div className="top text-center custom-900:mt-[3rem]">
          <h2 className=" text-[2.8rem] font-MachinaRegular custom-1000:text-[2rem] custom-550:text-[1rem] ">
            Découvrez les Meilleurs Événements
          </h2>
          <h1 className=" text-[4rem] font-MachinaBold custom-1000:text-[3rem] custom-550:text-[1.8rem] ">
            Près de Chez Vous
          </h1>
        </div>
        <div className="bottom w-[80%] z-10">
          <EmblaCarousel />
        </div>
        <Image
          className="absolute left-0 -z-0 bottom-0 w-[18rem] custom-1000:w-[12rem] custom-760:hidden"
          src={"/images/abs-hero0.svg"}
          width={100}
          height={100}
          alt="hero-abs"
        />
        <Image
          className="absolute right-0 -z-0 bottom-0 w-[18rem] custom-1000:w-[12rem] custom-760:hidden"
          src={"/images/abs-hero1.svg"}
          width={100}
          height={100}
          alt="hero-abs"
        />
      </section>

      <section className="upcoming px-[6rem] py-[5rem] flex gap-8 min-h-screen custom-1100:px-[2rem] custom-900:flex-col custom-900:py-[1rem] custom-760:px-[0rem]  ">
        <div className="w-[40%] sticky top-[3rem] h-[28rem] custom-900:w-[100%] custom-900:relative custom-900:h-fit custom-900:mb-[3rem] ">
          <div className="left relative bg-white rounded-xl shadow-[0px_5px_10px_#ddd] min-h-[28rem] py-[4rem] px-[3rem] custom-900:min-h-fit custom-550:py-[3rem] ">
            <div className="skots absolute top-[-1.2rem] left-[35%] rotate-[-6deg] h-[2.5rem] w-[7rem] bg-[#FFE9AB]"></div>
            <span className="relative">
              <div className="h-fit w-fit px-[2rem] rotate-[1deg] bg-primary">
                <h3 className="font-MachinaRegular font-[900] rotate-[-1deg] text-[1.5rem] text-white custom-760:text-[1rem] ">
                  Acte à venir
                </h3>
              </div>
            </span>
            <h1 className="font-MachinaBold text-[2rem] mt-[3rem] custom-1000:text-[2rem] custom-900:mt-[1rem] custom-760:text-[1.2rem] ">
              QUI VIENDRA EN VILLE ?
            </h1>
          </div>
        </div>
        <div className="right w-full shadow-[0px_5px_10px_#ddd] bg-white rounded-xl p-6">
          <h1 className="font-MachinaRegular text-[1.7rem] text-center font-[900]  custom-760:text-[1.3rem] ">
            Featured Upcoming Evenemement
          </h1>
          <p className="text-center text-[14px] mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Distinctio, amet? Nisi deleniti fuga, saepe enim numquam
            consequatur, facere non quibusdam voluptatem debitis error,
            voluptates recusandae accusamus.
          </p>
          <div className="mt-[2rem] flex flex-col gap-8">
            {events &&
              events?.map((value: EventType, index: number) => {
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
      </section>

      <section className="about-section flex py-[5rem] px-[6rem] gap-8 h-[85dvh] custom-1100:px-[2rem] custom-900:flex-col-reverse custom-900:h-fit  ">
        <div className="left w-full">
          <Image
            className="object-cover w-full h-full rounded-xl "
            src={"/images/place-none.jpg"}
            width={1000}
            height={1000}
            alt="place-none"
          />
        </div>
        <div className="right rounded-xl h-fit relative w-[40%] bg-white shadow-[0px_5px_10px_#ddd] py-[4rem] px-[2rem] custom-900:w-full ">
          <div className="skots absolute top-[-1.2rem] left-[35%] rotate-[-6deg] h-[2.5rem] w-[7rem] bg-[#FFE9AB]"></div>
          <span className="relative">
            <div className="h-fit w-fit px-[2rem] rotate-[-1deg] bg-primary">
              <h3 className="font-MachinaRegular font-[900] rotate-[1deg] text-[1.3rem] text-white custom-760:text-[1rem]">
                à propos de ticket...
              </h3>
            </div>
          </span>
          <h1 className="font-MachinaBold text-[1.5rem] mt-[1rem] custom-760:text-[1.3rem]">
            TOUJOURS FAIRE RIRE DEPUIS 2005
          </h1>
          <p className="mt-4">
            Paragraphe. Vous pouvez le modifier et ajouter votre propre texte.
            Double-cliquez ici ou cliquez sur « Modifier le texte » pour ajouter
            votre contenu et personnaliser la police. C&apos;est l&apos;espace
            idéal pour raconter une histoire et vous présenter à vos visiteurs.
          </p>
        </div>
      </section>

      <section className="promo min-h-[80dvh] py-[5rem] px-[6rem] custom-1100:px-[2rem] ">
        <div className="title flex flex-col gap-4">
          <div className="h-fit w-fit px-[2rem] rotate-[-1deg] bg-primary">
            <h3 className="font-MachinaRegular font-[900] rotate-[1deg] text-[1.3rem] text-white custom-760:text-[1rem]">
              Tout ce que vous devez
            </h3>
          </div>
          <div className="h-fit w-fit px-[2rem] rotate-[1deg] bg-primary">
            <h3 className="font-MachinaRegular font-[900] rotate-[-1deg] text-[1.3rem] text-white custom-760:text-[1rem]">
              Connaitre
            </h3>
          </div>
        </div>
        <div className="cards grid grid-cols-3 mt-[7rem] gap-[3.5rem] custom-1000:grid-cols-2 custom-760:grid-cols-1 ">
          {fakePromo.map((value, index) => {
            return (
              <div
                key={index}
                className="card rounded-xl text-center relative min-h-[65dvh] bg-white shadow-[0px_5px_10px_#ddd] flex flex-col items-center gap-4 py-[4rem] px-[1.5rem]">
                <div className="skots absolute top-[-3rem] left-[40%] rotate-[-6deg] h-[5rem] w-[2.5rem] bg-[#FFE9AB]"></div>
                <h3 className="font-MachinaBold text-[1.2rem]">
                  {value?.title}
                </h3>
                <Image
                  className="w-[7rem]"
                  src={value?.image}
                  width={100}
                  height={100}
                  alt="image"
                />
                <p>{value?.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour démarrer l'autoplay

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    intervalRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
  }, [emblaApi]);

  // Effect pour gérer l'autoplay
  useEffect(() => {
    if (!emblaApi) return;

    startAutoplay(); // Démarre l'autoplay lors de la première montée

    return () => stopAutoplay(); // Arrête l'autoplay lors du démontage
  }, [emblaApi, startAutoplay]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Fonction pour arrêter l'autoplay
  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="relative ">
      <div
        className="embla text-white relative"
        ref={emblaRef}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}>
        <div className="embla__container flex items-center gap-4 max-h-[25rem] ">
          {fakeEvent?.map((value, index) => {
            return (
              <div
                key={index}
                className={`embla__slide ${
                  value?.id === 1 ? "pl-[1rem]" : ""
                } `}>
                <Image
                  className="object-cover"
                  src={value?.image}
                  width={500}
                  height={500}
                  alt={value?.image}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="navigation absolute translate-x-[50%] translate-y-[-50%] top-[50%] flex justify-between w-full left-[-50%] ">
        <button
          className="embla__prev bg-white ml-[-1.5rem] border-[8px] border-gray-100 text-black p-2 w-[3rem] h-[3rem] grid place-content-center rounded-full"
          onClick={scrollPrev}>
          <ChevronLeftIcon className="size-6" />
        </button>
        <button
          className="embla__prev bg-white mr-[-1.5rem] border-[8px] border-gray-100 text-black p-2 w-[3rem] h-[3rem] grid place-content-center rounded-full"
          onClick={scrollNext}>
          <ChevronRightIcon className="size-6" />
        </button>
      </div>
    </div>
  );
}

const fakeEvent = [
  { id: 1, image: "/images/event1.jpg" },
  { id: 2, image: "/images/event2.jpg" },
  { id: 3, image: "/images/event3.jpg" },
  { id: 3, image: "/images/event4.jpg" },
];

const fakePromo = [
  {
    id: 1,
    title: "TABLE VIP",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Molestiae ad harum atque, eos explicabo saepe veniam ullam sit
commodi delectus hic consectetur amet, obcaecati repudiandae?
Ad facilis cum harum repellat!`,
    image: "/icons/vip.svg",
  },
  {
    title: "OPTIONS DE PARKING",
    id: 2,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Molestiae ad harum atque, eos explicabo saepe veniam ullam sit
commodi delectus hic consectetur amet, obcaecati repudiandae?
Ad facilis cum harum repellat!`,
    image: "/icons/parking.svg",
  },
  {
    title: "BILLETTERIE NUMÉRIQUE",
    id: 3,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Molestiae ad harum atque, eos explicabo saepe veniam ullam sit
commodi delectus hic consectetur amet, obcaecati repudiandae?
Ad facilis cum harum repellat!`,
    image: "/icons/save-money.svg",
  },
];
