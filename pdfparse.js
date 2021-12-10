const fs = require('fs');
const pdf = require('pdf-parse');
const pdftohtml = require('pdftohtmljs');
const { pipeline } = require('stream');
const puppeteer = require('puppeteer');
const url = `${__dirname}\\sampleoutputblank.html`;
const parseInformationFromPDFData = require("./parser/parseInformationFromPDFData");

const launchPuppeteer = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let goto = await page.goto(url, {
        waitUntil: "networkidle0", // wait till all network requests has been processed
      });
    let data = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('div.pc .c div.h3,div.pc .c div.h4,div.pc .c div.h5,div.pc .c div.h6,div.pc .c div.h7,div.pc .c div.h8,div.pc .c div.h11,div.pc .c div.hd');

        items.forEach((item) => {
            let currentClass = "";
            item.classList.forEach((c) => {
              if(c == "h1" || c == "h2" || c == "h3" || c == "h4" || c == "h5" || c == "h6" || c == "h7" || c == 'h8' || c == 'h11' || c == 'hd')
              {
                currentClass = c;
                return;
              }
            })
            results.push({classes: item.classList, currentClass: currentClass, html: item.innerHTML, value: item.textContent || item.innerText || ""});
        });
        return results;
    })
    browser.close();
    parseInformationFromPDFData(data);
}

launchPuppeteer();
return;
 
/*let dataBuffer = fs.readFileSync('./score.pdf');
 
pdf(dataBuffer).then(function(data) {
 
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    /* PDF metadata
    console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text length
    console.log(data.text.length); 
    // PDF text
    console.log(data.text); *
});
*/
// See presets (ipad, default)
// Feel free to create custom presets
// see https://github.com/fagbokforlaget/pdftohtmljs/blob/master/lib/presets/ipad.js
const convert = async (file, output, preset) => {
  const converter = new pdftohtml(file, output)

  // If you would like to tap into progress then create
  // progress handler
  converter.progress((ret) => {
    const progress = (ret.current * 100.0) / ret.total

    console.log(progress.toFixed(2)+"% \r")
  })

  try {
    // convert() returns promise
    await converter.convert(preset || 'ipad')
    
    await launchPuppeteer();
 
  } catch (err) {
    console.error(`Psst! something went wrong: ${err.msg}`, err)
  }

}

// call method
convert('ScoreSenseBlank.pdf', 'sampleoutputblank.html')


