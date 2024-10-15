import React, { useState, useEffect, useRef, useCallback } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import "xterm/css/xterm.css";

const Terminal = ({ output }) => {
  const terminalRef = useRef(null);
  const [terminal, setTerminalInstance] = useState(null);

  const openMyGithub = () => {
    window.open("https://github.com/pratapsingh9");
  };

  const initializeTerminal = useCallback(() => {
    const term = new XTerm({
      cursorBlink: true,
      theme: {
        background: "#1e1e1e",
        foreground: "#ffffff",
      },
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 14,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);

    term.open(terminalRef.current);
    fitAddon.fit();
    setTerminalInstance(term);

    term.writeln("Welcome to the Web IDE Terminal");
    term.writeln('Type "help" for available commands');
    term.write("$ ");

    return () => {
      term.dispose();
    };
  }, [setTerminalInstance]);

  useEffect(initializeTerminal, [initializeTerminal]);

  const handleCommand = useCallback(
    (command) => {
      const commands = {
        clear: () => terminal.clear(),
        cls: () => terminal.clear(),
        github: () => openMyGithub(),
        creator: () => openMyGithub(),
        help: () => {
          terminal.writeln("Available commands:");
          terminal.writeln("  github - creator of the website");
          terminal.writeln("  clear - Clear the terminal");
          terminal.writeln("  help - Show this help message");
          terminal.writeln("  echo <message> - Print a message");
          terminal.writeln("  date - Show current date and time");
          setTimeout(() => {
            terminal.clear();
          }, 1000);
        },
        echo: (args) => terminal.writeln(args.join(" ")),
        date: () => terminal.writeln(new Date().toLocaleString()),
      };

      const [cmd, ...args] = command.split(" ");
      if (commands[cmd]) {
        commands[cmd](args);
      } else {
        terminal.writeln(`Command not found: ${cmd}`);
      }
    },
    [terminal]
  );

  useEffect(() => {
    if (!terminal) return;

    const handleInput = (data) => {
      if (data === "\r") {
        const currentLine = terminal.buffer.active
          .getLine(terminal.buffer.active.cursorY)
          .translateToString();
        const input = currentLine
          .slice(currentLine.lastIndexOf("$ ") + 2)
          .trim();

        terminal.write("\r\n");
        if (input) {
          handleCommand(input);
        }
        terminal.write("$ ");
      } else {
        terminal.write(data);
      }
    };

    terminal.onData(handleInput);
  }, [terminal, handleCommand]);

  useEffect(() => {
    const handleResize = () => {
      if (terminal) {
        const fitAddon = terminal.getAddon("FitAddon");
        fitAddon.fit();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [terminal]);

  useEffect(() => {
    if (terminal && output) {
      terminal.writeln(output); // Display the output from the code run
      terminal.write("$ "); // Prompt for next command
    }
  }, [terminal, output]);

  return <div ref={terminalRef} className="w-full h-64" />;
};

export default Terminal;
