import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TerminalProps {
  output: string;
}

type Command = (args: string[]) => void;

interface Commands {
  [key: string]: Command;
}

const Terminal: React.FC<TerminalProps> = ({ output }) => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<string>('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback((): void => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  const focusInput = useCallback((): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addToHistory = useCallback((line: string): void => {
    setHistory(prev => [...prev, line]);
  }, []);

  const handleCommand = useCallback((command: string): void => {
    const commands: Commands = {
      clear: () => setHistory([]),
      cls: () => setHistory([]),
      github: () => window.open('https://github.com/pratapsingh9', '_blank'),
      creator: () => window.open('https://github.com/pratapsingh9', '_blank'),
      help: () => {
        addToHistory('Available commands:');
        addToHistory('  github - Open creator\'s GitHub profile');
        addToHistory('  clear/cls - Clear the terminal');
        addToHistory('  help - Show this help message');
        addToHistory('  echo <message> - Print a message');
        addToHistory('  date - Show current date and time');
      },
      echo: (args: string[]) => addToHistory(args.join(' ')),
      date: () => addToHistory(new Date().toLocaleString()),
      hi:() => {
        addToHistory("HI MYSELF VIRTUAL TERMINAL CREATED BY PRATAP ANY HELP I CAN DO TO YOU")
      }
    };

    const [cmd, ...args] = command.split(' ');
    if (cmd in commands) {
      commands[cmd](args);
    } else {
      addToHistory(`Command not found: ${cmd}`);
    }
  }, [addToHistory]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      const trimmedLine = currentLine.trim();
      addToHistory(`$ ${trimmedLine}`);
      if (trimmedLine) {
        handleCommand(trimmedLine);
      }
      setCurrentLine('');
    }
  }, [currentLine, addToHistory, handleCommand]);

  useEffect(() => {
    addToHistory('Welcome to the Modern Web IDE Terminal');
    addToHistory('Type "help" for available commands');
  }, [addToHistory]);

  useEffect(() => {
    if (output) {
      output.split('\n').forEach(line => {
        if (line.trim() !== '') {
          addToHistory(line);
        }
      });
    }
  }, [output, addToHistory]);

  useEffect(scrollToBottom, [history, scrollToBottom]);
  useEffect(focusInput, [focusInput]);

  return (
    <div
      className="bg-black text-white font-mono p-4 rounded-lg shadow-lg"
      style={{ height: '400px', overflowY: 'auto', border: 'none' }} // Removed border
      onClick={focusInput}
      ref={terminalRef}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" title="Close"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" title="Minimize"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" title="Maximize"></div>
        </div>
      </div>
      <div className="terminal-content">
        {history.map((line, index) => (
          <div key={index} className="mb-1">
            {line}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-500 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentLine}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentLine(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-black outline-none flex-grow text-white caret-white"
            placeholder="Type your command here..."
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
