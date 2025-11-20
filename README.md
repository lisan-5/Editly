# Editly - AI Image Editor

Editly is a premium AI-powered image editing application built with Next.js. It allows users to upload images and transform them using natural language instructions, powered by OpenAI's DALL-E 2/3 Edit API.

## Features

*   **AI-Powered Editing**: Describe your changes in plain English.
*   **Premium Design**: Glassmorphism UI with dynamic animated backgrounds.
*   **Secure**: Client-side image processing and secure API handling.
*   **Responsive**: Fully optimized for desktop and mobile.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/editly.git
    cd editly
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Key:**
    *   Create a `.env.local` file in the root directory.
    *   Add your OpenAI API key:
        ```env
        OPENAI_API_KEY=sk-your-api-key-here
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies

*   **Framework**: Next.js 14 (App Router)
*   **Styling**: Vanilla CSS (Variables, Animations, Glassmorphism)
*   **AI Provider**: OpenAI API
*   **Icons**: Lucide React

## License

MIT
