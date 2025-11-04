#!/bin/bash

# =========================
#  Vite + React + Tailwind Setup Script
#  Author: Ranjit Dey (Final Fixed Version)
# =========================

# 🎨 Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
RED='\033[0;31m'
NC='\033[0m' # No color

# -------------------------
# 🌀 Animated Progress Bar
# -------------------------
show_progress() {
  local pid=$1
  local delay=0.1
  local spin=('▱▱▱▱▱▱▱▱▱▱' '▰▱▱▱▱▱▱▱▱▱' '▰▰▱▱▱▱▱▱▱▱' '▰▰▰▱▱▱▱▱▱▱' '▰▰▰▰▱▱▱▱▱▱' '▰▰▰▰▰▱▱▱▱▱' '▰▰▰▰▰▰▱▱▱▱' '▰▰▰▰▰▰▰▱▱▱' '▰▰▰▰▰▰▰▰▱▱' '▰▰▰▰▰▰▰▰▰▱' '▰▰▰▰▰▰▰▰▰▰')
  local i=0
  while ps -p $pid >/dev/null 2>&1; do
    printf "\r${YELLOW}${spin[$i]}${NC}"
    i=$(( (i+1) % 11 ))
    sleep $delay
  done
  wait $pid
  local exit_code=$?
  if [ $exit_code -eq 0 ]; then
    printf "\r${GREEN}▰▰▰▰▰▰▰▰▰▰ Done!${NC}\n"
  else
    printf "\r${RED}❌ Failed!${NC}\n"
    exit 1
  fi
}

# -------------------------
# ⚙️ Pre-Checks
# -------------------------
clear
echo -e "${YELLOW}🚀 Starting Vite + React + Tailwind Setup...${NC}"
echo ""

# Check Node & npm
if ! command -v npm >/dev/null; then
  echo -e "${RED}❌ npm not found. Please install Node.js first.${NC}"
  exit 1
fi

# Check VS Code CLI
if command -v code >/dev/null; then
  HAS_CODE=true
else
  HAS_CODE=false
fi

# -------------------------
# 📁 Ask for Project Folder
# -------------------------
read -p "Enter your project folder name: " folder
if [ -z "$folder" ]; then
  echo -e "${RED}❌ Folder name cannot be empty.${NC}"
  exit 1
fi

# -------------------------
# 🧩 Create Vite Project
# -------------------------
echo -e "${BLUE}Creating Vite project...${NC}"
(npm create vite@latest "$folder" -- --template react -y >/dev/null 2>&1) &
show_progress $!

cd "$folder" || { echo -e "${RED}❌ Failed to enter folder.${NC}"; exit 1; }

# -------------------------
# 📦 Install Tailwind CSS
# -------------------------
echo -e "\n${BLUE}Installing Tailwind CSS and Vite plugin...${NC}"
(npm install tailwindcss @tailwindcss/vite >/dev/null 2>&1) &
show_progress $!

# -------------------------
# ⚙️ Configure vite.config.js
# -------------------------
echo -e "\n${BLUE}Configuring vite.config.js...${NC}"
(
cat > vite.config.js <<'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
EOF
) &
show_progress $!

# -------------------------
# 💅 Add Tailwind import
# -------------------------
echo -e "\n${BLUE}Adding Tailwind import to index.css...${NC}"
(
cat > src/index.css <<'EOF'
@import "tailwindcss";
EOF
) &
show_progress $!

# -------------------------
# 🧠 Update App.jsx
# -------------------------
echo -e "\n${BLUE}Updating App.jsx...${NC}"
(
cat > src/App.jsx <<'EOF'
import React from 'react'

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
EOF
) &
show_progress $!

# -------------------------
# 💻 Smart VS Code Handling
# -------------------------
if [ "$HAS_CODE" = true ]; then
  echo -e "\n${BLUE}Opening project in VS Code...${NC}"

  if [ "$TERM_PROGRAM" = "vscode" ]; then
    # 🧩 Inside VS Code terminal → only open App.jsx in the same window
    (
      cd "$PWD"
      code -r src/App.jsx >/dev/null 2>&1
    ) &
    show_progress $!
  else
    # 🧭 Normal terminal → open folder and then App.jsx in new window
    (
      code "$PWD" >/dev/null 2>&1
      sleep 1
      code -r src/App.jsx >/dev/null 2>&1
    ) &
    show_progress $!
  fi

else
  echo -e "${YELLOW}⚠️ VS Code command not found. Open the folder manually if needed.${NC}"
fi

# -------------------------
# 🚀 Finish
# -------------------------
echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "${GREEN}✅ Project folder: ${folder}${NC}"
echo -e "${YELLOW}🚀 Ready to start development!${NC}\n"

# -------------------------
# 🧭 Start Dev Server Option
# -------------------------
read -p "Do you want to start the development server now? (y/n): " start
if [[ $start == [Yy]* ]]; then
  if [ "$HAS_CODE" = false ]; then
    echo -e "${YELLOW}⚠️ VS Code not found — starting server directly.${NC}"
  fi
  echo -e "\n${GREEN}Starting development server...${NC}"
  npm run dev
else
  echo -e "${YELLOW}You can run 'npm run dev' later inside the project folder.${NC}"
fi
