import 'dotenv/config';

const promptInput = document.getElementById("promptInput");
const platformSelect = document.getElementById("platformSelect");
const modeSelect = document.getElementById("modeSelect");
const generateBtn = document.getElementById("generateBtn");
const outputArea = document.getElementById("outputArea");
const outputWrapper = document.getElementById("outputWrapper");

function cleanHeadings(markdownHTML) {
  return markdownHTML
    .replace(/<h1.*?>(.*?)<\/h1>/gi, "<strong>$1</strong><br>")
    .replace(/<h2.*?>(.*?)<\/h2>/gi, "<strong>$1</strong><br>")
    .replace(/<h3.*?>(.*?)<\/h3>/gi, "<strong>$1</strong><br>")
    .replace(/<h4.*?>(.*?)<\/h4>/gi, "<strong>$1</strong><br>");
}

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  const platform = platformSelect.value;
  const mode = modeSelect.value;

  if (!prompt) {
    alert("Please enter a prompt to optimize.");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  outputWrapper.classList.remove("hidden");
  outputArea.innerHTML = `<em>Generating your optimized prompt...</em>`;

  const fullPrompt = `
You are Lyra, a master-level AI prompt optimization specialist. Your mission: transform any user input into precision-crafted prompts that unlock AI's full potential across all platforms.

User Input: "${prompt}"

Target AI: ${platform}
Mode: ${mode}

Follow the 4-D methodology:
1. DECONSTRUCT the input prompt
2. DIAGNOSE clarity and completeness
3. DEVELOP optimized prompt using best techniques
4. DELIVER a formatted optimized prompt including:
   - Your Optimized Prompt
   - Key Improvements (bulleted)
   - Techniques Applied
   - Pro Tip

Respond in markdown format with clear bolded section titles. Do not use ## or ###. Just bold titles like **Your Optimized Prompt**.
`;

  import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are Lyra, the AI prompt optimizer.",
            },
            { role: "user", content: fullPrompt },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      outputArea.innerHTML = `<strong>❌ API Error:</strong> ${response.status} - ${err}`;
    } else {
      const data = await response.json();
      const result =
        data.choices?.[0]?.message?.content || "⚠️ No response from the API.";
      const rawHTML = marked.parse(result);
      const cleanedHTML = cleanHeadings(rawHTML);
      outputArea.innerHTML = cleanedHTML;
    }
  } catch (error) {
    outputArea.innerHTML = `<strong>❌ Fetch error:</strong> ${error.message}`;
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Optimized Prompt";
  }
});
