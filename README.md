# ⚡ Vite + React + Tailwind CSS Auto Setup

This repository provides an **automated setup script** for quickly creating a new **Vite + React + Tailwind CSS** project — no manual steps required.
Works seamlessly on **Windows, Linux, and macOS**.

---

## 🧰 Prerequisites

Before you begin, ensure that you have:

-   [Node.js](https://nodejs.org/) installed
    _(Check by running `node -v` and `npm -v`)_

---

## 🚀 Quick Start

You can use **either JavaScript (.js)** or **Shell (.sh)** version of the script depending on your system preference.

---

### 🪟 For Windows | 🐧 For Linux | 🍎 For macOS

1. **Download** the file:
   [`vite-react-tailwind.js`](./vite-react-tailwind.js)

2. **Place** it in the directory where you want to create your new project.

3. **Open your terminal** (PowerShell / CMD / Terminal).

4. **Run the script:**

    ```bash
    node vite-react-tailwind.js
    ```

5. Follow the on-screen prompts.

**Example Output:**

```txt
🚀 Starting Vite + React + Tailwind setup...

Enter your project folder name: my-app

Creating Vite + React project... ✔ Done!
Installing Tailwind CSS and Vite plugin... ✔ Done!

✅ Configured vite.config.js
✅ Added Tailwind import
✅ Updated App.jsx

💻 Opening project in VS Code...

Do you want to start the development server now? (y/n): y
Starting development server...
```

---

## 🐧 For Linux Lovers ❤️

If you prefer **Bash**, you can use the shell version:

1. **Download** [`vite-react-tailwind.sh`](./vite-react-tailwind.sh)

2. **Make it executable:**

    ```bash
    chmod +x vite-react-tailwind.sh
    ```

3. **Run it from anywhere:**

    ```bash
    ./vite-react-tailwind.sh
    ```

---

### 🧩 Example Output

```bash
🚀 Starting Vite + React + Tailwind Setup...

Enter your project folder name: demo
Creating Vite project...
▰▰▰▰▰▰▰▰▰▰ Done!

Installing Tailwind CSS and Vite plugin...
▰▰▰▰▰▰▰▰▰▰ Done!

Configuring vite.config.js...
▰▰▰▰▰▰▰▰▰▰ Done!

Adding Tailwind import to index.css...
▰▰▰▰▰▰▰▰▰▰ Done!

Updating App.jsx...
▰▰▰▰▰▰▰▰▰▰ Done!

Opening project in VS Code...
▰▰▰▰▰▰▰▰▰▰ Done!

✅ Setup complete!
✅ Project folder: demo
🚀 Ready to start development!

Do you want to start the development server now? (y/n): y

Starting development server...

> demo@0.0.0 dev
> vite

  VITE v7.1.12  ready in 736 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## 🧠 Notes

-   You can run this script **from anywhere** as long as you have Node.js and permissions.
-   The script:

    -   Creates a Vite + React project
    -   Installs and configures Tailwind CSS
    -   Updates config files and starter files
    -   Opens your project automatically in **VS Code**
    -   Optionally starts the **Vite dev server**

---

## 💡 Tips

-   To make `.sh` script globally accessible:

    ```bash
    sudo mv vite-react-tailwind.sh /usr/local/bin/vite-setup
    chmod +x /usr/local/bin/vite-setup
    ```

    Then you can simply run:

    ```bash
    vite-setup
    ```

---

## 🧑‍💻 Author

**Ranjit Dey**<br>
Computer Science Student & Developer<br>
✨ Automating the boring parts of setup ✨

<center>Made with ❤️ by ranjit<center>

[visit me](https://ranjitdey.vercel.app)
