// Canned playback for the terminal simulation (spec section 9: scripted, not
// a real interpreter). Each step is either an "output" line, or an "input"
// prompt that waits for the visitor to type something and press enter. Later
// output steps can reference a captured input with {{key}}, so typed text
// visibly flows into the "program's" output without any real execution.
const scripts = {
  "guess-the-number": [
    { type: "output", text: "I'm thinking of a number between 1 and 100." },
    { type: "input", prompt: "Your guess: ", key: "guess1" },
    { type: "output", text: "Too low!" },
    { type: "input", prompt: "Your guess: ", key: "guess2" },
    { type: "output", text: "Too high!" },
    { type: "input", prompt: "Your guess: ", key: "guess3" },
    { type: "output", text: "You got it in 3 guesses!" },
    { type: "output", text: "[Process finished]" },
  ],
  "mad-libs": [
    { type: "input", prompt: "Enter an adjective: ", key: "adjective" },
    { type: "input", prompt: "Enter a noun: ", key: "noun" },
    { type: "input", prompt: "Enter a verb: ", key: "verb" },
    {
      type: "output",
      text: "It was a {{adjective}} morning when the {{noun}} decided to {{verb}} across town.",
    },
    { type: "output", text: "[Process finished]" },
  ],
};

export { scripts };
