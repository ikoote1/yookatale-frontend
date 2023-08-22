"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import { DisplayImages, Images, ThemeColors } from "@constants/constants";
import React, { useEffect, useState } from "react";
// import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  useCartCreateMutation,
  useProductGetMutation,
  useProductsCategoryGetMutation,
} from "@slices/productsApiSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ButtonComponent from "@components/Button";
import { ShoppingCart } from "lucide-react";
import { FormatCurr } from "@utils/utils";
import SpecialProducts from "@components/SpecialProducts";
import SignIn from "@app/signin/page";

const Product = () => {
  // get user information stored in the localstorage
  const { userInfo } = useSelector((state) => state.auth);

  // create state to hold fetched Product information
  const [Product, setProduct] = useState({});
  const [SignInStateModal, setSignInStateModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [SimilarProducts, setSimilarProducts] = useState([]);

  const chakraToast = useToast();

  const { push } = useRouter();

  // use the useSearchParam hooks from next/navigation to get url params
  const searchParam = useSearchParams();

  const param = searchParam.get("id");

  // initialize mutation function to fetch product data from database
  const [fetchProduct] = useProductGetMutation();
  const [fetchProductsCategory] = useProductsCategoryGetMutation();
  const [addCartApi] = useCartCreateMutation();

  // function handle fetching data
  const handleDataFetch = async () => {
    const res = await fetchProduct(param).unwrap();

    if (res.status && res.status == "Success") {
      setProduct({ ...res.data });
    }

    handleSimilarProductFetch(res.data.category);
  };

  // function to fetch similar products
  async function handleSimilarProductFetch(category) {
    try {
      const res = await fetchProductsCategory(category).unwrap();

      if (res.status == "Success") {
        setSimilarProducts(res?.data);
      }
    } catch (error) {}
  }

  // fetch product categories
  useEffect(() => {
    handleDataFetch();
  }, []);

  // function to handle adding product to cart
  const handleAddCart = async (ID) => {
    // check if user has not logged in
    if (!userInfo) {
      chakraToast({
        title: "Sign In is required",
        description: `You need to sign in to add to cart`,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
      push("/signin");
      return;
    }

    try {
      const res = await addCartApi({
        productId: ID,
        userId: userInfo?._id,
        quantity,
      });

      if (res.data?.message) {
        chakraToast({
          title: "Success",
          description: res.data?.message,
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      }

      if (res.error) {
        chakraToast({
          title: "Error",
          description: res.error.data?.message,
          status: "error",
          duration: 5000,
          isClosable: false,
        });
      }
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err.message.error || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  //handle increase quantity
  const handleIncreaseQuantity = () => {
    setQuantity((prev, curr) => (curr = prev + 1));
  };

  //handle reduce quantity
  const handleDecreaseQuantity = () => {
    if (quantity !== 1) setQuantity((prev, curr) => (curr = prev - 1));
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
      handleAddCart(Product._id, param?.user);
    }
  };

  return (
    <>
      <Box>
        <Box padding={"0 2rem"}>
          <Box paddingBottom={"1rem"}>
            <Heading as={"h2"} size={"sm"} display={"flex"}>
              Home/product/
              <Heading as={"h2"} size={"sm"} color={ThemeColors.darkColor}>
                {Product?.category ? Product?.category : "category"}
              </Heading>
            </Heading>
          </Box>
          <Box padding={{ base: "1rem 0", md: "1rem 0", xl: "1rem 2rem" }}>
            <Flex
              borderTop={"1.7px solid " + ThemeColors.lightColor}
              direction={{ base: "column", md: "column", xl: "row" }}
            >
              <Box width={{ base: "100%", md: "90%", xl: "45%" }}>
                <Box id="main-product-image" position={"relative"}>
                  <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                  >
                    <Image
                      src={Product?.images ? `${Product?.images[0]}` : ""}
                      style={{
                        width: "auto",
                        height: "100%",
                        margin: "auto",
                      }}
                    />
                  </Flex>
                  <Box padding={"1rem 0"}>
                    <Grid
                      gridTemplateColumns={`repeat(${
                        parseInt(DisplayImages.length)
                          ? parseInt(DisplayImages.length) > 5
                            ? 5
                            : parseInt(DisplayImages.length)
                          : 5
                      }, 1fr)`}
                      gridGap={"1rem"}
                    >
                      {Product?.images
                        ? Product?.images.map((image, index) => (
                            <Flex
                              alignContent={"center"}
                              justifyContent={"center"}
                              height={"100%"}
                              key={index}
                              borderRadius={"0.3rem"}
                              border={"1.7px solid " + ThemeColors.lightColor}
                            >
                              <Image
                                src={image}
                                style={{
                                  height: "auto",
                                  width: "100%",
                                  margin: "auto",
                                }}
                              />
                            </Flex>
                          ))
                        : ""}
                    </Grid>
                  </Box>
                </Box>
              </Box>
              <Box
                width={{ base: "100%", md: "90%", xl: "55%" }}
                padding={{ base: "2rem 0", md: "2rem 0", xl: "2rem" }}
              >
                <Box padding={"1rem 0"}>
                  <Heading as={"h2"} size={"2xl"}>
                    {Product?.name ? Product?.name : "__"}
                  </Heading>
                  <Text
                    margin={"1rem 0 0.5rem 0"}
                    color={ThemeColors.secondaryColor}
                    fontSize={"2xl"}
                  >
                    UGX {FormatCurr(Product?.price ? Product?.price : 0)}
                  </Text>
                  <Text
                    margin={"0.5rem 0"}
                    className="secondary-bold-font"
                    color={ThemeColors.darkColor}
                    fontSize={"lg"}
                  >
                    {Product?.category ? Product?.category : "__"}
                  </Text>
                </Box>
                <Box padding={"1rem 0"}>
                  <Text>
                    {Product?.description ? Product?.description : "__"}
                  </Text>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Flex>
                    <Box paddingRight="1rem">
                      <Flex
                        borderRadius={"0.3rem"}
                        border={"1.7px solid " + ThemeColors.darkColor}
                        padding={"0.3rem"}
                      >
                        <Button
                          background={"none"}
                          padding={"0.3rem"}
                          margin={"0 0.3rem"}
                          onClick={handleIncreaseQuantity}
                        >
                          <AiOutlinePlus size={25} />
                        </Button>
                        <Box
                          padding={"0.3rem"}
                          borderRadius={"0.3rem"}
                          border={"1.7px solid " + ThemeColors.darkColor}
                          width={"3rem"}
                        >
                          <Text fontSize={"md"}>{quantity}</Text>
                        </Box>
                        <Button
                          background={"none"}
                          padding={"0.3rem"}
                          margin={"0 0.3rem"}
                          onClick={handleDecreaseQuantity}
                        >
                          <AiOutlineMinus size={25} />
                        </Button>
                      </Flex>
                    </Box>

                    <div className="py-[0.3rem] px-4">
                      <div
                        onClick={() =>
                          handleAddToCartBtnClick(
                            Product?._id ? Product?._id : ""
                          )
                        }
                      >
                        <ButtonComponent
                          text={"Add To Cart"}
                          type={"button"}
                          size={"regular"}
                          icon={<ShoppingCart size={20} />}
                        />
                      </div>
                    </div>
                  </Flex>
                </Box>
              </Box>
            </Flex>

            <div className="py-8">
              <div className="">
                {SimilarProducts.length > 0 && (
                  <SpecialProducts
                    Products={SimilarProducts}
                    userInfo={userInfo}
                    text="Similar"
                    category={Product?.category}
                  />
                )}
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
                onClick={() =>
                  setSignInStateModal((prev) => (prev ? false : true))
                }
              >
                <AiOutlineClose size={30} style={{ cursor: "pointer" }} />
              </div>
              <SignIn redirect={null} callback={handleListeningToSignIn} />
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Product;
