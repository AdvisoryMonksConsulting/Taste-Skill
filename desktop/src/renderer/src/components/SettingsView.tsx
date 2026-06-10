import { useState } from "react";
import { Check, ExternalLink, KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { MODEL_OPTIONS, type ModelChoice, type Settings } from "../../../shared/types";

export function SettingsView({
  settings,
  firstRun,
  onSaved,
}: {
  settings: Settings;
  firstRun: boolean;
  onSaved: (next: Settings) => void;
}) {
  const [key, setKey] = useState("");
  const [model, setModelState] = useState<ModelChoice>(settings.model);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  const save = async () => {
    setBusy(true);
    setProblem(null);
    try {
      if (key.trim()) {
        const result = await window.founder.setApiKey(key);
        if (!result.ok) {
          setProblem(result.problem);
          return;
        }
      } else if (!settings.hasKey) {
        setProblem("Paste your API key first — the app can't research without it.");
        return;
      }
      await window.founder.setModel(model);
      const next = await window.founder.getSettings();
      setKey("");
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2500);
      onSaved(next);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          {firstRun ? "Welcome! One thing to set up." : "Settings"}
        </h1>
        <p className="text-neutral-500">
          {firstRun
            ? "This app uses Claude (an AI service by Anthropic) to do the research. It needs your personal access key — you only do this once."
            : "Your access key and research quality settings."}
        </p>
      </header>

      <section className="space-y-3 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 font-semibold">
          <KeyRound className="size-4 text-neutral-500" /> Anthropic API key
        </div>
        <ol className="ml-5 list-decimal space-y-1 text-sm text-neutral-600">
          <li>
            Go to{" "}
            <button
              className="inline-flex cursor-pointer items-center gap-1 font-medium text-blue-700 underline underline-offset-2"
              onClick={() => window.founder.openExternal("https://console.anthropic.com/settings/keys")}
            >
              console.anthropic.com <ExternalLink className="size-3" />
            </button>{" "}
            and sign in (or create a free account).
          </li>
          <li>Click “Create Key”, then copy it.</li>
          <li>Paste it below and press Save.</li>
        </ol>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder={settings.hasKey ? "••••••••  (a key is saved — paste to replace)" : "sk-ant-…"}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-900 focus:outline-none"
          spellCheck={false}
        />
        <p className="flex items-start gap-1.5 text-xs text-neutral-500">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0" />
          {settings.hasKey && settings.keyEncrypted
            ? "Your key is stored encrypted on this computer only. It is never sent anywhere except to Anthropic."
            : "The key is stored on this computer only and is never sent anywhere except to Anthropic."}
        </p>
      </section>

      <section className="space-y-3 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="font-semibold">Research quality</div>
        <div className="space-y-2">
          {MODEL_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors ${
                model === opt.id
                  ? "border-neutral-900 bg-neutral-50"
                  : "border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              <input
                type="radio"
                name="model"
                checked={model === opt.id}
                onChange={() => setModelState(opt.id)}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-medium">{opt.label}</span>
                <span className="block text-xs text-neutral-500">{opt.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      {problem && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {problem}
        </div>
      )}

      <button
        onClick={save}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
      >
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Checking your key…
          </>
        ) : savedFlash ? (
          <>
            <Check className="size-4" /> Saved
          </>
        ) : firstRun ? (
          "Save and start researching"
        ) : (
          "Save settings"
        )}
      </button>
    </div>
  );
}
