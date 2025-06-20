import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Register languages
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);

// Code Samples
const codeSamples = {
  js: `import { LNSClient } from 'lisk-name-service';

const lns = new LNSClient('your-api-key');

const result = await lns.resolve('wiseman');
console.log(result);`,
  python: `from lisk_name_service import LNSClient

lns = LNSClient(api_key="your-api-key")
result = lns.resolve("wiseman")
print(result)`,
} as const;

type LanguageOption = keyof typeof codeSamples;

export const SDK = () => {
  const [language, setLanguage] = useState<LanguageOption>("js");

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center justify-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
        SDK Usage
      </h2>

      <div className="flex flex-col md:flex-row gap-12 w-full max-w-6xl items-start justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            The <code className="bg-zinc-800 px-2 py-1 rounded text-green-400">resolve()</code> function
            allows developers to:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Fetch the wallet address associated with any <code>.lisk</code> name.</li>
            <li>Integrate name resolution seamlessly into dApps, wallets, and explorers.</li>
          </ul>
          <p className="text-sm text-zinc-500 italic">
            You only need an API key to start resolving names with a few lines of code.
          </p>
        </div>

        {/* Right Code Box */}
        <div className="md:w-1/2 w-full">
          <div className="mb-4 flex gap-4">
            {(["js", "python"] as LanguageOption[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-md font-semibold text-sm ${
                  language === lang
                    ? "bg-green-500 text-white"
                    : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                }`}
              >
                {lang === "js" ? "JavaScript / TypeScript" : "Python"}
              </button>
            ))}
          </div>

          <div className="w-full rounded-xl overflow-hidden shadow-xl border border-zinc-700 bg-zinc-900">
            <SyntaxHighlighter
              language={language === "js" ? "javascript" : "python"}
              style={atomOneDark}
              showLineNumbers
              customStyle={{
                padding: "2rem",
                fontSize: "1rem",
                background: "#0f0f0f",
              }}
            >
              {codeSamples[language]}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </section>
  );
};
