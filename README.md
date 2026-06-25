# 📧 AI Email Assistant

An intelligent email reply generator powered by **Google Gemini 2.5 Flash AI**, built with **Spring Boot** backend and **React** frontend. Generate professional, casual, or friendly email replies in seconds!

---

## ✨ Features

- 🤖 **AI-Powered Replies** — Uses Google Gemini 2.5 Flash to generate smart email responses
- 🎨 **Tone Selection** — Choose from Professional, Casual, or Friendly tone
- 📋 **One-Click Copy** — Copy generated reply to clipboard instantly
- 🌐 **Gmail Extension** — Inject AI Reply button directly into Gmail compose toolbar
- ⚡ **Fast & Lightweight** — Responses generated in seconds
- 🎯 **Beautiful UI** — Modern dark gradient design with smooth animations

---

## 🛠️ Tech Stack

| Layer             | Technology                  |
| ----------------- | --------------------------- |
| Frontend          | React 18, Vite, Material UI |
| Backend           | Spring Boot 3.4, Java 24    |
| AI                | Google Gemini 2.5 Flash     |
| HTTP Client       | Spring WebFlux (WebClient)  |
| Browser Extension | Chrome Manifest V3          |

---

## 📁 Project Structure

```
AI-email-Assistant/
├── email-writer-sb/          # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/email/writer/
│   │       ├── EmailWriterSbApplication.java
│   │       └── app/
│   │           ├── EmailGeneratorController.java
│   │           ├── EmailGeneratorService.java
│   │           ├── EmailRequest.java
│   │           └── CorsConfig.java
│   ├── src/main/resources/
│   │   └── application.properties        # (not committed — see Configuration)
│   └── pom.xml
│
├── email-writer-ext/         # Chrome Extension (Gmail)
│   ├── content.js
│   ├── content.css
│   └── manifest.json
│
├── src/                      # React Frontend Source
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Java 24+
- Maven 3.9+
- Node.js 18+
- Google Chrome (for extension)

---

### ⚙️ Configuration

1. Inside `email-writer-sb/src/main/resources/`, create a file called `application.properties`:

```properties
spring.application.name=email-writer-sb
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
gemini.api.key=YOUR_GEMINI_API_KEY
```

2. Replace `YOUR_GEMINI_API_KEY` with your actual key.

> ⚠️ Never commit `application.properties` — it is listed in `.gitignore` to keep your key safe.  
> Get your free API key at 👉 https://aistudio.google.com/app/apikey

---

### ▶️ Running the Project

#### Backend

```bash
cd email-writer-sb
mvn spring-boot:run
```

Backend starts on **http://localhost:8080**

#### Frontend

```bash
# from the repo root
npm install
npm run dev
```

Frontend starts on **http://localhost:5173**

> ⚠️ Make sure the backend is running before starting the frontend.

---

## 🌐 API Reference

### Generate Email Reply

```
POST http://localhost:8080/api/email/generate
```

**Request Body:**

```json
{
  "emailContent": "Hi, can you please send me the project proposal?",
  "tone": "professional"
}
```

**Response:**

```
Dear [Name],

Thank you for your email. Please find the project proposal attached...

Best regards,
[Your Name]
```

**Tone Options:** `professional` | `casual` | `friendly` | `""` (no tone)

---

## 🧩 Chrome Extension (Gmail)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer Mode** (top right toggle)
3. Click **"Load unpacked"**
4. Select the `email-writer-ext/` folder
5. Open **https://mail.google.com**
6. Click **Compose** — you'll see the **"AI Reply"** button in the toolbar

> ⚠️ Backend must be running on port 8080 for the extension to work.

---

## 📸 How It Works

```
User pastes email
       ↓
Selects tone (Professional / Casual / Friendly)
       ↓
Clicks "Generate Reply"
       ↓
React sends POST request to Spring Boot
       ↓
Spring Boot builds prompt + calls Gemini 2.5 Flash API
       ↓
Gemini returns AI-generated reply
       ↓
Reply displayed on screen
       ↓
User copies and sends!
```

---

## 👨‍💻 Author

Built with ❤️ using Spring Boot + React + Google Gemini AI

---

## 📄 License

This project is for educational and personal use.
