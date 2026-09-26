import puppeteer from "puppeteer-core";
import path from "path";
import { fileURLToPath } from "url";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\e0466e18-6693-47e9-aaa6-b43cacea47b1";
const BASE_URL = "http://localhost:3000";

const pages = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "reviews", path: "/reviews" },
  { name: "book", path: "/book" },
];

const sizes = [
  { label: "desktop", width: 1440, height: 900, mobile: false },
  { label: "mobile", width: 390, height: 844, mobile: true },
];

(async () => {
  console.log("Launching Edge for screenshots...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  for (const size of sizes) {
    const page = await browser.newPage();
    await page.setViewport({
      width: size.width,
      height: size.height,
      deviceScaleFactor: size.mobile ? 2 : 1,
      isMobile: size.mobile,
    });

    for (const route of pages) {
      const url = BASE_URL + route.path;
      console.log(`Capturing ${size.label} - ${route.name}: ${url}`);
      await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 }).catch(() => {
        // fallback if networkidle0 times out
        return page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      });

      // Extra wait for animations and images
      await new Promise((r) => setTimeout(r, 2000));

      const outPath = path.join(ARTIFACT_DIR, `screenshot-${route.name}-${size.label}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  Saved: ${outPath}`);
    }

    await page.close();
  }

  await browser.close();
  console.log("All screenshots done!");
})().catch((err) => {
  console.error("Screenshot error:", err.message);
  process.exit(1);
});
