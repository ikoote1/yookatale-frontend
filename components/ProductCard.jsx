"use client";

import { useToast } from "@chakra-ui/react";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartCreateMutation } from "@slices/productsApiSlice";
import { FormatCurr } from "@utils/utils";
import { Button } from "./ui/button";
import { LoaderIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import SignIn from "@app/signin/page";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

const ProductCard = ({ product, userInfo }) => {
  const [addCartApi] = useCartCreateMutation();
  const [SignInStateModal, setSignInStateModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const chakraToast = useToast();

  // function to handle adding product to cart
  const handleAddCart = async (ID, user) => {
    try {
      // set loading to be true
      setLoading((prevState) => (prevState ? false : true));

      const res = await addCartApi({
        productId: ID,
        userId: user,
      }).unwrap();

      if (res?.message)
        return chakraToast({
          title: "Success",
          description: res.message,
          status: "success",
          duration: 5000,
          isClosable: false,
        });
    } catch (err) {
      chakraToast({
        description:
          err.message?.error || err?.data.message || err.error || "Error",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    } finally {
      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));
    }
  };

  // function to listen to add to cart button click
  const handleAddToCartBtnClick = (ID) => {
    // check if user has not logged in
    if (!userInfo) {
      chakraToast({
        title: "Sign In is required",
        description: `You need to sign in to add to cart`,
        status: "error",
        duration: 5000,
        isClosable: false,
      });

      setSignInStateModal((prev) => (prev ? false : true));

      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));

      return;
    }

    handleAddCart(ID, userInfo?._id);
  };

  // function to listen to user successfull login
  const handleListeningToSignIn = (param) => {
    if (param.loggedIn) {
      setSignInStateModal((prev) => (prev ? false : true));
      handleAddCart(product._id, param?.user);
    }
  };

  return (
    <>
      <div className="lg:p-4 py-2 px-4 bg-white hover:shadow-md w-[200px] rounded-md shrink-0">
        <div className="h-[120px] p-[0.3rem]">
          <Link href={`/product?id=${product._id}`}>
            <div className="flex justify-center items-center h-full relative">
              <img
                src={`${product.images[0]}` || `/${product.images[0]}`}
                className="w-auto object-contain h-full"
                alt={product.images}
              />
            </div>
          </Link>
        </div>
        <div className="p-[0.3rem 0]">
          <p className="secondary-light-font text-center text-lg">
            {product.name}
          </p>
          <h3 className={`font-bold text-center text-base text-dark my-2`}>
            {`UGX ${FormatCurr(product.price)}`}
          </h3>
          <div className="py-[0.3rem] flex justify-center">
            <Button
              className="text-white bg-dark hover:bg-transparent hover:text-dark text-base gap-2 rounded-md border-[1.7px] border-dark"
              onClick={() => handleAddToCartBtnClick(product._id)}
            >
              {isLoading ? (
                <LoaderIcon size={20} />
              ) : (
                <ShoppingCart size={20} />
              )}{" "}
              Add To Cart
            </Button>
          </div>
        </div>
      </div>

      {/* // signin / signup form */}
      <div
        className={`fixed top-[10%] lg:left-[30%] left-[5%] lg:right-[30%] right-[5%] bottom-[10%] z-[990] bg-light py-6 rounded-md shadow-md ${
          SignInStateModal
            ? "visible translate-y-0"
            : "invisible translate-y-[150%]"
        }`}
      >
        <div
          className="absolute top-4 right-4"
          onClick={() => setSignInStateModal((prev) => (prev ? false : true))}
        >
          <AiOutlineClose size={30} style={{ cursor: "pointer" }} />
        </div>
        <SignIn redirect={null} callback={handleListeningToSignIn} />
      </div>
    </>
  );
};

export default ProductCard;
