# 💻 _zendev Portfolio

A modern, interactive portfolio website showcasing my journey as a web and game developer. Built with vanilla HTML, CSS, and JavaScript, featuring dynamic GitHub integration and custom particle effects.

🔗 **Live Site:** [imzendev.netlify.app](https://imzendev.netlify.app)

![Portfolio Preview](img/favicon.png)

## ✨ Features

### 🎨 Interactive Design
- **Particle Background System** - Custom-built animated particle network that responds to mouse movement
- **Fade Transitions** - Smooth page transitions for seamless navigation
- **Custom Context Menu** - Right-click menu with quick navigation options
- **Mobile-Responsive** - Fully optimized for all screen sizes with hamburger menu

### 📊 Dynamic GitHub Integration
- **Real-time Stats** - Automatic fetching of commit count and lines of code using Netlify Functions
- **Language Distribution Chart** - Visual breakdown of programming languages across all repositories using Chart.js
- **Auto-caching** - 10-minute cache to optimize API calls

### 🎮 Project Showcases
- **Games Section** - HTML/CSS/JS games including Planet Merge and Combined Games
- **Projects Section** - Web projects like Music Player and Pick A Color
- **Scratch Timeline** - Historical view of early Scratch projects

### 🥚 Easter Eggs
- **Secret Keypad** - Long-press the title to reveal a hidden keypad (mobile/desktop)
- **Code Challenge** - Type "747" anywhere on the page to trigger confetti
- **Toast Notifications** - Celebratory messages when secrets are discovered

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Hosting:** Netlify
- **Backend Functions:** Netlify Serverless Functions
- **APIs:** GitHub REST API via Octokit
- **Visualization:** Chart.js
- **Icons:** DevIcons CDN

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Netlify CLI (for local function testing)

### Installation

1. Clone the repository
```bash
git clone https://github.com/MolnarHangaBorbala/Portfolio.git
cd Portfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
GITHUB_TOKEN=your_github_personal_access_token
```

4. Run locally with Netlify Dev
```bash
netlify dev
```

The site will be available at `http://localhost:8888`

## 📁 Project Structure

```
Portfolio/
├── css/
│   └── indexstyle.css          # Main stylesheet with particle effects, animations
├── html/
│   ├── games.html              # Games showcase page
│   ├── projects.html           # Projects showcase page
│   └── scratch.html            # Scratch projects timeline
├── js/
│   ├── indexscr.js             # Particle system, easter eggs, keypad
│   ├── indscr.js               # Chart rendering, GitHub stats
│   ├── fadeoverlayscr.js       # Page transition effects
│   ├── radialmenuscr.js        # Context menu handler
│   └── sub.js                  # Subpage navigation
├── functions/
│   ├── countLines.js           # Aggregates language stats from repos
│   └── getGitHubStats.js       # Fetches total commits and LOC
├── img/                        # Images and icons
├── font/                       # Custom fonts (JetBrains Mono)
├── cur/                        # Custom cursor files
├── index.html                  # Main landing page
├── netlify.toml                # Netlify configuration
└── package.json                # Dependencies
```

## 🎯 Key Features Explained

### Particle System
The custom particle canvas creates an interactive network visualization:
- Particles move naturally with slight randomness
- Mouse proximity causes repulsion effects
- Connections form between nearby particles
- Fully responsive and performance-optimized
- Configurable colors, count, and behavior

### GitHub Functions
Two serverless functions power the dynamic stats:

**`countLines.js`**
- Fetches all repositories (public + private)
- Aggregates language usage across repos
- Converts bytes to estimated lines of code
- 10-minute caching to respect rate limits

**`getGitHubStats.js`**
- Counts total commits across all repos
- Calculates total lines of code written
- Filters out forked repositories

### Easter Egg System
Hidden interactions for curious visitors:
- Type "747" → confetti burst + toast notification
- Long-press title (3s) → secret keypad appears
- Enter "747" on keypad → same celebration
- ASCII hint: `95 122 101 110 100 101 118 → _zendev`

## 🎨 Customization

### Color Scheme
Edit CSS variables in `indexstyle.css`:
```css
:root {
    --accent: #00c9a7;
    --accent-hover: #00e357;
    --bg: #000;
    --bg-light: #1a1a1a;
    --text: #fff;
    --text-muted: #ccc;
}
```

### Particle Configuration
Modify settings in `indexscr.js`:
```javascript
const config = {
    baseColor: [255, 248, 146],
    particleMin: 40,
    particleMax: 120,
    connectionDistance: 120,
    // ... more options
};
```

## 📈 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices)
- **Optimizations:**
  - API response caching
  - Mobile particle reduction
  - Efficient animation loops
  - Lazy loading where applicable

## 🔒 Environment Variables

Required for GitHub integration:
- `GITHUB_TOKEN` - Personal access token with `repo` scope

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are welcome! Feel free to:
- Open an issue for bugs
- Submit feature requests
- Fork and experiment

Built with 💚 by _zendev | Last updated: 2025

## Future ideas
- Add last commit time to Milestones
- Add 'To top' button to left click menu

# ROBOT
<details>
<summary><h2>🤖 Component Comparison — Cheap vs Expensive Builds</h2></summary>

### **Merged Comparison Table**

| **Component**                           | **Cheap Option**               | **Cheap Price (HUF)**      | **Expensive Option**                 | **Expensive Price (HUF)**        |
| --------------------------------------- | ------------------------------ | --------------------------- | ------------------------------------ | -------------------------------- |
| **Main Controller**                     | Raspberry Pi 4 / SBC           | 30,000 Ft                   | NVIDIA Jetson Orin Nano              | 120,000–150,000 Ft               |
| **Camera**                              | Pi Camera Module 3             | 12,000 Ft                   | OAK-D Lite (depth)                   | 65,000–80,000 Ft                 |
| **Head Servos (2–3)**                   | MG996R / DS3225                | 10,000–15,000 Ft            | Dynamixel AX/MX                      | 80,000–120,000 Ft                |
| **IMU Sensor**                          | MPU-6050                       | 2,000 Ft                    | Bosch 9-axis IMU                     | 12,000 Ft                        |
| **Ultrasonic / Distance Sensor**        | HC-SR04                        | 1,000 Ft                    | Lidar Lite / ToF                     | 20,000–35,000 Ft                 |
| **Torso Structure**                     | Minimal acrylic/aluminium      | 5,000–10,000 Ft             | Full aluminium shell                 | 14,000–24,000 Ft                 |
| **Arm Servos (6–8)**                    | MG996R / DS3225                | 30,000–45,000 Ft            | Dynamixel MX-28 / X-series           | 300,000–500,000 Ft               |
| **Hand / Wrist Servos**                 | SG90 / MG90S x5                | 5,000–8,000 Ft              | Mini Dynamixel / metal-gear          | 40,000–80,000 Ft                 |
| **Leg Servos (8–10)**                   | MG996R / 25kg servos           | 40,000–60,000 Ft            | Dynamixel MX-64 / MX-106             | 600,000–1,200,000 Ft             |
| **Power System**                        | 7.4–12V Li-ion + BMS           | 12,000–20,000 Ft            | High-current Li-ion + smart BMS       | 40,000–60,000 Ft                 |
| **Motor Controller**                    | PCA9685                        | 3,000 Ft                    | Dynamixel controller                 | 30,000–50,000 Ft                 |
| **Cables + Misc Parts**                 | Connectors, brackets, screws   | 5,000–10,000 Ft             | Aluminium brackets, joints           | 20,000–40,000 Ft                 |

---

### 💰 **Total Estimated Cost**

| Build Type | Total (Low) | Total (High) |
|-----------|-------------|--------------|
| **Cheap Build** | **155,000 Ft** | **218,000 Ft** |
| **Expensive Build** | **1,341,000 Ft** | **2,411,000 Ft** |

> *Note: Totals assume minimum and maximum values added from each component category.*

---

## ⭐ Balanced Option
A recommended middle-ground option using **good performance parts without Dynamixels**:

### **Recommended Components**
| Component | Recommended Option | Est. Price (HUF) |
|----------|--------------------|------------------|
| **Main Controller** | Raspberry Pi 5 | ~45,000 Ft |
| **Camera** | Pi Camera Module 3 Wide | ~15,000 Ft |
| **Head Servos** | DS3225 (25kg metal gear) | ~12,000 Ft |
| **IMU** | MPU-6050 or BNO055 | 2,000–10,000 Ft |
| **Distance Sensor** | ToF VL53L0X | ~5,000 Ft |
| **Arms** | DS3225 servos x6–8 | 36,000–48,000 Ft |
| **Hands/Wrists** | MG90S metal gear x5 | ~7,000 Ft |
| **Legs** | DS3225 / 35–40kg servos x8–10 | 60,000–90,000 Ft |
| **Power System** | 3-cell Li-ion pack + BMS | 20,000 Ft |
| **Controller Board** | PCA9685 + Buck converters | 5,000 Ft |
| **Structure** | Aluminium + 3D-printed hybrid | 10,000–20,000 Ft |
| **Misc Parts** | Screws, cables, brackets | 10,000 Ft |

### **Estimated Total: ~230,000–280,000 Ft**

**Why this is recommended:**
- Much stronger servos than the cheap build → better stability  
- A Pi 5 gives strong ML and control capability without Jetson cost  
- Affordable ToF sensor improves distance measurement  
- Structure remains budget-friendly  
- No extreme servo costs like Dynamixels  

Perfect for hobby humanoid robots, walking prototypes, animatronics, or AI-controlled characters.

</details>
