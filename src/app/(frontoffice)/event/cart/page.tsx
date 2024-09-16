"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import useCartStore from "@/store/cart";

const Page = () => {
  const {
    cart,
    items,
    incrementQuantity,
    decrementQuantity,
    loadCartFromLocalStorage,
    saveCartToLocalStorage,
    removeItem,
  } = useCartStore();

  useEffect(() => {
    loadCartFromLocalStorage();
  }, [loadCartFromLocalStorage]);

  useEffect(() => {
    saveCartToLocalStorage();
  }, [cart, items, saveCartToLocalStorage]);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + (cart[item.type_place_id] || 0) * item.price,
    0
  );

  return (
    <>
      <div className="px-[6rem] custom-760:px-0 relative bg-[url('/images/hero-bg.jpg')] bg-no-repeat bg-cover bg-center min-h-[25dvh]">
        <div className="px-[6rem] py-[3rem]">
          <h1 className="text-white text-[2rem] font-[900]">Ticket(s) Cart</h1>
          <span className="relative">
            <div className="h-fit w-fit px-[2rem] rotate-[-1deg] bg-primary">
              <h3 className="font-MachinaRegular font-[900] mt-4 rotate-[1deg] text-[1.3rem] text-white">
                Mon panier de billets
              </h3>
            </div>
          </span>
        </div>
      </div>
      <div className="px-[6rem] custom-1080:px-[2rem] py-[3rem] flex gap-8 custom-900:flex-col">
        <div className="w-[65%] custom-900:w-full">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-[2px] custom-760:text-[12px]">
                <th className="font-[600] py-2">Evenement(s)</th>
                <th className="font-[600] py-2">Type</th>
                <th className="font-[600] py-2">Prix</th>
                <th className="font-[600] py-2 custom-550:pl-3">Quantité</th>
                <th className="font-[600] py-2 custom-760:hidden">Total</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index} className="border-b-[2px]">
                  <td className="py-4">
                    <div className="flex gap-4">
                      <div className="w-[6rem] custom-1000:w-[3rem]">
                        <Image
                          className="object-cover"
                          src={item?.image}
                          width={500}
                          height={500}
                          alt="event"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="custom-550:text-[10px] font-[800]">
                          {item?.titre}
                        </h3>
                        <button
                          className="w-fit bg-red-200 text-red-600 py-1 px-4 text-[12px] font-[700] rounded-[7px] custom-760:py-1 custom-760:px-2 custom-760:w-fit"
                          onClick={() => removeItem(item?.type_place_id)}>
                          <span className="custom-760:hidden">Supprimer</span>
                          <Trash className="hidden w-[1rem] custom-760:block" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <small className="custom-550:text-[10px] font-[800]">
                      {item?.nom}
                    </small>
                  </td>
                  <td className="py-4">
                    <small className="custom-550:text-[10px] font-[800]">
                      {item?.price}
                    </small>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-4 custom-550:ml-3 bg-border w-fit py-[.3rem] px-[.5rem]">
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          if ((cart[item?.type_place_id] || 0) > 0) {
                            decrementQuantity(item?.type_place_id);
                          }
                        }}>
                        <Minus className="w-[1rem]" />
                      </span>
                      <span className="text-[12px]">
                        {cart[item?.type_place_id] || 0}
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => incrementQuantity(item?.type_place_id)}>
                        <Plus className="w-[1rem]" />
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <small className="font-[700] custom-760:hidden">
                      {(cart[item?.type_place_id] || 0) * item?.price}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-[35%] custom-900:w-full py-6 px-8 rounded-xl bg-border h-fit flex flex-col gap-4">
          <h3 className="text-[1.3rem] font-[800]">Estimate Shipping</h3>
          <span className="flex justify-between items-center mt-8">
            <p className="text-[1.2rem] custom-1000:text-[1rem]">
              Montant Total
            </p>
            <p className="text-[1.2rem] font-[700] custom-1000:text-[1rem]">
              {subtotal}Ar
            </p>
          </span>
          <span className="flex flex-col gap-2">
            <span>Utilisez votre code promo !</span>
            <Input type="text" name="code-promo" id="code-promo" />
          </span>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <span>
            <Button className="w-full bg-black hover:bg-black">
              Check out
            </Button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Page;
