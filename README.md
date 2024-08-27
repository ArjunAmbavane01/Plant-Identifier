# 🌱 Plant-Identifier
A Next.js application that identifies plants from images using Google Gemini's API, returning the common name, region, scientific name, and description of the plant.

![Plant-Identifier](plant-identifier\screenshots\img1.png)
![Plant-Identifier](plant-identifier\screenshots\img2.png)

## 🚀 Features

- 🌍 Identify plants by uploading a photo.
- 🏷️ Returns the common name, region, and scientific name.
- 📄 Provides a detailed description of the plant.
- 🔥 Powered by Google Gemini's advanced AI capabilities.

## 📦 Installation

1. Clone the repository:
   git clone https://github.com/your-username/plant-identifier.git

2. Navigate to the project directory:
   cd plant-identifier

3. Install dependencies:
   npm install

4. Create a .env.local file in the root directory and add your Google Gemini API key:
   GOOGLE_GEMINI_API_KEY=your-api-key-here

5. Start the development server:
   npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Technologies Used
- Next.js - React framework for server-side rendering.
- Google Gemini - For plant identification.
- Tailwind CSS - For modern, responsive styling.
- Vercel - Deployment platform for Next.js apps.

## 📚 How It Works
1. The user uploads an image of a plant.
2. The app sends the image to Google Gemini's API.
3. The API returns the plant's details (common name, region, scientific name, description).
4. The app displays the information to the user.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
