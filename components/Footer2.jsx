import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import Link from "next/link";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  WhatsappIcon,
  WhatsappShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  LinkedinIcon,
  TwitterIcon,
  TelegramIcon,
} from "react-share";

const Footer2 = () => {
  return (
    <>
      <Box borderTop={"1.7px solid " + ThemeColors.lightColor}>
        <Flex
          direction={{ base: "column", md: "column", xl: "row" }}
          justifyContent={{ base: "center", md: "center", xl: "none" }}
        >
          <Box padding={{ base: "0.5rem 0", md: "0.5rem 0", xl: "1rem 2rem" }}>
            <Text
              fontSize="md"
              display={"flex"}
              justifyContent={{ base: "center", md: "center", xl: "none" }}
            >
              &copy; {new Date().getFullYear()}
              <Text
                color={ThemeColors.primaryColor}
                margin={"0 0.3rem"}
                fontSize="lg"
                textTransform={"uppercase"}
              >
                yookatale
              </Text>{" "}
              <span style={{ margin: "0.1rem 0 0 0" }}>
                All rights reserved
              </span>
            </Text>
          </Box>
          <Spacer display={{ base: "none", md: "none", xl: "block" }} />
          <Box padding={{base: "o.5rem 0", md:"0.5rem 0", xl: "none"}}>
          <Flex
          direction={{ base: "column", md: "column", xl: "row" }}
          justifyContent={{ base: "center", md: "center", xl: "none" }}
        >
            <FacebookShareButton url={"https://www.yookatale.com"}>
              <FacebookIcon size={30}/>
            </FacebookShareButton >
            <WhatsappShareButton url={"https://www.yookatale.com"}>
              <WhatsappIcon size={30}/>
            </WhatsappShareButton>
            <InstapaperShareButton url={"https://www.yookatale.com"}>
              <InstapaperIcon size={30}/>
            </InstapaperShareButton>
            <LinkedinShareButton url={"https://www.yookatale.com"}>
              <LinkedinIcon size={30}/>
            </LinkedinShareButton>
            <TwitterShareButton url={"https://www.yookatale.com"}>
              <TwitterIcon size={30}/>
            </TwitterShareButton>
            <TelegramShareButton url={"https://www.yookatale.com"}>
              <TelegramIcon size={30}/>
            </TelegramShareButton>
            </Flex>
          </Box>
          <Spacer display={{ base: "none", md: "none", xl: "block" }} />
          <Box padding={{ base: "0", md: "0", xl: "1rem 0" }}>
            <Flex justifyContent={{ base: "center", md: "center", xl: "none" }}>
              <Link href={"/faqs"}>
                <Box padding={{ base: "1rem", md: "1rem", xl: "0 1rem" }}>
                  <Text fontSize={"md"}>Faqs</Text>
                </Box>
              </Link>
              <Link href={"/privacy"}>
                <Box padding={{ base: "1rem", md: "1rem", xl: "0 1rem" }}>
                  <Text fontSize={"md"}>Privacy Policies</Text>
                </Box>
              </Link>
              <Link href={"/usage"}>
                <Box padding={{ base: "1rem", md: "1rem", xl: "0 1rem" }}>
                  <Text fontSize={"md"}>Usage Policy</Text>
                </Box>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Footer2;
