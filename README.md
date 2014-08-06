#MDDY

Write your notes in Markdown, Mddy does the rest.

## What is it

I like Evernote a lot. Unfortunately it has some drawbacks. The best fetures are only for premium accounts, and I don't wanna buy one. You can't write notes in Markdown, and that sucks because Markdown is the best way to write notes.

For these reasone, I decided to make MDDY. MDDY borrows some features I like from Evernote (tags, presentation mode, clean and simple UI) but at the same time it supports Markdown. Additional benefit: it is open source.

The implementation is still at a very early stage, but there is already something that can be useful.

The idea is that you write all your notes in the `notes` folder with your favorite Markdown editor. Then just run MDDY and all your notes will be available in one place.

## Currently supported features
 * Clean, [bootstrappy](http://getbootstrap.com/) UI
 * Recursively loads notes in `notes` folder
 * View notes
 * View notes in presentation mode
 * Title and Tags via [YAML frontmatter syntax](http://jekyllrb.com/docs/frontmatter/)
 * Action items in notes. Just write `@action:` anywhere where you have an action item, MDDY will do the rest.
 * Run `mddy` from any notes folder in your filesystem with the convenient CLI tool.

## Use MDDY

You'll need [Node.js](http://nodejs.org/).

    ⚡➜ npm install -g http://github.com/mmarcon/mddy/tarball/master

Then cd into your notes folder and just run

    ⚡➜ mddy

Open your browser and point it to [http://localhost:3000](http://localhost:3000) and you are good to go.