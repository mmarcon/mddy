#MDDY

Write your notes in Markdown, Mddy does the rest.

## What is it

I like Evernote a lot. Unfortunately it has some drawbacks. The best features are only for premium accounts, and I don't wanna buy one. You can't write notes in Markdown, and that sucks because Markdown is the best way to write notes.

For these reasone, I decided to make MDDY. MDDY borrows some features I like from Evernote (tags, presentation mode, clean and simple UI) but at the same time it supports Markdown. Additional benefit: it is open source.

The implementation is still at a very early stage, but there is already something that can be useful.

The idea is that you write all your notes in the `notes` folder with your favorite Markdown editor. Then just run MDDY and all your notes will be available in one place.

## Example

You can see MDDY running on Heroku: [mddy.herokuapp.com](http://mddy.herokuapp.com/). Have a look at the [heroku branch](https://github.com/mmarcon/mddy/tree/heroku) to see the setup to run MDDY and display your notes on Heroku.

## Currently supported features
 * Clean, [bootstrappy](http://getbootstrap.com/) UI
 * Recursively loads notes in `notes` folder
 * View notes
 * View notes in presentation mode
 * Title and Tags via [YAML frontmatter syntax](http://jekyllrb.com/docs/frontmatter/)
 * Action items in notes. Just write `@action:` anywhere where you have an action item, MDDY will recognize it as an action item and auto-tag the note accordingly.
 * Done action item in notes. Just write `@done:` anywhere where you have an action item, MDDY will recognize it as a completed action item and auto-tag the note accordingly.
 * Run `mddy` from any notes folder in your filesystem with the convenient CLI tool.

## Use MDDY

You'll need [Node.js](http://nodejs.org/).

    (max)➜ npm install -g mddy

Then cd into your notes folder and just run

    (max)➜ mddy
    MDDY version: 1.0.1
    Working directory: /Users/mmarcon/Dropbox/notes
    Running at http://192.168.5.105:3000

Optionally you can run MDDY from anywhere and specify the path to your notes folder:

    (max)➜ mddy /path/to/your/notes
    MDDY version: 1.0.1
    Working directory: /path/to/your/notes
    Running at http://192.168.5.105:3000

Open your browser and point it to [http://localhost:3000](http://localhost:3000) and you are good to go.
