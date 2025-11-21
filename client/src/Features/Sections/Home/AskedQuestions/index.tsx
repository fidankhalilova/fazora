import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const AskedQuestions = () => {
  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Can I customize the design of a home?",
      answer: "",
    },
    {
      id: 2,
      question: "What is the process for purchasing a home?",
      answer: "",
    },
    {
      id: 3,
      question: "Do you offer fully custom-built homes?",
      answer: "",
    },
    {
      id: 4,
      question: "How long does it take to complete a home?",
      answer:
        "It depends on customization. We'll give you a clear timeline during your consultation.",
    },
  ];

  const toggleCard = (id: number) => {
    setOpenCardId(openCardId === id ? null : id);
  };
  return (
    <div className="my-30">
      <div className="grid grid-cols-2 gap-35">
        <div className="flex flex-col gap-6">
          <div className="bg-white px-3 py-2 font-light text-[#343d41] rounded-4xl w-12">
            Faq
          </div>
          <h1 className="text-[45px] font-light text-[#343d41]">
            Frequently asked questions.
          </h1>
          <p className="text-[20px] font-light text-[#494c4d] w-120">
            Still got questions? Feel free to reach out to our incredible
            support team, 7 days a week.
          </p>
          <button className="bg-[#343d41] text-white px-6 py-3 rounded-full text-sm w-34">
            Contact us
          </button>
        </div>
        <div>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden transition-all duration-300"
              >
                <div
                  className="flex justify-between items-center py-8 px-9 rounded-3xl cursor-pointer"
                  onClick={() => toggleCard(item.id)}
                >
                  <h3 className="text-xl font-medium text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <button
                    className="shrink-0 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(item.id);
                    }}
                  >
                    {openCardId === item.id ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <div
                  className={`transition-all duration-900 ease-in-out ${
                    openCardId === item.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 py-4 px-6 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer ||
                        "More information about this topic will be provided during your consultation."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskedQuestions;
