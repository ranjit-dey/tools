#!/usr/bin/env node

/**
 * =============================================================
 * Vite + React + Tailwind Setup Script  —  Minimal & Smart
 * Author: Ranjit Dey
 * Version: Cleaned Output Formatting & Windows Spawn Fix
 * ✅ Zero dependencies (pure Node.js)
 * =============================================================
 */

import { exec, spawn } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";

// -------------------------------------------------------------
// 🎨 Terminal Color Codes (No external chalk dependency)
// -------------------------------------------------------------
const color = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
};

// -------------------------------------------------------------
// 🔁 Spinner Animation — runs while a command executes
// -------------------------------------------------------------
function spinner(text) {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;

    const interval = setInterval(() => {
        process.stdout.write("\r\x1b[K"); // Clear current line
        process.stdout.write(`${color.yellow}${text} ${frames[i]}${color.reset}`);
        i = (i + 1) % frames.length;
    }, 100);

    return {
        stop(success = true) {
            clearInterval(interval);
            process.stdout.write("\r\x1b[K"); // Clear spinner line before writing final text
            const status = success
            ? `${color.green}✔ Done!${color.reset}`
            : `${color.red}✖ Failed!${color.reset}`;
            process.stdout.write(`${text} ${status}\n`); // One clean final line (with one necessary \n)
        },
    };
}


// -------------------------------------------------------------
// 🧠 Helper Functions
// -------------------------------------------------------------

// Runs a command with spinner feedback
function runCommand(command, message) {
    return new Promise((resolve, reject) => {
        // exec automatically uses { shell: true } for Windows compatibility
        const spin = spinner(message);
        const child = exec(command, { shell: true });

        child.on("close", (code) => {
            spin.stop(code === 0);
            if (code === 0) resolve();
            else reject(new Error(`Command failed: ${command}`));
        });

    });
}

// Prompt user for input
function askQuestion(query) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
        rl.question(color.cyan + query + color.reset, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

// Safe file write with folder creation
function writeFileSafe(filepath, content) {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, content);
}

// Check if a CLI command exists (e.g. node, npm, code)
function checkCommandExists(cmd) {
    return new Promise((resolve) => {
        exec(`${cmd} --version`, (err) => resolve(!err));
    });
}

// -------------------------------------------------------------
// 🚀 Main Setup Flow
// -------------------------------------------------------------
async function main() {
    console.clear();
    console.log(); // Initial blank line
    console.log(`${color.yellow}🚀 Starting Vite + React + Tailwind setup...${color.reset}`);

    // 1️⃣ Check Node.js
    if (!process.version) {
        console.log(`${color.red}❌ Node.js not found. Please install it first.${color.reset}`);
        process.exit(1);
    }

    // 2️⃣ Check npm
    const hasNpm = await checkCommandExists("npm");
    if (!hasNpm) {
        console.log(`${color.red}❌ npm not found. Please install Node.js first.${color.reset}`);
        process.exit(1);
    }

    // 3️⃣ Ask for project folder name
    // Added a leading newline to the question for clean separation from the checks above
    const folder = await askQuestion("\nEnter your project folder name: ");
    if (!folder) {
        console.log(`${color.red}❌ Folder name cannot be empty.${color.reset}`);
        process.exit(1);
    }

    console.log(); // Blank line before starting commands

    // 4️⃣ Create new Vite project
    // Removed the leading '\n' from the message
    await runCommand(`npm create vite@latest ${folder} -- --template react -y`, "Creating Vite + React project...");

    // Move into the project folder
    process.chdir(folder);

    // 5️⃣ Install Tailwind CSS + plugin
    await runCommand(`npm install tailwindcss @tailwindcss/vite`, "Installing Tailwind CSS and Vite plugin...");

    console.log(); // Blank line to separate command status from config status

    // 6️⃣ Configure vite.config.js
    writeFileSafe(
        "vite.config.js",
        `import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'
        import tailwindcss from '@tailwindcss/vite'

        export default defineConfig({
            plugins: [react(), tailwindcss()],
        })
        `
    );
    // Removed leading '\n' from the console.log
    console.log(`${color.green}✅ Configured vite.config.js${color.reset}`);

    // 7️⃣ Add Tailwind import to index.css
    writeFileSafe("src/index.css", `@import "tailwindcss";\n`);
    console.log(`${color.green}✅ Added Tailwind import${color.reset}`);

    // 8️⃣ Update App.jsx with a styled message
    writeFileSafe(
        "src/App.jsx",
        `import React from 'react'

        const App = () => {
            return (
                <>
                <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-6">
                <h1 className="text-5xl/12 font-bold text-gray-400 mb-12">
                <span className="font-mono text-7xl text-yellow-400">&lt;</span>
                Hey 👋, Developer
                <span className="font-mono text-7xl text-green-400">/&gt;</span>
                </h1>
                </div>
                </>
            )
        }

        export default App
        `
    );
    // Removed trailing '\n' from the console.log
    console.log(`${color.green}✅ Updated App.jsx${color.reset}`);
    console.log(); // Blank line after config section

    // 9️⃣ Open project in VS Code (smart detection)
    const hasCode = await checkCommandExists("code");
    const isInVSCode = process.env.TERM_PROGRAM?.toLowerCase().includes("vscode");

    if (hasCode) {
        console.log(`${color.blue}💻 Opening project in VS Code...${color.reset}`);
        if (isInVSCode) {
            exec(`code -r src/App.jsx`);
        } else {
            exec(`code "${process.cwd()}" && sleep 1 && code -r src/App.jsx`);
        }
    } else {
        console.log(`${color.yellow}⚠️ VS Code not found. Open manually if needed.${color.reset}`);
    }

    // 🔟 Ask user to start dev server
    const start = await askQuestion("\nDo you want to start the development server now? (y/n): ");
    if (/^y(es)?$/i.test(start)) {
        console.log();
        console.log(`${color.green}🚀 Starting development server...${color.reset}`);
        console.log();
        // FIX: Added { shell: true } to correctly execute 'npm' on Windows
        const dev = spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });
        dev.on("exit", () => process.exit(0));
    } else {
        console.log();
        console.log(`${color.yellow}You can run 'npm run dev' later inside the project folder.${color.reset}`);
        console.log();
    }
}

// -------------------------------------------------------------
// 🏁 Execute Main Script
// -------------------------------------------------------------
main().catch((err) => {
    console.error(`${color.red}❌ Error: ${err.message}${color.reset}`);
    process.exit(1);
});
