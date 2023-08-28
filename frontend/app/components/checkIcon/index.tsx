const CheckIcon = () => {
    return (
        <div className="h-6 w-6">
            <svg viewBox="0 0 24 24" fill="none">
                <circle cx={12} cy={12} r={12} fill="#000" opacity="0.2" />
                <path
                d="M7 13l3 3 7-7"
                stroke="green"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
        </div>
    );
  }

export default CheckIcon;