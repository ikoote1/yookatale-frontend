import {
  insertMessage,
  sendSMS,
  sendTwitterDirectMessage,
  sendWhatsAppMessage,
} from "@lib/invite/utils";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const invitation_message = `Hey, I am using YooKatale 
Forget about going to the market. 
Enjoy low cost discounted products 
And never miss A meal with
Your friends and family.

Join here https://www.yookatale.com/contact
YooKatale, Here for you.`;

const handleApiResponse = (api_response) => {
  if (Number(api_response.status) !== 200)
    return {
      status: api_response.status,
      error: api_response.data
    };
  return api_response;
};

export async function POST(request, { params }) {
  const { channel } = params;
  let body = {}, response = {}, sendMessage = (recipient, message, message_id) => {};
  try {
    body = await request.json();
    if (!body.recipient) {
      response = {
        status: 400,
        error: "Recipient property is required",
      };
      throw new Error(response.error);
    }
    switch (channel.toLowerCase()) {
      case "whatsapp":
        sendMessage = sendWhatsAppMessage;
        break;
      case "sms":
        sendMessage = sendSMS;
        break;
      case "twitter":
        sendMessage = sendTwitterDirectMessage;
        break;
      default:
        response = {
          error: "Invalid channel provided",
          status: 400,
        };
        throw new Error(response.error);
    }
    const message_id = `${channel}-${uuidv4()}`;
    response = handleApiResponse(
      await sendMessage(body.recipient, invitation_message, message_id)
    );
    const insert = await insertMessage(message_id, invitation_message, body.recipient, channel)
    console.log(insert)
  } catch (e) {
    console.error(`Error:-`, e);
    if (!response.error || Object.keys(response).length < 1)
      response = {
        status: 500,
        error: e.message,
      };
    return NextResponse.json(response, { status: response.status });
  }

  return NextResponse.json(response, { status: response.status });
}
