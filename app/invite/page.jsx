"use client";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
  Select,
  useToast,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { ThemeColors } from "@constants/constants";
import { useInviteMutation } from "@slices/inviteApiSlice";
import { useState } from "react";

const Contact = () => {
  const [recipient, setRecipient] = useState("");
  const [channel, setChannel] = useState("");

  const setRecipientInputType = (channel) => {
    switch (channel) {
      case "whatsapp":
      case "sms":
        return "number";
      default:
        return "text";
    }
  };

  const setRecipientInputPlaceholder = (channel) => {
    switch (channel) {
      case "whatsapp":
      case "sms":
        return `Enter phone number`;
      default:
        return `Enter recipient's ${channel} ID`;
    }
  };

  const isPhoneNumberInput = ["whatsapp", "sms"].includes(channel);

  const [invite] = useInviteMutation();

  const chakraToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = { recipient };

    try {
      if (isPhoneNumberInput) {
        // Get an instance of `PhoneNumberUtil`.
        const phoneUtil =
          require("google-libphonenumber").PhoneNumberUtil.getInstance();
        // Parse number with country code and keep raw input.
        const number = phoneUtil.parseAndKeepRawInput(`${process.env.NEXT_PUBLIC_INFOBIP_PREFIX}${recipient}`, process.env.NEXT_PUBLIC_INFOBIP_COUNTRY_CODE);
        const isValidPhone = phoneUtil.isValidNumberForRegion(number, process.env.NEXT_PUBLIC_INFOBIP_COUNTRY_CODE);
        if (!isValidPhone) throw new Error("Phone number is invalid");
        data = { recipient: `256${number.getNationalNumber()}` };
      }
      const res = await invite({
        channel,
        data,
      }).unwrap();

      if (res.status == 200) {
        setRecipient("");
        setChannel("");

        chakraToast({
          title: "Success",
          description: `Invitation sent successfully`,
          status: "success",
          duration: 4000,
          isClosable: false,
        });
      }
    } catch (err) {
      let message;
      if (err.message) message = err.message;
      if (err.data && err.data.error && typeof err.data.error === "string")
        message = err.data.error;
      if (err.data && err.data.error.errors)
        message = err.data.error.errors[0].message;
      chakraToast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  return (
    <>
      <Box>
        <Box padding={{ base: "3rem 2rem", md: "3rem", xl: "3rem" }}>
          <Box>
            <Heading as={"h3"} size="md" textAlign={"center"}>
              Invite
            </Heading>
            <Text
              className="secondary-light-font"
              fontSize={"4xl"}
              textAlign={"center"}
            >
              Send invitations
            </Text>
            <Flex>
              <Box
                height={"0.2rem"}
                width={"8rem"}
                margin={"0.5rem auto"}
                background={ThemeColors.primaryColor}
              ></Box>
            </Flex>
          </Box>
          <Box padding={"2rem 0"}>
            <Flex>
              <Box
                margin={"auto"}
                width={{ base: "100%", md: "100%", xl: "60%" }}
              >
                <Box padding={"1rem 0"}>
                  <Text
                    className="secondary-light-font"
                    fontSize={"lg"}
                    textAlign={"center"}
                  >
                    Select a communication channel and enter recipient to send a
                    standardized invite
                  </Text>
                </Box>
                <Box
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <form onSubmit={handleSubmit}>
                    <Grid
                      gridTemplateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(2, 1fr)",
                      }}
                      gridGap={"1rem"}
                    >
                      <Box padding={"0.5rem 0"}>
                        <FormControl>
                          <FormLabel htmlFor="channel">
                            Communication Channel
                          </FormLabel>
                          <Select
                            placeholder="Select channel"
                            onChange={(e) => setChannel(e.target.value)}
                          >
                            <option value="whatsapp">WhatsApp</option>
                            <option value="sms">SMS</option>
                            <option value="twitter">Twitter</option>
                            <option value="linkedin">LinkedIn</option>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box padding={"0.5rem 0"}>
                        <FormControl>
                          <FormLabel htmlFor="name">Recipient</FormLabel>
                          <InputGroup>
                            {isPhoneNumberInput && (
                              <InputLeftAddon children={`${process.env.NEXT_PUBLIC_INFOBIP_PREFIX}`} />
                            )}
                            <Input
                              type={setRecipientInputType(channel)}
                              id="recipient"
                              placeholder={setRecipientInputPlaceholder(
                                channel
                              )}
                              name="recipient"
                              value={recipient}
                              onChange={(e) => setRecipient(e.target.value)}
                            />
                          </InputGroup>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Box padding={"1rem 0"}>
                      <ButtonComponent
                        type={"submit"}
                        text={"Send invite"}
                        pd={false}
                      />
                    </Box>
                  </form>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
