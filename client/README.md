
![SimpliTrac Logo](https://dave-b-b.github.io/simplitrac_frontend/assets/simplitrac-Bu0G2zUg.webp)

# 📊 SimpliTrac Capstone Project - Front End Repository
**_Simplicity in Finance Tracking_**

This repository hosts the frontend of the SimpliTrac project, while the backend remains private.

## 👥 Team

- 🚀 **Paul An** - Product Manager / Business Intelligence Lead [@anpaulan](https://github.com/anpaulan)
- 💻 **Dave Brown** - Technical Lead [@dave-b-b](https://github.com/dave-b-b)
- 🔍 **Patrick Snoop** - UX, Testing, and QA Lead [@Patsnoop](https://github.com/Patsnoop)
- 🤖 **Eddie Diaz** - OCR & AI Lead / Flex Contributor [@EdDiazGRS](https://github.com/EdDiazGRS)
- 📚 **Kirn Kim** - Documentation and Presentation Lead [@squrki](https://github.com/squrki)

## 🛠️ Tech Stack

- **📄 GitHub Pages**: Hosting platform
- **⚛️ React**: Frontend framework
- **🎨 Bootstrap**: Responsive design CSS framework
- **📝 Hook Form**: Form state and validation library
- **🔥 Firebase**: Authentication and database backend as a service
- **🔐 Google Auth**: User login authentication provider
- **📱 Device Detect**: Device type detection library
- **📊 Looker Studio**: Data visualization and reporting tool
- **🧪 Act**: GitHub Actions testing library

## 🏃‍♂️ Run Locally

### 1. Clone the project

```bash
git clone https://github.com/dave-b-b/simplitrac_frontend.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a \`.env\` file in the root folder (\`simplitrac_frontend\`) and add your Firestore key.

### 4. Start the development server

```bash
npm run dev
```

Open the link in the terminal to view the project in your browser.

## 💻 Writing Code in Development

When writing code in development, ensure your IDE and web browser are open simultaneously. Changes in the IDE should reflect immediately in the browser. If something breaks, use \`CTRL/CMD + Z\` to undo the last change.

## 🚀 Deployment 🚀
1. First you need to set up a local GitHub actions runner. You can follow the instructions [here]("https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners").
2. Once your runner is set up, you need to install 'act' so that you can test the GitHub actions locally.

    - Mac
      - `brew install act` 
        ❗️ (If you nave a local runner on Mac, you'll need to add the following to your PATH for it to work: `export PATH="/usr/local/opt/gnu-tar/libexec/gnubin:$PATH"`) ❗️
    - Windows
        - `choco install act-cli`
    - Linux (using snap)
      - `sudo snap install act`

3. Run `act --version` to make sure you have it install correctly.
4. Then run `npm run test-runner` to run all your workflows to test them. 

Once this is running correctly, any time you merge code to main, your code will automatically deploy to GitHub pages. 🎉
## 🎨 Color Reference

| **Element**              | **Color**                                                         | **Hex**                              |
|--------------------------|-------------------------------------------------------------------|--------------------------------------|
| Background Color          | ![#247ba0ff](https://via.placeholder.com/10/247ba0ff?text=+)      | \`#247ba0ff\`                          |
| Button Color (Hover)      | ![#90a054ff](https://via.placeholder.com/10/90a054ff?text=+)      | \`#90a054ff\`                          |
| Landing Page Text         | ![#c3b299ff](https://via.placeholder.com/10/c3b299ff?text=+)      | \`#c3b299ff\`                          |
| Button Color              | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+)          | \`#ffffff\`                            |

## 🖼️ Application in Motion

### Landing Page

![Landing Page](https://github.com/dave-b-b/simplitrac_frontend/blob/main/docs/pictures/simpli_home.png)

### Login Page

![Login Page](https://github.com/dave-b-b/simplitrac_frontend/blob/main/docs/pictures/login_page.png)

### Home Page

![Home Page](https://github.com/dave-b-b/simplitrac_frontend/blob/main/docs/pictures/landing_page.png)

### Camera Function

![Camera Function](https://github.com/dave-b-b/simplitrac_frontend/blob/main/docs/pictures/receipt_picture.png)

### Extracted Data

![Extracted Data](https://github.com/dave-b-b/simplitrac_frontend/blob/main/docs/pictures/extracted_data.png)

### Pie Chart

![Pie Chart](https://github.com/dave-b-b/simplitrac_frontend/blob/main/docs/pictures/pie_chart.png)
