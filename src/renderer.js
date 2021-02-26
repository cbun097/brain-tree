const fs = require('fs')
const marked = require('marked')
const hljs = require('highlight.js')
const { remote } = require('electron')
const { dialog } = remote


function readFile(file) {
  fs.readFile(file, (err, data) => {
    if(err) throw err;
    document.querySelector('.md').innerHTML = marked(data.toString())
    Array.from(document.querySelectorAll('pre code')).forEach(
      block => hljs.highlightBlock(block))
  })
}

const filters = { filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }] }

// user select their MD file
async function openFilePicker() {
  dialog.showOpenDialog(filters, {
    properties: ['openFile', 'openDirectory']
  }).then(result => {
    if(result.filePaths){
      readFile(result.filePaths[0])
    }
  }).catch(err => {
    console.log(err)
  })
}

function close(e) {
  const window = remote.getCurrentWindow()
  window.close()
}

// event to trigger from the DOM
document.querySelector('#close-btn').addEventListener('click', () => {
  close()
})
document.querySelector('#select-file-btn').addEventListener('click', () => {
  openFilePicker()
})
