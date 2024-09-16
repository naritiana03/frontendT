"use client";
import React, { useEffect } from "react";
import { EventType } from "@/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Plus, Minus, CircleFadingPlus } from "lucide-react";
import { useEventsById } from "@/hooks/frontoffice/event";
import useCartStore from "@/store/cart";
import toast from "react-hot-toast";

// ---- everUiKit ------ //
import { Button } from "@/components/ui/button";

export type TypePlaceType = {
  created_at: string;
  event_id: number;
  id: number;
  is_limited: number;
  nom: string;
  nombre: number;
  prix: number;
  updated_at: string;
};

const Page = () => {
  const params = useParams<{ id: string }>();

  const { events, typeplace, isLoading } = useEventsById(params?.id);

  const {
    cart,
    items,
    incrementQuantity,
    decrementQuantity,
    addItem,
    loadCartFromLocalStorage,
    saveCartToLocalStorage,
  } = useCartStore();

  // Load cart from localStorage on component mount
  useEffect(() => {
    loadCartFromLocalStorage();
  }, [loadCartFromLocalStorage]);

  // Save cart to localStorage on cart or items change
  useEffect(() => {
    saveCartToLocalStorage();
  }, [cart, items, saveCartToLocalStorage]);

  const addCart = (id: number, id_event: number, nom: string, prix: number) => {
    addItem(id, id_event, nom, prix, events[0]?.image, events[0]?.titre);
    toast.success("Ticket ajoue au panier avec succès !", {
      duration: 5000,
    });
  };

  console.log(cart);

  return (
    <div className="px-[6rem] py-[3rem] custom-1080:px-[2rem]">
      <div className="top">
        {events?.map((value: EventType, index: number) => (
          <div
            key={index}
            className="cardEvent rounded-lg flex justify-between py-3 px-10 custom-550:px-3 relative bg-[#ddd] w-full before:contents-[''] before:w-[3rem] before:h-[3rem] before:bg-[#f3f4f6] before:top-[50%] before:translate-y-[-50%] before:rounded-full before:left-[-1.4rem] before:absolute before:contents-[''] after:w-[3rem] after:h-[3rem] after:bg-[#f3f4f6] after:top-[50%] after:translate-y-[-50%] after:rounded-full after:right-[-1.4rem] after:absolute custom-760:flex-col-reverse">
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
                  <div className="mt-2">
                    <h3 className="font-[400]">ticket</h3>
                    {value?.type_places?.map((value, index: number) => (
                      <span key={index}>
                        {value?.nom} :<strong> {value?.prix} Ar </strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="right w-[40%] flex justify-end mr-[-1.8rem] custom-760:w-[100%] custom-760:max-h-fit ">
              <div className="w-[20rem] custom-760:w-full ">
                <Image
                  className="w-full h-full object-cover rounded-lg"
                  src={value?.image}
                  width={1000}
                  height={1000}
                  alt="event"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom mt-6">
        <h3 className="text-[1.3rem] font-MachinaBold ">Type de billets</h3>
        <div className="mt-[1rem] flex gap-[1.5rem]  ">
          <div className="l w-full grid grid-cols-3 custom-900:grid-cols-2 gap-8 custom-760:grid-cols-1 ">
            {typeplace?.map((value: TypePlaceType, index: number) => {
              return (
                <div key={index} className="w-full border-[2px] rounded-lg ">
                  <div>
                    <h3 className=" font-MachinaBold uppercase text-[14px] bg-[#ddd] text-black border-b-[1px] border-[#ddd] p-4">
                      {value?.nom}
                    </h3>
                    <div className="flex justify-between items-center mt-2 border-b-[1px] border-[#ddd] p-4">
                      <p>Prix</p>
                      <strong>{value?.prix} Ar</strong>
                    </div>
                    <div className="flex justify-between items-center mt-2 border-b-[1px] border-[#ddd] p-4">
                      <p>Quantité</p>
                      <div className="flex justify-center items-center gap-4 bg-border py-2 px-3 rounded-sm ">
                        <button onClick={() => decrementQuantity(value.id)}>
                          <Minus />
                        </button>
                        <small className="font-[900]">
                          {cart[value.id] || 0}
                        </small>
                        <button onClick={() => incrementQuantity(value.id)}>
                          <Plus />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 bg-green-200 border-b-[1px] border-[#ddd] p-4">
                    <p>Total</p>

                    <span className="font-[900] flex items-center gap-2">
                      <p className="text-red-500">
                        {cart[value.id] || 1} billet(s) =
                      </p>
                      <strong>{(cart[value.id] || 1) * value.prix} Ar</strong>
                    </span>
                  </div>
                  {!cart.hasOwnProperty(value.id) || cart[value.id] === 0 ? (
                    <div className="p-2">
                      <Button className="mt-3 flex items-center gap-2 bg-gray-300 cursor-not-allowed hover:bg-gray-300 text-black ">
                        <CircleFadingPlus /> Ajouter au panier
                      </Button>
                    </div>
                  ) : (
                    <div className="p-2">
                      <Button
                        className="mt-3 flex items-center gap-2"
                        onClick={() =>
                          addCart(
                            value.id,
                            value?.event_id,
                            value?.nom,
                            value?.prix
                          )
                        }>
                        <CircleFadingPlus /> Ajouter au panier
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
