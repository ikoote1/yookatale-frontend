import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const INFOBIP_AUTH_TOKEN = Buffer.from(
  `${process.env.INFOBIP_USERNAME}:${process.env.INFOBIP_PASSWORD}`
).toString("base64");

const formatResponse = async (res) => {
  const status = await res.status;
  const data = await res.json();
  console.log(data);
  return {
    status,
    data,
  };
};

const infobip_headers = {
  Authorization: `Basic ${INFOBIP_AUTH_TOKEN}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const sendWhatsAppMessage = async (to, message, message_id) => {
  const res = await fetch(
    `https://${process.env.INFOBIP_BASE_URL}/whatsapp/1/message/text`,
    {
      headers: infobip_headers,
      method: "POST",
      body: JSON.stringify({
        from: process.env.INFOBIP_FROM_PHONE_NUMBER,
        to,
        messageId: message_id,
        content: {
          text: message,
          previewUrl: true,
        },
        callbackData: "Sample callback data",
        notifyUrl: process.env.INFOBIP_CALLBACK_URL,
        urlOptions: {
          shortenUrl: true,
        },
      }),
    }
  );
  return await formatResponse(res);
};

export const sendSMS = async (to, message, message_id) => {
  const res = await fetch(
    `https://${process.env.INFOBIP_BASE_URL}/sms/2/text/advanced`,
    {
      headers: infobip_headers,
      method: "POST",
      body: JSON.stringify({
        bulkId: message_id,
        messages: [
          {
            destinations: [
              {
                to,
              },
            ],
            from: process.env.INFOBIP_SMS_FROM,
            text: message,
          },
        ],
      }),
    }
  );
  return await formatResponse(res);
};

export const sendTwitterDirectMessage = async (to, message, message_id) => {
  // URL Link for twitter endpoint
  const url = "https://api.twitter.com/1.1/direct_messages/events/new.json";
  const OAuth = require("oauth");
  const { promisify } = require("util");
  const oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    process.env.TWITTER_API_KEY,
    process.env.TWITTER_API_SECRET,
    "1.0",
    null,
    "HMAC-SHA1"
  );
  const post = promisify(oauth.post.bind(oauth));
  let res;
  try {
    res = await post(
      url,
      process.env.TWITTER_ACCESS_TOKEN,
      process.env.TWITTER_ACCESS_TOKEN_SECRET,
      JSON.stringify({
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: to },
            message_data: { text: message },
          },
        },
      })
    );
  } catch (e) {
    res = e;
  }
  return {
    status: res.statusCode,
    data: JSON.parse(res.data),
  };
};

export const insertMessage = async (message_id, message, recipient, channel) => {
    if(!['whatsapp', 'sms', 'twitter', 'linkedin'].includes(channel.toLowerCase())) throw new Error(`Insert error: ${channel} not supported`)

    return await prisma.message.create({
        data: {
            message_id,
            message,
            recipient,
            channel,
            date: new Date()
        }
    })

}
