import React, { useState, useRef, useEffect } from "react";
import { EXCIPIENTS } from "@/types";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

interface ExcipientComboboxProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ExcipientCombobox: React.FC<ExcipientComboboxProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // If user typed something but didn't select, keep it
        if (inputValue.trim()) {
          onChange(inputValue.trim());
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue, onChange]);

  const filteredExcipients = EXCIPIENTS.filter((excipient) =>
    excipient.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    onChange(newValue);
  };

  const handleSelect = (excipient: string) => {
    setInputValue(excipient);
    onChange(excipient);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredExcipients.length > 0) {
        handleSelect(filteredExcipients[0]);
      } else if (inputValue.trim()) {
        onChange(inputValue.trim());
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Select or type excipient..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          disabled={disabled}
          tabIndex={-1}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredExcipients.length > 0 ? (
            filteredExcipients.map((excipient) => (
              <button
                key={excipient}
                type="button"
                onClick={() => handleSelect(excipient)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors ${
                  excipient === value ? "bg-accent/50 font-medium" : ""
                }`}
              >
                {excipient}
              </button>
            ))
          ) : inputValue.trim() ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Press Enter to use "{inputValue}"
            </div>
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No excipients found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExcipientCombobox;
