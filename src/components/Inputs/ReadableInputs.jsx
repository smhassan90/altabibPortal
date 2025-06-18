import React from "react";

export const ReadOnlyInputWithLabel = ({ label, value }) => {
  return (
    <div className="flex flex-col animate-fade-in-up">
      <label className="text-small 2xl:text-medium text-text mb-1">
        {label}
      </label>
      <input
        type="text"
        readOnly
        value={value || "Not Found"}
        className="bg-background border border-border rounded px-3 h-[40px] text-small focus:outline-none hover:border-orange-400 focus:border-Tertiary"
      />
    </div>
  );
};

export const ReadOnlyTextAreaWithLabel = ({ label, value }) => {
  return (
    <div className="flex flex-col animate-fade-in-up">
      <label className="text-small 2xl:text-medium text-text mb-1">
        {label}
      </label>
      <textarea
        type="text"
        readOnly
        value={value || "Not Found"}
        className="bg-background border border-border rounded-medium px-3 py-2 min-h-[70px] text-small focus:outline-none hover:border-orange-400 focus:border-Tertiary"
      />
    </div>
  );
};

export const ReadOnlyMapingWithLabel = ({ label, value }) => {
  return (
    <div className="flex flex-col animate-fade-in-up">
      <label className="text-small 2xl:text-medium text-text mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-ratio2">
        {value.map((val,index) => (
          <input
            type="text"
            readOnly
            value={val.name || "Not Found"}
            className="bg-background border border-border rounded px-3 h-[40px] text-small focus:outline-none hover:border-orange-400 focus:border-Tertiary"
          />
        ))}
      </div>
    </div>
  );
};
