# Invitation System

Location: http://localhost:3000/invite

## Packages Installed
1. oauth: To assist with the generation authentication signature of the Twitter API
2. prisma: ORM to handle the logging of succesful invitations via a SQLite Database
3. google-libphonenumber: Validation of phone numbers for the WhatsApp and Messaging calls


## Challenges
1. Facebook: Developer API access requires an actual company email
2. LinkedIn: Developer API access requires an actual company LinkedIn page
3. Twiiter: Developer API for sending DMs requires activation of atleast the basic package for $100
4. Instagram: Developer API access requires an actual company email

## Resolution Mechanisms applied
1. Facebook/LinkedIn/Instagram: No alternatives found
2. Twitter: Usage of basic paid API with personal keys 
3. WhatsApp: Usage of InfoBip WhatsApp API. Requires sign up on https://www.infobip.com/signup and replacement of keys & prefix used .env file

### Usage
1. InfoBip API
- - Sign up on https://www.infobip.com/signup
- - Replace keys in the .env file with keys found on InfoBip dev portal.
- - Add phone number used on sign up to .env file.

2. Twitter API
- - Use https://tweeterid.com/ to convert a twitter handle to a usable recipient ID on the UI