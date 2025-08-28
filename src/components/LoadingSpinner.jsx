export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center space-x-2 p-10">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <style>{`
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff4757, #ffa502);
          animation: bounce 0.6s infinite alternate;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          from { transform: translateY(0); opacity: 0.7; }
          to { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
