const AdmZip = require('adm-zip')
const convert = require('xml-js')

const zip = new AdmZip('./template-demo.odt')
const zipEntries = zip.getEntries()

let xml

zipEntries.forEach(zipEntry => {
  if (zipEntry.entryName == 'content.xml') {
    xml = zipEntry.getData().toString('utf8')
  }
})

var convOptions = { compact: true }
var result = JSON.parse(convert.xml2json(xml, convOptions))

// Data to swap out
const options = {
  data: {
    firstname: 'Jake',
    lastname: 'Kousholt',
  },
}
// Recursively traverse result and swap in data from options object

const newXML = convert.json2xml(result, convOptions)
console.log(newXML)

// Create tmp.template-demo.odt
// Swap out the content of content.xml with newXML
// Utilize libreOffice Command line Tool to export PDF
