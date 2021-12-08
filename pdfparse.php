<?php
 
// Include Composer autoloader if not already done.
include 'vendor/autoload.php';
 
/* Parse pdf file and build necessary objects.
$parser = new \Smalot\PdfParser\Parser();
$pdf    = $parser->parseFile('./score.pdf');
 
// Retrieve all details from the pdf file.
$details  = $pdf->getDetails();
 
// Loop over each property to extract values (string or array).
foreach ($details as $property => $value) {
    if (is_array($value)) {
        $value = implode(', ', $value);
    }
    echo $property . ' => ' . $value . "\n";
}

$text = $pdf->getText();
$f = fopen("output.txt", "w");
fwrite($f, $text);
fclose($f);*/

// initiate
$pdf = new \TonchikTm\PdfToHtml\Pdf('./score.pdf', [
    'pdftohtml_path' => 'C:\wamp64\www\test\practice\poppler-0.68.0\bin\pdftohtml', // path to pdftohtml
    'pdfinfo_path' => 'C:\wamp64\www\test\practice\poppler-0.68.0\bin\pdfinfo', // path to pdfinfo
   
    'generate' => [ // settings for generating html
        'singlePage' => false, // we want separate pages
        'imageJpeg' => false, // we want png image
        'ignoreImages' => false, // we need images
        'zoom' => 1.5, // scale pdf
        'noFrames' => false, // we want separate pages
    ],

    'clearAfter' => true, // auto clear output dir (if removeOutputDir==false then output dir will remain)
    'removeOutputDir' => true, // remove output dir
    'outputDir' => "./tmp/", // output dir

    'html' => [ // settings for processing html
        'inlineCss' => true, // replaces css classes to inline css rules
        'inlineImages' => true, // looks for images in html and replaces the src attribute to base64 hash
        'onlyContent' => true, // takes from html body content only
    ]
]);

// example for windows
// $pdf = new \TonchikTm\PdfToHtml\Pdf('test.pdf', [
//     'pdftohtml_path' => '/path/to/poppler/bin/pdftohtml.exe',
//     'pdfinfo_path' => '/path/to/poppler/bin/pdfinfo.exe'
// ]);

// get pdf info
$pdfInfo = $pdf->getInfo();

// get count pages
$countPages = $pdf->countPages();
echo $countPages;

// get content from one page
$contentFirstPage = $pdf->getHtml()->getPage(1);
$f = fopen("output.html", "w");

// get content from all pages and loop for they
foreach ($pdf->getHtml()->getAllPages() as $page) {
   //echo $page . '<br/>';
   fwrite($f, $page);
}

fclose($f);
?>