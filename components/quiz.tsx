"use client";

import { useState, useEffect } from "react";

interface Option {
  key: string;
  en: string;
  mn: string;
}

interface Question {
  id: string;
  category: string;
  question_en: string;
  question_mn: string;
  options: Option[];
  correct: string;
  explanation_mn: string | null;
  explanation_en: string | null;
}

interface UserAnswer {
  questionIndex: number;
  selected: string;
  correct: string;
  isCorrect: boolean;
  question_en: string;
  question_mn: string;
  options: Option[];
  explanation_mn: string | null;
  explanation_en: string | null;
}

interface QuizProps {
  lang: "mn" | "en";
  onExit: () => void;
}

export default function Quiz({ lang, onExit }: QuizProps) {
  const [status, setStatus] = useState<"loading" | "active" | "result">("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [error, setError] = useState("");

  const API = `${process.env.NEXT_PUBLIC_API_URL}/api`

  const fetchQuestions = async () => {
    setStatus("loading");
    setCurrentIndex(0);
    setSelected([]);
    setUserAnswers([]);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/quiz/questions?lang=${lang}&count=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Асуулт татахад алдаа гарлаа");
      const data = await res.json();
      setQuestions(data);
      setStatus("active");
    } catch (e: any) {
      setError(e.message);
      setStatus("loading");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [lang]);

  const currentQ = questions[currentIndex];
  const isSATA = currentQ ? currentQ.correct.includes(",") : false;

  const toggleOption = (key: string) => {
    if (isSATA) {
      setSelected((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    } else {
      setSelected([key]);
    }
  };

  const handleNext = () => {
    if (selected.length === 0) return;

    const correctKeys = currentQ.correct.split(",").map((k) => k.trim()).sort();
    const selectedSorted = [...selected].sort();
    const isCorrect =
      selectedSorted.length === correctKeys.length &&
      selectedSorted.every((k, i) => k === correctKeys[i]);

    const answer: UserAnswer = {
      questionIndex: currentIndex,
      selected: selectedSorted.join(","),
      correct: currentQ.correct,
      isCorrect,
      question_en: currentQ.question_en,
      question_mn: currentQ.question_mn,
      options: currentQ.options,
      explanation_mn: currentQ.explanation_mn,
      explanation_en: currentQ.explanation_en,
    };

    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    setSelected([]);

    if (currentIndex + 1 >= questions.length) {
      setStatus("result");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  // LOADING
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        {error ? (
          <>
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchQuestions}
              className="px-6 py-2 rounded-full bg-[#0e7490] text-white text-sm"
            >
              Дахин оролдох
            </button>
          </>
        ) : (
          <>
            <div className="w-10 h-10 border-4 border-[#0e7490] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#517882] text-sm">Асуултууд татаж байна...</p>
          </>
        )}
      </div>
    );
  }

  // RESULT
  if (status === "result") {
    const score = userAnswers.filter((a) => a.isCorrect).length;
    const total = userAnswers.length;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;
    const wrongAnswers = userAnswers.filter((a) => !a.isCorrect);

    return (
      <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
        <div className="rounded-2xl bg-white border border-[#dce9ec] p-8 text-center shadow-sm">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold mb-4 ${
              passed ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
            }`}
          >
            {pct}%
          </div>
          <h2 className="text-xl font-semibold text-[#0d2b33] mb-1">
            {score}/{total} зөв хариулт
          </h2>
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium mt-1 ${
              passed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
            }`}
          >
            {passed ? "✓ Тэнцлээ" : "✗ Тэнцсэнгүй"}
          </span>
          <p className="text-[#517882] text-sm mt-3">
            {passed
              ? "Сайн байна! Үргэлжлүүлэн бэлдэж байгаарай."
              : "70%-иас дээш оноо авахад тэнцнэ. Дахин оролдоорой."}
          </p>
        </div>

        {wrongAnswers.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#0d2b33] text-base">
              Буруу хариулсан асуултууд ({wrongAnswers.length})
            </h3>
            {wrongAnswers.map((ans, idx) => (
              <div key={idx} className="rounded-xl border border-red-100 bg-white p-5 space-y-3">
                <p className="text-[#0d2b33] text-sm font-semibold leading-snug">
                  {ans.question_en}
                </p>
                {ans.question_mn && (
                  <p className="text-[#517882] text-xs leading-snug -mt-2">
                    {ans.question_mn}
                  </p>
                )}
                <div className="space-y-1.5">
                  {ans.options.map((opt) => {
                    const isCorrectOpt = ans.correct.split(",").map((k) => k.trim()).includes(opt.key);
                    const wasSelected = ans.selected.split(",").map((k) => k.trim()).includes(opt.key);
                    let style = "border border-[#dce9ec] text-[#517882] bg-[#f8fafb]";
                    if (isCorrectOpt) style = "border border-emerald-300 bg-emerald-50 text-emerald-700";
                    else if (wasSelected) style = "border border-red-200 bg-red-50 text-red-600";
                    return (
                      <div key={opt.key} className={`flex gap-2 rounded-lg px-3 py-2.5 text-sm ${style}`}>
                        <span className="font-bold shrink-0">{opt.key}.</span>
                        <span className="leading-snug flex-1">
                          <span className="font-medium">{opt.en}</span>
                          {opt.mn && (
                            <span className="block text-xs mt-0.5 opacity-75">{opt.mn}</span>
                          )}
                        </span>
                        {isCorrectOpt && <span className="ml-auto">✓</span>}
                        {wasSelected && !isCorrectOpt && <span className="ml-auto">✗</span>}
                      </div>
                    );
                  })}
                </div>
                {(ans.explanation_mn || ans.explanation_en) && (
                  <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
                    <span className="font-medium">🧠 </span>
                    {ans.explanation_mn && <span>{ans.explanation_mn}</span>}
                    {ans.explanation_en && (
                      <span className="block text-xs mt-1 opacity-75">{ans.explanation_en}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={fetchQuestions}
            className="flex-1 py-3 rounded-xl bg-[#0e7490] text-white font-medium hover:bg-[#0d6880] transition-colors"
          >
            Дахин шалгах
          </button>
          <button
            onClick={onExit}
            className="flex-1 py-3 rounded-xl border border-[#dce9ec] text-[#517882] font-medium hover:bg-[#f0f7f9] transition-colors"
          >
            Гарах
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE QUIZ
  const progress = (currentIndex / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="text-[#517882] hover:text-[#0d2b33] text-sm flex items-center gap-1"
        >
          ← Гарах
        </button>
        <span className="text-sm text-[#517882]">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="h-2 rounded-full bg-[#dce9ec] overflow-hidden">
        <div
          className="h-full bg-[#0e7490] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="rounded-2xl bg-white border border-[#dce9ec] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#e8f4f7] text-[#0e7490] font-medium capitalize">
            {currentQ.category}
          </span>
          {isSATA && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">
              SATA — олон сонголт
            </span>
          )}
        </div>
        <p className="text-[#0d2b33] font-semibold leading-relaxed text-[15px]">
          {currentQ.question_en}
        </p>
        {currentQ.question_mn && (
          <p className="text-[#517882] text-sm leading-relaxed mt-1">
            {currentQ.question_mn}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {currentQ.options.map((opt) => {
          const isSelected = selected.includes(opt.key);
          return (
            <button
              key={opt.key}
              onClick={() => toggleOption(opt.key)}
              className={`w-full text-left flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm transition-all duration-150 ${
                isSelected
                  ? "border-[#0e7490] bg-[#e8f4f7]"
                  : "border-[#dce9ec] bg-white hover:border-[#0e7490] hover:bg-[#f0f7f9]"
              }`}
            >
              <span
                className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold mt-0.5 ${
                  isSelected
                    ? "border-[#0e7490] bg-[#0e7490] text-white"
                    : "border-[#dce9ec] text-[#517882]"
                }`}
              >
                {opt.key}
              </span>
              <span className="leading-snug">
                <span className="text-[#0d2b33]">{opt.en}</span>
                {opt.mn && (
                  <span className="block text-[#517882] text-xs mt-0.5">{opt.mn}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={selected.length === 0}
        className={`w-full py-3.5 rounded-xl font-medium transition-all ${
          selected.length > 0
            ? "bg-[#0e7490] text-white hover:bg-[#0d6880]"
            : "bg-[#dce9ec] text-[#517882] cursor-not-allowed"
        }`}
      >
        {currentIndex + 1 === questions.length ? "Дуусгах" : "Дараагийн асуулт →"}
      </button>
    </div>
  );
}