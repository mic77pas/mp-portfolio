// PLACEHOLDER CONTENT. The two real high-school programs referenced in the
// site spec don't exist in this repo yet — replace every file's `content`
// below with the actual historical source once it's available. Nothing here
// is meant to represent Michael's real high-school work.
const programs = [
  {
    id: "guess-the-number",
    title: "Guess the Number",
    description: "[Add a real description of this program]",
    runnableFile: "guess_the_number.py",
    files: [
      {
        name: "guess_the_number.py",
        language: "python",
        content: `# [PLACEHOLDER] Replace with the actual high school program source.
import random


def main():
    secret = random.randint(1, 100)
    guesses = 0

    print("I'm thinking of a number between 1 and 100.")
    while True:
        guess = int(input("Your guess: "))
        guesses += 1

        if guess < secret:
            print("Too low!")
        elif guess > secret:
            print("Too high!")
        else:
            print(f"You got it in {guesses} guesses!")
            break


if __name__ == "__main__":
    main()
`,
      },
    ],
  },
  {
    id: "mad-libs",
    title: "Mad Libs Generator",
    description: "[Add a real description of this program]",
    runnableFile: "mad_libs.py",
    files: [
      {
        name: "mad_libs.py",
        language: "python",
        content: `# [PLACEHOLDER] Replace with the actual high school program source.
def load_template(path):
    with open(path) as f:
        return f.read()


def main():
    template = load_template("story_template.txt")
    adjective = input("Enter an adjective: ")
    noun = input("Enter a noun: ")
    verb = input("Enter a verb: ")

    story = template.format(adjective=adjective, noun=noun, verb=verb)
    print(story)


if __name__ == "__main__":
    main()
`,
      },
      {
        name: "story_template.txt",
        language: "text",
        content: `[PLACEHOLDER] Replace with the actual story template.

It was a {adjective} morning when the {noun} decided to {verb} across town.
`,
      },
    ],
  },
];

export { programs };
