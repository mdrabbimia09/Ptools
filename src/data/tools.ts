import { Tool } from '../types';

export const tools: Tool[] = [
  // 1. Basic Calculator
  {
    id: 'basic-calculator',
    slug: 'basic-calculator',
    name: 'Basic Calculator',
    category: 'calculators',
    description: 'Perform quick arithmetic calculations including addition, subtraction, multiplication, and division with memory and keyboard support.',
    seoTitle: 'Basic Calculator – Free Online Math Calculator | PTools',
    seoDescription: 'Use our free online basic calculator for quick and accurate everyday arithmetic with keyboard shortcut support and history.',
    keywords: ['calculator', 'basic calculator', 'math calculator', 'online calculator', 'arithmetic'],
    icon: 'Calculator',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Enter numbers using the on-screen keypad or your computer keyboard.',
      'Select the arithmetic operator (+, -, ×, ÷).',
      'Press equals (=) or hit Enter to calculate the final result.',
      'Use the Clear (C) button to reset calculations.'
    ],
    features: [
      'Full keyboard number pad support',
      'Clear decimal handling with exact precision',
      'Running operation display',
      'Instant calculation without page reloads'
    ],
    faqs: [
      {
        question: 'Can I use keyboard shortcuts with this calculator?',
        answer: 'Yes, you can use numeric keys 0-9, standard operators (+, -, *, /), Enter for equals, and Backspace/Escape to clear.'
      },
      {
        question: 'Does this calculator run offline?',
        answer: 'Yes, this calculator runs entirely in your browser memory and requires zero network requests after initial page load.'
      }
    ],
    relatedTools: ['percentage-calculator', 'age-calculator', 'bmi-calculator', 'unit-converter']
  },

  // 2. Percentage Calculator
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'calculators',
    description: 'Calculate percentages, percentage increases, percentage decreases, and differences between two values easily.',
    seoTitle: 'Percentage Calculator – Free Online Percent Calculator | PTools',
    seoDescription: 'Calculate what is X% of Y, percentage increase or decrease, and ratio discounts quickly with PTools.',
    keywords: ['percentage calculator', 'percent of', 'percentage increase', 'discount calculator', 'math'],
    icon: 'Percent',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Select the calculation mode (What is X% of Y, Percentage Increase/Decrease, or What percentage is X of Y).',
      'Input the respective numbers into the fields.',
      'View the calculated result and percentage breakdown instantly.',
      'Copy the calculated answer with one click.'
    ],
    features: [
      'Multi-mode percentage calculation',
      'Instant real-time calculation',
      'Displays formula breakdown for learning',
      'Copy result to clipboard'
    ],
    faqs: [
      {
        question: 'How do I calculate a percentage increase?',
        answer: 'Subtract the original value from the new value, divide by the original value, and multiply by 100.'
      }
    ],
    relatedTools: ['basic-calculator', 'unit-converter', 'age-calculator']
  },

  // 3. Age Calculator
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'calculators',
    description: 'Calculate your exact age in years, months, weeks, days, hours, and minutes based on your date of birth.',
    seoTitle: 'Age Calculator – Exact Age in Years, Months, Days | PTools',
    seoDescription: 'Find your exact chronological age today or at a specific future/past date down to total days, hours and upcoming birthday countdown.',
    keywords: ['age calculator', 'chronological age', 'birthday calculator', 'how old am i', 'days lived'],
    icon: 'Calendar',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Select your birth date using the date selector.',
      'Optionally specify a target calculation date (defaults to today).',
      'Click Calculate to view your age breakdown in years, months, days, and total hours lived.'
    ],
    features: [
      'Accurate leap year calculations',
      'Total days, hours, and minutes lived',
      'Countdown to your next birthday',
      'Day of the week you were born'
    ],
    faqs: [
      {
        question: 'Does the calculator account for leap years?',
        answer: 'Yes, all leap year calendar shifts are mathematically calculated according to the Gregorian calendar.'
      }
    ],
    relatedTools: ['timestamp-converter', 'countdown-timer', 'basic-calculator']
  },

  // 4. BMI Calculator
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'calculators',
    description: 'Calculate Body Mass Index (BMI) using metric or imperial units and determine your WHO weight category.',
    seoTitle: 'BMI Calculator – Body Mass Index Metric & Imperial | PTools',
    seoDescription: 'Calculate Body Mass Index (BMI) online. Supports both Metric (kg/cm) and Imperial (lbs/ft/in) with official WHO health classifications.',
    keywords: ['bmi calculator', 'body mass index', 'healthy weight', 'metric imperial bmi', 'health'],
    icon: 'Activity',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Select your preferred measurement system (Metric or Imperial).',
      'Enter your height and weight.',
      'Click Calculate BMI to view your index and classification.'
    ],
    features: [
      'Metric (kg, cm) and Imperial (lbs, feet/inches) support',
      'Official WHO classification indicators',
      'Healthy weight range recommendation',
      'Privacy-first client-side calculation'
    ],
    faqs: [
      {
        question: 'What is a healthy BMI range?',
        answer: 'According to the World Health Organization, a normal and healthy BMI for adults is between 18.5 and 24.9.'
      }
    ],
    relatedTools: ['unit-converter', 'percentage-calculator', 'basic-calculator']
  },

  // 5. Unit Converter
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Unit Converter',
    category: 'converters',
    description: 'Convert lengths, weights, temperatures, digital storage, volume, and speed between metric and imperial systems.',
    seoTitle: 'Unit Converter – Metric & Imperial Measurement Converter | PTools',
    seoDescription: 'Convert meters to feet, kilograms to pounds, Celsius to Fahrenheit, megabytes to gigabytes and more instantly.',
    keywords: ['unit converter', 'metric to imperial', 'length converter', 'temperature converter', 'weight converter'],
    icon: 'ArrowLeftRight',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Choose a conversion category (Length, Weight, Temperature, Digital Storage, Speed).',
      'Select your starting unit and target unit.',
      'Enter a numeric value to see the converted result immediately.'
    ],
    features: [
      'Covers 5 core unit categories with high precision',
      'Bidirectional unit swap with one button',
      'Formula display explaining conversion ratio',
      'Instant responsive output'
    ],
    faqs: [
      {
        question: 'How accurate are the conversion factors?',
        answer: 'Conversions use official standard NIST and IEEE scientific definitions for precise calculations.'
      }
    ],
    relatedTools: ['basic-calculator', 'percentage-calculator', 'timestamp-converter']
  },

  // 6. Word Counter
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text-tools',
    description: 'Count words, characters, sentences, paragraphs, and estimate reading and speaking time in real time.',
    seoTitle: 'Word Counter – Count Words, Characters & Sentences Online | PTools',
    seoDescription: 'Free online word count tool. Analyze word count, character count with and without spaces, reading time, and sentence counts live.',
    keywords: ['word counter', 'character counter', 'word count', 'reading time', 'text analysis'],
    icon: 'FileText',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Type or paste your text into the text editor.',
      'View real-time statistics update as you type.',
      'Use the Copy or Clear buttons to manage your text.'
    ],
    features: [
      'Instant live character and word count',
      'Spaces included vs spaces excluded character metrics',
      'Estimated reading time (~200 wpm) and speaking time (~130 wpm)',
      'Sentence and paragraph count breakdown'
    ],
    faqs: [
      {
        question: 'Is my text uploaded or stored anywhere?',
        answer: 'No. Everything is analyzed purely in your browser memory. Your text never leaves your device.'
      }
    ],
    relatedTools: ['character-counter', 'text-case-converter', 'text-cleaner', 'remove-duplicate-lines']
  },

  // 7. Character Counter
  {
    id: 'character-counter',
    slug: 'character-counter',
    name: 'Character Counter',
    category: 'text-tools',
    description: 'Track exact character limits for social media platforms such as X (Twitter), LinkedIn, Meta titles, and SMS.',
    seoTitle: 'Character Counter – Text Length & Social Media Limits | PTools',
    seoDescription: 'Inspect character counts with dedicated limit bars for Twitter (280), SMS (160), Meta titles (60), and Meta descriptions (160).',
    keywords: ['character counter', 'twitter character count', 'sms limit', 'meta title length', 'text length'],
    icon: 'Type',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Enter your draft text into the input field.',
      'Check the progress bars against social and SEO limits.',
      'Copy the finalized copy with one click.'
    ],
    features: [
      'Visual progress indicators for standard platform limits',
      'Shows remaining characters count',
      'Whitespace inclusion toggles',
      'One-click clipboard copy'
    ],
    faqs: [
      {
        question: 'What is the character limit on X/Twitter?',
        answer: 'Standard free accounts have a 280-character limit per tweet.'
      }
    ],
    relatedTools: ['word-counter', 'meta-tag-generator', 'text-case-converter']
  },

  // 8. Text Case Converter
  {
    id: 'text-case-converter',
    slug: 'text-case-converter',
    name: 'Text Case Converter',
    category: 'text-tools',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.',
    seoTitle: 'Text Case Converter – Uppercase, Lowercase, Title Case | PTools',
    seoDescription: 'Convert any text into UPPERCASE, lowercase, Capitalized Words, Title Case, camelCase, snake_case, or slug formats instantly.',
    keywords: ['case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'snake case'],
    icon: 'CaseSensitive',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your source text into the input box.',
      'Click the desired case format button (e.g., Title Case, UPPERCASE, camelCase).',
      'Copy the converted result to your clipboard.'
    ],
    features: [
      'Supports 7 different casing formats',
      'Respects acronyms and punctuation where applicable',
      'Instant conversion without reloads',
      'One-click copy & clear'
    ],
    faqs: [
      {
        question: 'What is camelCase used for?',
        answer: 'camelCase is commonly used in programming languages like JavaScript and TypeScript for naming variables and functions.'
      }
    ],
    relatedTools: ['slug-generator', 'word-counter', 'text-cleaner']
  },

  // 9. Remove Duplicate Lines
  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    category: 'text-tools',
    description: 'Clean up lists by removing duplicate lines, sorting alphabetically, and trimming whitespace.',
    seoTitle: 'Remove Duplicate Lines Online – Clean & Deduplicate Lists | PTools',
    seoDescription: 'Easily remove repeated or duplicate rows and lines from lists, text files, and datasets with case-sensitivity options.',
    keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines', 'sort lines', 'text cleaner'],
    icon: 'ListFilter',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your multi-line list into the input box.',
      'Select case-sensitive or case-insensitive matching.',
      'Optionally sort lines alphabetically.',
      'Click Deduplicate to extract unique lines.'
    ],
    features: [
      'Case-sensitive or case-insensitive comparison',
      'Optional whitespace trimming before comparison',
      'Alphabetical ascending/descending sorting option',
      'Live metric showing how many duplicates were removed'
    ],
    faqs: [
      {
        question: 'Will this preserve original order?',
        answer: 'Yes, if you leave sorting disabled, the original appearance order of the first occurrence is preserved.'
      }
    ],
    relatedTools: ['text-cleaner', 'word-counter', 'csv-to-json']
  },

  // 10. Text Cleaner
  {
    id: 'text-cleaner',
    slug: 'text-cleaner',
    name: 'Text Cleaner',
    category: 'text-tools',
    description: 'Remove unwanted extra spaces, empty lines, line breaks, HTML tags, and non-ASCII characters from text.',
    seoTitle: 'Text Cleaner – Remove Extra Spaces, Line Breaks & Tags | PTools',
    seoDescription: 'Clean messy text by stripping multiple consecutive spaces, removing blank lines, stripping HTML tags, and trimming edges.',
    keywords: ['text cleaner', 'remove extra spaces', 'strip html', 'normalize text', 'remove blank lines'],
    icon: 'Sparkles',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste the unformatted text into the editor.',
      'Choose cleaning options (Strip extra spaces, Remove blank lines, Strip HTML tags, Trim edges).',
      'Click Clean Text to get a clean result.'
    ],
    features: [
      'Multi-option configurable text purification',
      'HTML tag stripping via regex',
      'Tabs to spaces conversion',
      'Shows reduction percentage and space savings'
    ],
    faqs: [
      {
        question: 'Does this strip formatting from pasted Word or Google Docs text?',
        answer: 'Yes, it normalizes tabs, curly quotes, non-breaking spaces, and removes redundant line breaks.'
      }
    ],
    relatedTools: ['remove-duplicate-lines', 'word-counter', 'text-case-converter']
  },

  // 11. Base64 Encoder
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    name: 'Base64 Encoder',
    category: 'encoding-decoding',
    description: 'Encode plain text or UTF-8 strings into Base64 format with full Unicode support.',
    seoTitle: 'Base64 Encoder – Convert Text to Base64 Online | PTools',
    seoDescription: 'Encode plain text and UTF-8 strings to Base64 in real-time. Secure, client-side, with full international character support.',
    keywords: ['base64 encoder', 'encode base64', 'utf8 base64', 'base64 string', 'developer tool'],
    icon: 'Binary',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Enter or paste plain text into the input field.',
      'Click Encode to Base64 (or use real-time conversion).',
      'Copy the encoded string or download as a text file.'
    ],
    features: [
      'Full UTF-8 Unicode encoding support',
      'Real-time encoding as you type',
      'Shows encoded byte size',
      'One-click copy and download'
    ],
    faqs: [
      {
        question: 'Does this support non-English characters and emojis?',
        answer: 'Yes, our encoder uses modern TextEncoder UTF-8 byte conversion, so accented characters, Asian alphabets, and emojis encode cleanly.'
      }
    ],
    relatedTools: ['base64-decoder', 'url-encoder', 'image-to-base64']
  },

  // 12. Base64 Decoder
  {
    id: 'base64-decoder',
    slug: 'base64-decoder',
    name: 'Base64 Decoder',
    category: 'encoding-decoding',
    description: 'Decode Base64 encoded strings back into readable plain text and UTF-8 characters.',
    seoTitle: 'Base64 Decoder – Convert Base64 to Text Online | PTools',
    seoDescription: 'Decode Base64 strings to human-readable UTF-8 text with instant error detection and character safety.',
    keywords: ['base64 decoder', 'decode base64', 'base64 to text', 'utf8 decode', 'developer tool'],
    icon: 'Binary',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your Base64 encoded string into the input box.',
      'Click Decode Base64.',
      'Read and copy the decoded plain text.'
    ],
    features: [
      'Automatic padding and invalid character validation',
      'Full UTF-8 decoding support',
      'Clear error notification if string is malformed',
      'One-click copy'
    ],
    faqs: [
      {
        question: 'What happens if my Base64 string is missing padding?',
        answer: 'The decoder will automatically normalize padding characters (=) and attempt graceful decoding.'
      }
    ],
    relatedTools: ['base64-encoder', 'url-decoder', 'hash-generator']
  },

  // 13. URL Encoder
  {
    id: 'url-encoder',
    slug: 'url-encoder',
    name: 'URL Encoder',
    category: 'encoding-decoding',
    description: 'Percent-encode query parameters, URLs, and strings according to RFC 3986 for safe web transmission.',
    seoTitle: 'URL Encoder – Online Percent Encoding Tool | PTools',
    seoDescription: 'Encode URLs and query parameters safely using standard percent-encoding (RFC 3986). Fast, accurate and client-side.',
    keywords: ['url encoder', 'percent encoding', 'url encode online', 'query param encoder', 'rfc 3986'],
    icon: 'Link',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your URL or text string into the input area.',
      'Choose standard encodeURI or full encodeURIComponent mode.',
      'Click Encode to generate safe percent-encoded text.'
    ],
    features: [
      'encodeURIComponent and encodeURI toggle',
      'RFC 3986 standard compliance',
      'Instant conversion with copy affordance',
      'Handles special symbols (&, ?, =, #, spaces)'
    ],
    faqs: [
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURI encodes an entire URL preserving protocol and path characters (/ : ? =), while encodeURIComponent encodes everything including slashes, ideal for query parameter values.'
      }
    ],
    relatedTools: ['url-decoder', 'utm-builder', 'base64-encoder']
  },

  // 14. URL Decoder
  {
    id: 'url-decoder',
    slug: 'url-decoder',
    name: 'URL Decoder',
    category: 'encoding-decoding',
    description: 'Decode percent-encoded URLs, path segments, and query parameters back to human-readable strings.',
    seoTitle: 'URL Decoder – Decode Percent-Encoded URLs Online | PTools',
    seoDescription: 'Decode percent-encoded strings (%20, %2F, %26) into clear, readable text. Fix escaped web addresses and parameters.',
    keywords: ['url decoder', 'percent decode', 'decode url online', 'unquote url', 'developer utility'],
    icon: 'Link',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste the percent-encoded URL into the box.',
      'Click Decode URL.',
      'Copy the unescaped readable URL.'
    ],
    features: [
      'Handles %20 and plus sign (+) space variations',
      'Validates percent hex sequences',
      'Zero external network transfer',
      'One-click copy'
    ],
    faqs: [
      {
        question: 'Does this handle + signs as spaces?',
        answer: 'Yes, you can toggle query-string plus sign decoding to convert + into whitespace.'
      }
    ],
    relatedTools: ['url-encoder', 'utm-builder', 'base64-decoder']
  },

  // 15. JSON Formatter
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Beautifier',
    category: 'developer-tools',
    description: 'Format, beautify, and indent JSON data with customizable 2-space, 4-space, or tab indentation.',
    seoTitle: 'JSON Formatter – Format & Beautify JSON Online | PTools',
    seoDescription: 'Beautify and format JSON data online. Choose 2-space or 4-space indentations, validate syntax errors, and copy output.',
    keywords: ['json formatter', 'json beautifier', 'format json', 'json pretty print', 'developer tools'],
    icon: 'Code',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your raw, minified, or unformatted JSON text into the editor.',
      'Select your preferred indentation (2 spaces, 4 spaces, or Tab).',
      'Click Format JSON to beautify the code.',
      'Copy formatted JSON or download as a .json file.'
    ],
    features: [
      'Real-time syntax validation with line numbers',
      'Customizable 2-space, 4-space, or tab indentation',
      'Sort object keys alphabetically option',
      'One-click download as .json file'
    ],
    faqs: [
      {
        question: 'Does this validate my JSON?',
        answer: 'Yes, if the JSON contains syntax errors, the formatter highlights the exact error reason and character position.'
      }
    ],
    relatedTools: ['json-validator', 'json-minifier', 'json-to-csv', 'csv-to-json']
  },

  // 16. JSON Validator
  {
    id: 'json-validator',
    slug: 'json-validator',
    name: 'JSON Validator',
    category: 'developer-tools',
    description: 'Validate JSON syntax and pinpoint exact syntax errors, missing brackets, unescaped quotes, or trailing commas.',
    seoTitle: 'JSON Validator – Validate JSON Syntax Online | PTools',
    seoDescription: 'Check whether your JSON is valid RFC 8259 syntax. Instant parsing, line detection, and detailed error messages.',
    keywords: ['json validator', 'validate json', 'json syntax check', 'json lint', 'rfc 8259'],
    icon: 'CheckCircle2',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste the JSON string into the validator.',
      'Click Validate JSON.',
      'Review whether the JSON is valid or read the error diagnostics.'
    ],
    features: [
      'Detailed error reporting with line/column pointers',
      'Shows parsed object key count and data depth',
      'Validates arrays, objects, primitives',
      'Privacy safe: client-side parsing only'
    ],
    faqs: [
      {
        question: 'Why does my JSON say invalid for single quotes?',
        answer: 'The official JSON standard (RFC 8259) requires double quotes for all strings and key names. Single quotes are not permitted.'
      }
    ],
    relatedTools: ['json-formatter', 'json-minifier', 'csv-to-json']
  },

  // 17. JSON Minifier
  {
    id: 'json-minifier',
    slug: 'json-minifier',
    name: 'JSON Minifier & Compressor',
    category: 'developer-tools',
    description: 'Compress and minify JSON data by stripping whitespace and newlines for optimized network payloads and storage.',
    seoTitle: 'JSON Minifier – Compress JSON Online | PTools',
    seoDescription: 'Minify JSON payloads to reduce bandwidth and file size. Strip all whitespace and indentation in one click.',
    keywords: ['json minifier', 'compress json', 'minify json', 'json compact', 'payload optimizer'],
    icon: 'Minimize2',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste formatted JSON into the input box.',
      'Click Minify JSON.',
      'Copy the compact single-line JSON string.'
    ],
    features: [
      'Compresses JSON into minimal byte size',
      'Displays byte savings percentage',
      'Validates syntax during minification',
      'Instant copy and download'
    ],
    faqs: [
      {
        question: 'Does minifying JSON change the data?',
        answer: 'No, minification only strips insignificant whitespace and newlines between tokens, keeping data structure identical.'
      }
    ],
    relatedTools: ['json-formatter', 'json-validator', 'uuid-generator']
  },

  // 18. HTML Formatter
  {
    id: 'html-formatter',
    slug: 'html-formatter',
    name: 'HTML Formatter & Beautifier',
    category: 'developer-tools',
    description: 'Beautify messy HTML markup with proper indentation, clean nested tags, and closing tags alignment.',
    seoTitle: 'HTML Formatter – Format & Beautify HTML Code Online | PTools',
    seoDescription: 'Clean and format messy HTML code with consistent indentation, tag hierarchy, and readable markup.',
    keywords: ['html formatter', 'html beautifier', 'format html', 'clean html', 'html pretty print'],
    icon: 'Code',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your raw HTML into the editor.',
      'Choose 2-space or 4-space indentation.',
      'Click Format HTML to clean up the code.'
    ],
    features: [
      'Handles nested elements and self-closing tags',
      'Preserves doctype and comment blocks',
      'Custom indentation choice',
      'One-click copy'
    ],
    faqs: [
      {
        question: 'Can this handle modern HTML5 elements?',
        answer: 'Yes, it formats all standard HTML5 semantic elements correctly.'
      }
    ],
    relatedTools: ['css-formatter', 'javascript-formatter', 'markdown-to-html']
  },

  // 19. CSS Formatter
  {
    id: 'css-formatter',
    slug: 'css-formatter',
    name: 'CSS Formatter & Beautifier',
    category: 'developer-tools',
    description: 'Format, beautify and organize CSS stylesheets with uniform rule indentation, braces and property spacing.',
    seoTitle: 'CSS Formatter – Format & Clean CSS Stylesheets | PTools',
    seoDescription: 'Format CSS stylesheets online. Organize selectors, properties, media queries, and braces with clean indentation.',
    keywords: ['css formatter', 'css beautifier', 'format css', 'clean css', 'css pretty print'],
    icon: 'Palette',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your CSS code into the editor.',
      'Click Format CSS.',
      'Copy the organized, beautifully aligned CSS.'
    ],
    features: [
      'Indents declaration blocks properly',
      'Aligns braces and colons',
      'Supports media queries and pseudo-selectors',
      'Copy or download result'
    ],
    faqs: [
      {
        question: 'Does this also minify CSS?',
        answer: 'You can toggle between Beautify mode and Minify mode to either expand or compress the CSS.'
      }
    ],
    relatedTools: ['html-formatter', 'javascript-formatter', 'gradient-generator']
  },

  // 20. JavaScript Formatter
  {
    id: 'javascript-formatter',
    slug: 'javascript-formatter',
    name: 'JavaScript Formatter',
    category: 'developer-tools',
    description: 'Format and beautify JavaScript / TypeScript code with consistent indentation and bracket alignments.',
    seoTitle: 'JavaScript Formatter – Beautify JS & TS Online | PTools',
    seoDescription: 'Format raw or minified JavaScript code online. Re-indent functions, objects, and statements cleanly.',
    keywords: ['javascript formatter', 'js beautifier', 'format javascript', 'js pretty print', 'code formatter'],
    icon: 'Code',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your JavaScript or TypeScript snippet into the editor.',
      'Click Format JavaScript.',
      'Copy the clean, readable code.'
    ],
    features: [
      'Formats functions, classes, and object literals',
      'Configurable 2-space or 4-space tabs',
      'Clean syntax alignment',
      'One-click copy'
    ],
    faqs: [
      {
        question: 'Does this execute my JavaScript code?',
        answer: 'Never. The code is strictly parsed as text and never executed, ensuring complete security.'
      }
    ],
    relatedTools: ['json-formatter', 'html-formatter', 'uuid-generator']
  },

  // 21. UUID Generator
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    category: 'developer-tools',
    description: 'Generate cryptographically secure Version 4 UUIDs (Universally Unique Identifiers) in bulk or individually.',
    seoTitle: 'UUID Generator – Generate Version 4 UUIDs Online | PTools',
    seoDescription: 'Generate RFC 4122 compliant v4 UUIDs using browser crypto.getRandomValues(). Single or bulk generation with uppercase and hyphen options.',
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'random uuid', 'rfc 4122'],
    icon: 'Fingerprint',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Select how many UUIDs you need (1 to 100).',
      'Choose formatting options (Uppercase, Hyphens, Braces).',
      'Click Generate UUIDs.',
      'Copy the list or download as text.'
    ],
    features: [
      'RFC 4122 compliant Version 4 UUID generation',
      'Uses Web Crypto API (crypto.getRandomValues) for true randomness',
      'Bulk generation up to 100 at once',
      'Uppercase, lowercase, and no-hyphens options'
    ],
    faqs: [
      {
        question: 'Are these UUIDs cryptographically secure?',
        answer: 'Yes, they are generated using the browser cryptographic pseudo-random number generator (crypto.getRandomValues).'
      }
    ],
    relatedTools: ['password-generator', 'hash-generator', 'json-formatter']
  },

  // 22. Password Generator
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'security',
    description: 'Generate strong, unpredictable, cryptographically secure passwords with custom lengths and character rules.',
    seoTitle: 'Strong Password Generator – Secure & Random | PTools',
    seoDescription: 'Create strong passwords with customizable length, symbols, numbers, and case rules using client-side cryptographic randomness.',
    keywords: ['password generator', 'strong password', 'random password', 'secure password', 'cybersecurity'],
    icon: 'Key',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Adjust the password length slider (8 to 64 characters).',
      'Toggle uppercase, lowercase, numbers, and symbols.',
      'Optionally exclude ambiguous characters (like 1, l, 0, O).',
      'Click Generate Password and copy with one click.'
    ],
    features: [
      'Built using browser Web Crypto API',
      'Real-time password strength meter and entropy indicator',
      'Exclude ambiguous characters option',
      'Never transmits passwords across the network'
    ],
    faqs: [
      {
        question: 'Are generated passwords saved on your server?',
        answer: 'No. Passwords are generated exclusively on your local device via JavaScript Web Crypto. No server ever sees your password.'
      }
    ],
    relatedTools: ['uuid-generator', 'hash-generator', 'base64-encoder']
  },

  // 23. Hash Generator
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Hash Generator (SHA & MD5)',
    category: 'security',
    description: 'Calculate cryptographic hashes for strings including SHA-256, SHA-512, SHA-384, SHA-1, and MD5 in real-time.',
    seoTitle: 'Hash Generator – SHA-256, SHA-512, MD5 Online | PTools',
    seoDescription: 'Generate SHA-256, SHA-512, SHA-384, SHA-1, and MD5 cryptographic hashes for any text string with instant verification.',
    keywords: ['hash generator', 'sha256 generator', 'md5 generator', 'sha512', 'checksum', 'cryptography'],
    icon: 'ShieldCheck',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Enter the text you want to hash.',
      'Select your algorithm (SHA-256, SHA-512, SHA-384, SHA-1, MD5).',
      'View the computed hex hash immediately and copy.'
    ],
    features: [
      'Hardware-accelerated SubtleCrypto implementation',
      'Supports SHA-256, SHA-512, SHA-384, SHA-1, and MD5',
      'Uppercase and lowercase hex output formats',
      'One-click copy for each algorithm'
    ],
    faqs: [
      {
        question: 'Can a hash be reversed?',
        answer: 'Cryptographic hash functions are one-way mathematical functions. They cannot be decrypted or reversed.'
      }
    ],
    relatedTools: ['password-generator', 'uuid-generator', 'base64-encoder']
  },

  // 24. Color Picker
  {
    id: 'color-picker',
    slug: 'color-picker',
    name: 'Color Picker & Palette Inspector',
    category: 'design-tools',
    description: 'Pick colors, view harmonies, and copy color values across HEX, RGB, HSL, and CMYK formats.',
    seoTitle: 'Color Picker – HEX, RGB, HSL Palette Inspector | PTools',
    seoDescription: 'Interactive color picker and palette explorer. Inspect color codes across HEX, RGB, and HSL with shade generators.',
    keywords: ['color picker', 'hex color', 'rgb color', 'hsl color', 'color palette', 'design tool'],
    icon: 'Pipette',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Use the visual color wheel/canvas or type a HEX value.',
      'Inspect matching RGB, HSL, and HSV equivalents.',
      'Copy any color format with a single click.'
    ],
    features: [
      'Visual interactive color selection',
      'Simultaneous HEX, RGB, HSL conversions',
      'Tints and shades step generator',
      'Eyedropper tool support on supported browsers'
    ],
    faqs: [
      {
        question: 'Can I pick a color directly from my screen?',
        answer: 'On supported desktop browsers (Chrome, Edge), the EyeDropper API allows sampling colors anywhere on your screen.'
      }
    ],
    relatedTools: ['hex-rgb-converter', 'gradient-generator', 'css-formatter']
  },

  // 25. HEX/RGB Converter
  {
    id: 'hex-rgb-converter',
    slug: 'hex-rgb-converter',
    name: 'HEX to RGB / RGB to HEX Converter',
    category: 'design-tools',
    description: 'Convert color codes between 3-digit/6-digit HEX, RGB(A), and HSL formats with alpha transparency support.',
    seoTitle: 'HEX to RGB Converter – Color Code Conversion | PTools',
    seoDescription: 'Convert HEX color codes to RGB and RGB to HEX with instant visual color swatch preview and opacity support.',
    keywords: ['hex to rgb', 'rgb to hex', 'color converter', 'hex color', 'rgba converter'],
    icon: 'Palette',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Enter a HEX code (e.g., #2563EB) or RGB values (e.g., 37, 99, 235).',
      'The opposite format updates immediately with live preview.',
      'Copy the CSS-ready string.'
    ],
    features: [
      'Bidirectional real-time conversion',
      'Alpha transparency / RGBA support',
      'CSS code output ready to paste into styles',
      'Preview swatch'
    ],
    faqs: [
      {
        question: 'Does this handle 3-character shorthand HEX codes like #fff?',
        answer: 'Yes, shorthand HEX codes are automatically expanded to standard 6-digit values.'
      }
    ],
    relatedTools: ['color-picker', 'gradient-generator', 'css-formatter']
  },

  // 26. Gradient Generator
  {
    id: 'gradient-generator',
    slug: 'gradient-generator',
    name: 'CSS Gradient Generator',
    category: 'design-tools',
    description: 'Create linear and radial CSS gradients visually with custom angles, color stops, and copy production CSS code.',
    seoTitle: 'CSS Gradient Generator – Create Linear & Radial Gradients | PTools',
    seoDescription: 'Build beautiful CSS gradients online. Adjust colors, angles, and color stops with live preview and clean CSS export.',
    keywords: ['css gradient generator', 'linear gradient', 'radial gradient', 'css background', 'web design'],
    icon: 'Layers',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Choose gradient type (Linear or Radial).',
      'Set the rotation angle and pick starting and ending colors.',
      'Add or adjust intermediate color stops.',
      'Copy the generated CSS background code.'
    ],
    features: [
      'Live responsive preview viewport',
      'Angle slider (0° to 360°) and radial shape options',
      'Add unlimited color stops',
      'One-click CSS code copy'
    ],
    faqs: [
      {
        question: 'Is the generated CSS compatible with all browsers?',
        answer: 'Yes, it outputs standard CSS3 gradient syntax supported by all modern browsers.'
      }
    ],
    relatedTools: ['color-picker', 'hex-rgb-converter', 'css-formatter']
  },

  // 27. QR Code Generator
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'qr-barcode',
    description: 'Generate high-resolution QR codes for websites, text, Wi-Fi networks, and contact info with PNG download.',
    seoTitle: 'Free QR Code Generator – Custom High-Res QR Codes | PTools',
    seoDescription: 'Create custom QR codes online for URLs, plain text, and Wi-Fi networks. Download in high-resolution PNG or SVG instantly.',
    keywords: ['qr code generator', 'free qr code', 'custom qr code', 'wifi qr code', 'qr maker'],
    icon: 'QrCode',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Select QR code type (URL/Link, Plain Text, or Wi-Fi).',
      'Enter your content or network credentials.',
      'Adjust size and error correction level if desired.',
      'Click Download QR Code as PNG or copy to clipboard.'
    ],
    features: [
      'High-resolution PNG output up to 1024px',
      'Configurable error correction levels (L, M, Q, H)',
      'URL, Text, and Wi-Fi network formatting presets',
      'Instant client-side rendering with no external tracking'
    ],
    faqs: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No. These are static QR codes that encode your data directly into the pixel matrix. They never expire and depend on no third-party servers.'
      }
    ],
    relatedTools: ['utm-builder', 'url-encoder', 'image-resizer']
  },

  // 28. Image Compressor
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'image-tools',
    description: 'Compress JPG, PNG, and WebP images directly in your browser without uploading files to external servers.',
    seoTitle: 'Image Compressor – Compress JPG, PNG & WebP Online | PTools',
    seoDescription: 'Compress JPG, PNG, and WebP images online for free with PTools. Reduce image file size quickly without complicated software.',
    keywords: ['image compressor', 'compress image', 'reduce image size', 'compress jpg', 'compress png', 'webp compressor'],
    icon: 'Image',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Select or drag & drop an image file (JPG, PNG, WebP).',
      'Adjust the quality compression slider (e.g. 70%-85%).',
      'Preview the compressed image and observe the file size reduction.',
      'Click Download Compressed Image.'
    ],
    features: [
      '100% Client-side processing — zero files uploaded to servers',
      'Quality control slider with live size reduction calculation',
      'Side-by-side comparison of original vs compressed size',
      'Supports JPG, PNG, and WebP formats'
    ],
    faqs: [
      {
        question: 'Are my images stored or uploaded anywhere?',
        answer: 'No! All compression runs locally inside your browser using the HTML5 Canvas API. Your pictures never leave your computer or phone.'
      },
      {
        question: 'What quality setting is recommended for web images?',
        answer: 'A quality between 75% and 85% typically reduces file size by 50% to 70% with virtually no perceptible loss in visual quality.'
      }
    ],
    relatedTools: ['image-resizer', 'jpg-to-png', 'png-to-jpg', 'webp-converter', 'image-to-base64']
  },

  // 29. Image Resizer
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    name: 'Image Resizer',
    category: 'image-tools',
    description: 'Resize image dimensions by exact pixels or percentage while maintaining aspect ratio and quality.',
    seoTitle: 'Image Resizer – Resize Photos & Dimensions Online | PTools',
    seoDescription: 'Resize image dimensions online. Specify exact width and height or scale by percentage with aspect ratio lock.',
    keywords: ['image resizer', 'resize photo', 'resize image online', 'scale image', 'change picture dimensions'],
    icon: 'Crop',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Upload an image from your device.',
      'Enter the target width or height (or percentage scale).',
      'Keep Aspect Ratio checked to avoid distortion.',
      'Click Resize Image and download the result.'
    ],
    features: [
      'Aspect ratio lock prevents distortion',
      'Scale by exact pixels or percentage (e.g. 50%, 75%)',
      'Instant browser-based rendering',
      'High-quality bicubic canvas interpolation'
    ],
    faqs: [
      {
        question: 'Can I upscale small images?',
        answer: 'Yes, you can enter larger dimensions, though upscaling cannot add details that were not present in the original.'
      }
    ],
    relatedTools: ['image-compressor', 'jpg-to-png', 'webp-converter']
  },

  // 30. JPG to PNG
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    category: 'image-tools',
    description: 'Convert JPEG/JPG images to lossless PNG format with zero quality loss and full browser security.',
    seoTitle: 'JPG to PNG Converter – Convert JPEG to PNG Online | PTools',
    seoDescription: 'Convert JPG photos to PNG format for free online. Client-side conversion preserving full resolution without file uploads.',
    keywords: ['jpg to png', 'jpeg to png', 'convert jpg to png', 'image converter', 'photo format'],
    icon: 'Image',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Select a JPG/JPEG image from your computer or phone.',
      'Click Convert to PNG.',
      'Download the lossless PNG file immediately.'
    ],
    features: [
      'Lossless canvas-based pixel conversion',
      'Preserves original image dimensions',
      'Immediate client-side download',
      'Batch conversion readiness'
    ],
    faqs: [
      {
        question: 'Does converting JPG to PNG make the image transparent?',
        answer: 'JPG images do not have transparency information, so converting will preserve the solid background of the JPG.'
      }
    ],
    relatedTools: ['png-to-jpg', 'webp-converter', 'image-compressor', 'image-resizer']
  },

  // 31. PNG to JPG
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    category: 'image-tools',
    description: 'Convert PNG images to standard JPG/JPEG with custom background color replacement for transparent areas.',
    seoTitle: 'PNG to JPG Converter – Convert PNG to JPEG Online | PTools',
    seoDescription: 'Convert transparent or opaque PNG graphics to JPG images online. Custom background fill and quality controls.',
    keywords: ['png to jpg', 'png to jpeg', 'convert png to jpg', 'image format converter', 'transparent to white'],
    icon: 'Image',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Upload your PNG file.',
      'Select background fill color for transparent pixels (defaults to white).',
      'Adjust JPG quality slider (1-100%).',
      'Click Convert and download your JPG.'
    ],
    features: [
      'Custom background color selector for transparent alpha channels',
      'Adjustable JPG compression quality',
      'Instant local canvas processing',
      'Download JPG file'
    ],
    faqs: [
      {
        question: 'Why do transparent areas become colored in JPG?',
        answer: 'JPG does not support transparent alpha channels. Our tool fills transparent areas with clean white (or your chosen background color).'
      }
    ],
    relatedTools: ['jpg-to-png', 'webp-converter', 'image-compressor']
  },

  // 32. WEBP Converter
  {
    id: 'webp-converter',
    slug: 'webp-converter',
    name: 'WebP Converter',
    category: 'image-tools',
    description: 'Convert any JPG, PNG, or GIF image into next-gen Google WebP format for fast website loading.',
    seoTitle: 'WebP Converter – Convert Images to WebP Online | PTools',
    seoDescription: 'Convert images to high-efficiency WebP format online. Reduce page weight while maintaining exceptional clarity.',
    keywords: ['webp converter', 'convert to webp', 'jpg to webp', 'png to webp', 'next gen image format'],
    icon: 'FileImage',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Choose any PNG, JPG, or BMP file.',
      'Set your target WebP quality level.',
      'Click Convert to WebP and download.'
    ],
    features: [
      'Next-generation WebP compression',
      'Preserves transparency for PNG sources',
      'Drastically reduces web asset sizes',
      '100% browser-based processing'
    ],
    faqs: [
      {
        question: 'Do all modern browsers support WebP?',
        answer: 'Yes, WebP is universally supported in all modern versions of Chrome, Safari, Edge, Firefox, and mobile browsers.'
      }
    ],
    relatedTools: ['image-compressor', 'jpg-to-png', 'png-to-jpg']
  },

  // 33. Image to Base64
  {
    id: 'image-to-base64',
    slug: 'image-to-base64',
    name: 'Image to Base64 Converter',
    category: 'image-tools',
    description: 'Convert images (PNG, JPG, SVG, WebP) into Base64 Data URI strings for direct embedding in HTML and CSS.',
    seoTitle: 'Image to Base64 Converter – Data URI Generator | PTools',
    seoDescription: 'Convert PNG, JPG, or SVG image files into Base64 Data URI strings for inline embedding in HTML <img> tags and CSS stylesheets.',
    keywords: ['image to base64', 'base64 image', 'data uri image', 'embed image css', 'inline image'],
    icon: 'Code2',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Drop your image file into the dropzone.',
      'View the converted Base64 string and HTML <img> snippet.',
      'Copy the raw Base64 string, CSS background url, or HTML tag.'
    ],
    features: [
      'Generates ready-to-use HTML <img> tags and CSS background URLs',
      'Displays raw data string and file size comparison',
      'One-click copy for all snippet formats',
      'Works with JPG, PNG, WebP, GIF, SVG'
    ],
    faqs: [
      {
        question: 'When should I embed images as Base64?',
        answer: 'Base64 embedding is great for small icons and avatars to eliminate HTTP roundtrips, but avoid it for very large photos as Base64 is ~33% larger in string size.'
      }
    ],
    relatedTools: ['base64-encoder', 'image-compressor', 'qr-code-generator']
  },

  // 34. PDF Merger
  {
    id: 'pdf-merger',
    slug: 'pdf-merger',
    name: 'PDF Merger',
    category: 'pdf-tools',
    description: 'Combine multiple PDF files into a single organized PDF document in your desired order.',
    seoTitle: 'PDF Merger – Combine Multiple PDF Files Online | PTools',
    seoDescription: 'Merge multiple PDF documents into one single file online. Reorder files easily and combine client-side with zero data uploads.',
    keywords: ['pdf merger', 'combine pdf', 'merge pdf files', 'join pdf', 'free pdf tool'],
    icon: 'FilePlus',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Select two or more PDF files from your computer or phone.',
      'Reorder the files using the Move Up / Move Down buttons.',
      'Click Merge PDFs to combine them into one document.',
      'Download your merged PDF.'
    ],
    features: [
      'Real client-side PDF byte manipulation using pdf-lib',
      'Drag or button-based file reordering',
      '100% private: your confidential PDFs never touch a server',
      'No file count or page restrictions'
    ],
    faqs: [
      {
        question: 'Are my confidential PDF documents safe?',
        answer: 'Yes! PTools processes PDFs locally in your browser memory via WebAssembly and JavaScript. No server upload ever occurs.'
      }
    ],
    relatedTools: ['pdf-splitter', 'pdf-compressor', 'jpg-to-pdf']
  },

  // 35. PDF Splitter
  {
    id: 'pdf-splitter',
    slug: 'pdf-splitter',
    name: 'PDF Splitter',
    category: 'pdf-tools',
    description: 'Extract specific pages or page ranges from a PDF document into a new standalone PDF file.',
    seoTitle: 'PDF Splitter – Extract Pages from PDF Online | PTools',
    seoDescription: 'Split PDF files and extract individual pages or page ranges (e.g., 1-3, 5) online for free without uploading.',
    keywords: ['pdf splitter', 'split pdf', 'extract pdf pages', 'separate pdf', 'pdf tools'],
    icon: 'Split',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Upload a PDF document.',
      'Enter the page numbers or ranges to extract (e.g., 1, 3-5).',
      'Click Split & Extract.',
      'Download the newly extracted PDF document.'
    ],
    features: [
      'Extract single pages or custom ranges (e.g. 1-2, 4, 7-9)',
      'Page count inspection',
      'Client-side extraction with pdf-lib',
      'Fast and secure'
    ],
    faqs: [
      {
        question: 'How do I specify page ranges?',
        answer: 'You can use commas and hyphens like "1-3, 5, 8-10" to select specific pages.'
      }
    ],
    relatedTools: ['pdf-merger', 'pdf-compressor', 'jpg-to-pdf']
  },

  // 36. PDF Compressor
  {
    id: 'pdf-compressor',
    slug: 'pdf-compressor',
    name: 'PDF Compressor',
    category: 'pdf-tools',
    description: 'Reduce the file size of PDF documents by re-optimizing embedded images and document streams locally.',
    seoTitle: 'PDF Compressor – Reduce PDF File Size Online | PTools',
    seoDescription: 'Compress PDF files online while maintaining readability. Optimize embedded image assets client-side with complete privacy.',
    keywords: ['pdf compressor', 'compress pdf', 'reduce pdf size', 'shrink pdf', 'free pdf tool'],
    icon: 'Minimize',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Select a PDF file from your device.',
      'Choose compression level (Recommended, High, or Maximum).',
      'Click Compress PDF to process.',
      'Download your optimized PDF.'
    ],
    features: [
      'Local client-side stream optimization',
      'Shows estimated and actual size reduction',
      'Maintains document text clarity',
      'Completely secure and private'
    ],
    faqs: [
      {
        question: 'Will text inside the PDF become blurry?',
        answer: 'No, vector text and fonts remain intact and sharp. Optimization targets embedded high-resolution raster images and uncompressed metadata streams.'
      }
    ],
    relatedTools: ['pdf-merger', 'pdf-splitter', 'image-compressor']
  },

  // 37. JPG to PDF
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF Converter',
    category: 'pdf-tools',
    description: 'Convert one or multiple JPG and PNG images into a clean, printable PDF document.',
    seoTitle: 'JPG to PDF Converter – Convert Photos to PDF Online | PTools',
    seoDescription: 'Convert photos, receipts, and images into a single formatted PDF document. Fast, free, and processed in your browser.',
    keywords: ['jpg to pdf', 'image to pdf', 'photos to pdf', 'convert jpg to pdf', 'receipt to pdf'],
    icon: 'FileSpreadsheet',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Upload one or more image files (JPG, PNG).',
      'Select page orientation (Portrait, Landscape, or Match Image).',
      'Click Generate PDF.',
      'Download your formatted PDF document.'
    ],
    features: [
      'Combine multiple photos into one multi-page PDF',
      'Automatic image scaling and centering',
      'Standard A4 and letter layout support',
      'Private client-side compilation'
    ],
    faqs: [
      {
        question: 'Can I add multiple photos to a single PDF?',
        answer: 'Yes, you can upload multiple images and each will be cleanly placed onto its own page or sequenced in order.'
      }
    ],
    relatedTools: ['pdf-merger', 'jpg-to-png', 'image-compressor']
  },

  // 38. PDF to JPG
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG Converter',
    category: 'pdf-tools',
    description: 'Extract pages from a PDF document and save them as high-quality JPG image files.',
    seoTitle: 'PDF to JPG Converter – Convert PDF Pages to Images | PTools',
    seoDescription: 'Convert PDF document pages into high-resolution JPG images. Client-side browser rendering with instant image download.',
    keywords: ['pdf to jpg', 'pdf to image', 'convert pdf to jpeg', 'extract pdf images', 'pdf page export'],
    icon: 'Image',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Select your PDF document.',
      'Preview the detected pages.',
      'Click Convert Pages to JPG and download individual pages.'
    ],
    features: [
      'Renders PDF page viewports to canvas',
      'High-DPI resolution export',
      'Download as individual JPGs',
      'Zero server upload needed'
    ],
    faqs: [
      {
        question: 'What resolution are the extracted JPGs?',
        answer: 'Images are exported at standard 150-300 DPI canvas density for crisp reading.'
      }
    ],
    relatedTools: ['jpg-to-pdf', 'pdf-merger', 'jpg-to-png']
  },

  // 39. CSV to JSON
  {
    id: 'csv-to-json',
    slug: 'csv-to-json',
    name: 'CSV to JSON Converter',
    category: 'data-spreadsheet',
    description: 'Transform tabular CSV (Comma Separated Values) data into clean structured JSON arrays of objects.',
    seoTitle: 'CSV to JSON Converter – Parse CSV to JSON Online | PTools',
    seoDescription: 'Convert CSV spreadsheets to JSON format instantly. Supports custom delimiters (comma, semicolon, tab) and automatic type casting.',
    keywords: ['csv to json', 'convert csv to json', 'csv parser', 'spreadsheet to json', 'data converter'],
    icon: 'Table',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste CSV text or upload a .csv file.',
      'Select your delimiter (Comma, Semicolon, Tab, Pipe).',
      'Toggle whether the first row contains headers.',
      'Click Convert to JSON and copy or download.'
    ],
    features: [
      'Automatic delimiter detection or custom selection',
      'First row header parsing into JSON keys',
      'Numeric and boolean auto-typing option',
      'One-click JSON file download'
    ],
    faqs: [
      {
        question: 'Does this handle quoted fields containing commas?',
        answer: 'Yes, standard RFC 4180 quotation escaping is properly parsed.'
      }
    ],
    relatedTools: ['json-to-csv', 'json-formatter', 'remove-duplicate-lines']
  },

  // 40. JSON to CSV
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    name: 'JSON to CSV Converter',
    category: 'data-spreadsheet',
    description: 'Convert JSON arrays and objects into tabular CSV format for Excel, Google Sheets, and data analysis.',
    seoTitle: 'JSON to CSV Converter – Export JSON to Spreadsheet | PTools',
    seoDescription: 'Convert JSON data into CSV spreadsheets online. Handles flat and nested objects with automatic header extraction.',
    keywords: ['json to csv', 'convert json to csv', 'json to excel', 'json to spreadsheet', 'data export'],
    icon: 'Table',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your JSON array of objects into the editor.',
      'Choose your separator (Comma or Semicolon).',
      'Click Convert to CSV and copy or download as a .csv file.'
    ],
    features: [
      'Automatic column header extraction from object keys',
      'Proper RFC 4180 escaping for cells with quotes/commas',
      'Download as ready-to-open Excel CSV',
      'Instant client-side generation'
    ],
    faqs: [
      {
        question: 'What format should the JSON be in?',
        answer: 'An array of objects (e.g. [{"name": "Alice", "age": 28}, ...]) produces the cleanest spreadsheet columns.'
      }
    ],
    relatedTools: ['csv-to-json', 'json-formatter', 'json-validator']
  },

  // 41. Markdown to HTML
  {
    id: 'markdown-to-html',
    slug: 'markdown-to-html',
    name: 'Markdown to HTML Converter',
    category: 'document-tools',
    description: 'Convert CommonMark and GitHub Flavored Markdown into semantic HTML with live split-screen preview.',
    seoTitle: 'Markdown to HTML Converter – Live Markdown Preview | PTools',
    seoDescription: 'Convert Markdown to semantic HTML markup online. Live split-screen visual preview, syntax highlights, and HTML export.',
    keywords: ['markdown to html', 'md to html', 'markdown previewer', 'gfm converter', 'web developer tool'],
    icon: 'BookOpen',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Write or paste Markdown into the left editor pane.',
      'Watch the live formatted preview and HTML output render on the right.',
      'Copy the generated HTML code or download.'
    ],
    features: [
      'Supports headings, lists, tables, code blocks, blockquotes, and links',
      'Live synchronized visual preview',
      'Clean semantic HTML output',
      'One-click copy of HTML markup'
    ],
    faqs: [
      {
        question: 'Does this support GitHub Flavored Markdown (GFM)?',
        answer: 'Yes, it supports strikethrough, tables, task lists, and inline code formatting.'
      }
    ],
    relatedTools: ['html-to-markdown', 'html-formatter', 'word-counter']
  },

  // 42. HTML to Markdown
  {
    id: 'html-to-markdown',
    slug: 'html-to-markdown',
    name: 'HTML to Markdown Converter',
    category: 'document-tools',
    description: 'Transform HTML web markup back into clean, readable Markdown syntax for README files and note apps.',
    seoTitle: 'HTML to Markdown Converter – Clean MD Generator | PTools',
    seoDescription: 'Convert HTML code into clean Markdown syntax online. Strips messy wrapper divs while preserving headings, lists, links, and bold text.',
    keywords: ['html to markdown', 'html to md', 'convert html to markdown', 'readme generator', 'clean markdown'],
    icon: 'BookOpen',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your HTML source code into the editor.',
      'Click Convert to Markdown.',
      'Copy the clean Markdown text.'
    ],
    features: [
      'Preserves headings (h1-h6), lists (ul/ol), links, bold, italics, and code',
      'Removes redundant classes, spans, and scripts',
      'Produces clean, standard CommonMark formatting',
      'One-click copy and download'
    ],
    faqs: [
      {
        question: 'Can I paste rich text directly from a webpage?',
        answer: 'Yes, you can paste HTML markup and it will strip styling tags while preserving content hierarchy.'
      }
    ],
    relatedTools: ['markdown-to-html', 'html-formatter', 'text-cleaner']
  },

  // 43. Timestamp Converter
  {
    id: 'timestamp-converter',
    slug: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    category: 'date-time',
    description: 'Convert Unix epoch timestamps (seconds and milliseconds) to human-readable dates and convert dates to timestamps.',
    seoTitle: 'Unix Timestamp Converter – Epoch to Human Date | PTools',
    seoDescription: 'Convert Unix epoch timestamps to UTC and local human-readable date strings. Convert calendar dates to Unix seconds and milliseconds.',
    keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'epoch to date', 'utc converter'],
    icon: 'Clock',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Enter an Epoch timestamp (seconds or milliseconds) or pick a calendar date/time.',
      'Click Convert to view UTC date, local time, relative time ("X hours ago"), and ISO 8601 string.'
    ],
    features: [
      'Current epoch live ticker',
      'Supports seconds (10 digits) and milliseconds (13 digits)',
      'Displays UTC, Local Time, ISO 8601, and RFC 2822',
      'Relative time breakdown ("2 days ago", "in 4 hours")'
    ],
    faqs: [
      {
        question: 'What is a Unix timestamp?',
        answer: 'A Unix timestamp is the total number of seconds that have elapsed since January 1, 1970 (00:00:00 UTC), known as the Unix epoch.'
      }
    ],
    relatedTools: ['countdown-timer', 'stopwatch', 'age-calculator']
  },

  // 44. Countdown Timer
  {
    id: 'countdown-timer',
    slug: 'countdown-timer',
    name: 'Online Countdown Timer',
    category: 'date-time',
    description: 'Set a high-precision countdown timer with alarm sound, visual progress ring, and fullscreen mode.',
    seoTitle: 'Online Countdown Timer with Sound & Visual Ring | PTools',
    seoDescription: 'Simple, accurate online countdown timer with audible alert, preset intervals, pause/resume, and zero distractions.',
    keywords: ['countdown timer', 'online timer', 'timer with sound', 'kitchen timer', 'study timer'],
    icon: 'Hourglass',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Set hours, minutes, and seconds or click a quick preset (1 min, 5 min, 15 min, 25 min Pomodoro).',
      'Click Start to begin countdown.',
      'Listen for the audible chime when time expires.'
    ],
    features: [
      'Quick presets for study, cooking, and breaks',
      'Audio alert chime via Web Audio API (no external MP3 file)',
      'Pause, resume, and reset controls',
      'Accurate background tab timing'
    ],
    faqs: [
      {
        question: 'Does the timer still run if I switch tabs?',
        answer: 'Yes, timing is calculated against system clock delta to ensure exact countdown accuracy even when minimized.'
      }
    ],
    relatedTools: ['stopwatch', 'timestamp-converter', 'age-calculator']
  },

  // 45. Stopwatch
  {
    id: 'stopwatch',
    slug: 'stopwatch',
    name: 'Online Stopwatch',
    category: 'date-time',
    description: 'High-precision online stopwatch with millisecond accuracy, lap time recorder, and split time export.',
    seoTitle: 'Online Stopwatch – Lap Times & Millisecond Precision | PTools',
    seoDescription: 'Measure elapsed time with millisecond precision. Record unlimited laps, calculate fastest and slowest splits, and export times.',
    keywords: ['stopwatch', 'online stopwatch', 'lap timer', 'split timer', 'precision stopwatch'],
    icon: 'Watch',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Click Start to start tracking time.',
      'Click Lap to record split times during the run.',
      'Click Stop to pause and Reset to return to zero.'
    ],
    features: [
      'Millisecond precision display with tabular numbers',
      'Lap split tracking with fastest/slowest lap highlighting',
      'Copy or export lap table',
      'Keyboard spacebar start/stop shortcut'
    ],
    faqs: [
      {
        question: 'Can I use keyboard controls?',
        answer: 'Yes, pressing the Spacebar toggles start and stop, and "L" records a lap.'
      }
    ],
    relatedTools: ['countdown-timer', 'timestamp-converter', 'basic-calculator']
  },

  // 46. Lorem Ipsum Generator
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    category: 'text-tools',
    description: 'Generate standard dummy placeholder text by paragraphs, sentences, words, or lists for mockups and designs.',
    seoTitle: 'Lorem Ipsum Generator – Placeholder Dummy Text | PTools',
    seoDescription: 'Generate custom Lorem Ipsum placeholder text by paragraphs, words, or sentences with HTML tags option and one-click copy.',
    keywords: ['lorem ipsum generator', 'dummy text', 'placeholder text', 'lipsum', 'designer tool'],
    icon: 'FileText',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Select whether you need Paragraphs, Words, or Sentences.',
      'Enter the quantity required.',
      'Optionally check "Start with Lorem ipsum dolor sit amet...".',
      'Click Generate and copy to clipboard.'
    ],
    features: [
      'Classic Cicero Latin text derivation',
      'Option to wrap in HTML <p> tags',
      'Adjustable paragraph, sentence, or word counts',
      'One-click copy to clipboard'
    ],
    faqs: [
      {
        question: 'What is the origin of Lorem Ipsum?',
        answer: 'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of Cicero\'s "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil), written in 45 BC.'
      }
    ],
    relatedTools: ['word-counter', 'character-counter', 'slug-generator']
  },

  // 47. Slug Generator
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    name: 'URL Slug Generator',
    category: 'url-link-tools',
    description: 'Convert article titles, product names, and headlines into clean, URL-safe, SEO-friendly slugs.',
    seoTitle: 'URL Slug Generator – Clean SEO Friendly Slugs | PTools',
    seoDescription: 'Generate URL-safe slugs from article titles and headlines. Removes accents, special characters, and formats with clean hyphens.',
    keywords: ['slug generator', 'url slug', 'seo friendly url', 'permalink generator', 'clean url'],
    icon: 'Link2',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Type or paste your headline or title.',
      'Choose separator (hyphen -, underscore _, or dot .).',
      'Select lowercase or custom options.',
      'Copy your clean permalink slug.'
    ],
    features: [
      'Removes punctuation, emojis, and unprintable characters',
      'Transliterates accented characters (é → e, ö → o)',
      'Custom separator selection (hyphen, underscore)',
      'Strips stop words (optional)'
    ],
    faqs: [
      {
        question: 'Why are hyphens better than underscores in URLs?',
        answer: 'Google and major search engines treat hyphens (-) as word separators, while underscores (_) can cause adjacent words to be joined into a single term.'
      }
    ],
    relatedTools: ['utm-builder', 'text-case-converter', 'meta-tag-generator']
  },

  // 48. UTM Builder
  {
    id: 'utm-builder',
    slug: 'utm-builder',
    name: 'UTM Campaign Link Builder',
    category: 'url-link-tools',
    description: 'Build Google Analytics tracking campaign URLs with utm_source, utm_medium, utm_campaign, and utm_content.',
    seoTitle: 'UTM Builder – Google Analytics Campaign URL Maker | PTools',
    seoDescription: 'Create custom UTM campaign tracking links for marketing emails, social media, and ads. Real-time preview and one-click copy.',
    keywords: ['utm builder', 'campaign url builder', 'google analytics utm', 'utm generator', 'marketing tracking'],
    icon: 'Compass',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Enter your destination website URL.',
      'Fill in Campaign Source (e.g. newsletter, google, twitter).',
      'Fill in Campaign Medium (e.g. email, cpc, social).',
      'Fill in Campaign Name (e.g. spring_sale).',
      'Copy the completed, parameter-encoded tracking URL.'
    ],
    features: [
      'Automates URL parameter encoding',
      'Preset dropdowns for standard marketing mediums',
      'Real-time live URL preview',
      'Short link validation and copy'
    ],
    faqs: [
      {
        question: 'Which UTM parameters are mandatory?',
        answer: 'For Google Analytics, Website URL and Campaign Source (utm_source) are required, while medium and campaign name are strongly recommended.'
      }
    ],
    relatedTools: ['url-encoder', 'slug-generator', 'qr-code-generator']
  },

  // 49. Meta Tag Generator
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'HTML Meta Tag Generator (SEO & OpenGraph)',
    category: 'seo-tools',
    description: 'Generate complete, search-engine-ready HTML meta tags, OpenGraph cards for Facebook/LinkedIn, and Twitter Card tags.',
    seoTitle: 'Meta Tag Generator – SEO & OpenGraph Tag Maker | PTools',
    seoDescription: 'Generate HTML meta tags, OpenGraph tags, and Twitter Cards online. Live character counters and copy-ready head snippet.',
    keywords: ['meta tag generator', 'seo meta tags', 'opengraph generator', 'twitter card maker', 'seo tool'],
    icon: 'Search',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Enter your site title, description, URL, and image preview link.',
      'Toggle social platforms (OpenGraph and Twitter Cards).',
      'Inspect character limits for optimal Google snippets.',
      'Copy the formatted <head> snippet into your HTML.'
    ],
    features: [
      'Live snippet preview for Google SERP and Social Cards',
      'Includes Canonical link, Robots, and Theme Color tags',
      'Checks optimal title (50-60 chars) and description (120-160 chars) lengths',
      'One-click copy into your website code'
    ],
    faqs: [
      {
        question: 'What is OpenGraph?',
        answer: 'OpenGraph (og:) tags are metadata tags created by Facebook that control how your webpage title, description, and preview image appear when shared on social media.'
      }
    ],
    relatedTools: ['robots-txt-generator', 'slug-generator', 'character-counter']
  },

  // 50. Robots.txt Generator
  {
    id: 'robots-txt-generator',
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'seo-tools',
    description: 'Create standard robots.txt files for Googlebot, Bingbot, and search engines with custom disallow paths and sitemap directive.',
    seoTitle: 'Robots.txt Generator – Create Search Engine Robots File | PTools',
    seoDescription: 'Create custom robots.txt files online. Configure crawler permissions for Google, Bing, Yahoo, set crawl delays and include sitemaps.',
    keywords: ['robots txt generator', 'robots.txt creator', 'search engine crawler', 'sitemap directive', 'seo tools'],
    icon: 'FileCode',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Choose default permission (Allow All or Disallow All).',
      'Add directories you want to exclude (e.g. /admin/, /private/).',
      'Enter your XML sitemap URL.',
      'Download robots.txt and place in your website root.'
    ],
    features: [
      'Pre-configured presets for WordPress, Shopify, and custom apps',
      'Specific User-Agent rules for Googlebot, Bingbot, and AI crawlers',
      'Sitemap directive inclusion',
      'Direct .txt file download'
    ],
    faqs: [
      {
        question: 'Where should the robots.txt file be uploaded?',
        answer: 'Robots.txt must be placed in the highest-level directory of your website domain (e.g., https://yourdomain.com/robots.txt).'
      }
    ],
    relatedTools: ['meta-tag-generator', 'slug-generator', 'utm-builder']
  },

  // 51. Google Drive Direct Download Link Generator
  {
    id: 'google-drive-direct-download-link-generator',
    slug: 'google-drive-direct-download-link-generator',
    name: 'Google Drive Direct Download Link Generator',
    category: 'google-drive-cloud',
    description: 'Transform standard Google Drive share links into permanent, 1-click direct download and preview links.',
    seoTitle: 'Google Drive Direct Download Link Generator | PTools',
    seoDescription: 'Convert Google Drive sharing links into instant direct download links and embed codes. No software installation needed.',
    keywords: ['google drive direct download', 'drive link generator', 'direct link drive', 'embed google drive'],
    icon: 'Cloud',
    featured: true,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste your Google Drive sharing link (e.g. drive.google.com/file/d/...).',
      'Click Generate Direct Link.',
      'Copy the direct download URL, preview link, or iframe embed code.'
    ],
    features: [
      'Extracts File ID automatically from standard and short links',
      'Generates direct download, preview, and embed links',
      'Instant copy affordances',
      'Privacy safe: zero credentials requested for public links'
    ],
    faqs: [
      {
        question: 'Does the file need to be publicly accessible?',
        answer: 'Yes, the file\'s sharing settings in Google Drive must be set to "Anyone with the link can view".'
      }
    ],
    relatedTools: ['google-drive-embed-generator', 'url-encoder', 'qr-code-generator']
  },

  // 52. Google Drive Embed Generator
  {
    id: 'google-drive-embed-generator',
    slug: 'google-drive-embed-generator',
    name: 'Google Drive Embed Code Generator',
    category: 'google-drive-cloud',
    description: 'Generate clean, responsive HTML iframe embed code for Google Drive PDF files, documents, and videos.',
    seoTitle: 'Google Drive Embed Code Generator – Responsive Iframes | PTools',
    seoDescription: 'Generate responsive HTML iframe embed codes for Google Drive files, PDFs, videos, and slides for your website.',
    keywords: ['google drive embed', 'embed drive pdf', 'drive iframe generator', 'embed document'],
    icon: 'Code',
    featured: false,
    popular: true,
    status: 'active',
    howToUse: [
      'Paste the Google Drive sharing URL.',
      'Set target width, height, and border options.',
      'Preview the live embed and copy the HTML snippet.'
    ],
    features: [
      'Responsive aspect ratio wrapper code option',
      'Live interactive preview frame',
      'Custom dimensions control',
      'One-click HTML snippet copy'
    ],
    faqs: [
      {
        question: 'Can visitors view the embedded file on mobile?',
        answer: 'Yes, the generated responsive container adapts smoothly to mobile, tablet, and desktop screens.'
      }
    ],
    relatedTools: ['google-drive-direct-download-link-generator', 'html-formatter']
  },

  // 53. Google Drive Storage Analyzer & Architecture
  {
    id: 'google-drive-storage-analyzer',
    slug: 'google-drive-storage-analyzer',
    name: 'Google Drive Storage & File Manager',
    category: 'google-drive-cloud',
    description: 'OAuth-ready Google Drive workspace integration for analyzing storage, finding large files, and managing permissions securely.',
    seoTitle: 'Google Drive Storage Analyzer & File Manager | PTools',
    seoDescription: 'Inspect Google Drive storage, find large duplicates, manage file sharing permissions securely via client-side Google OAuth.',
    keywords: ['google drive storage', 'drive analyzer', 'drive duplicate finder', 'google drive oauth'],
    icon: 'HardDrive',
    featured: true,
    popular: true,
    status: 'active',
    requiresApi: true,
    howToUse: [
      'Connect your Google Drive securely via Google OAuth 2.0.',
      'Analyze your storage breakdown across file types and folders.',
      'Find large files taking up quota without uploading credentials.'
    ],
    features: [
      'OAuth 2.0 client-side authentication protocol',
      'Minimal scope permissions requested (read-only metadata)',
      'Instant disconnect button allowing complete permission revocation',
      'Interactive storage category visualizer'
    ],
    faqs: [
      {
        question: 'Does PTools store my Google Drive files or password?',
        answer: 'Never. PTools strictly uses standard Google OAuth 2.0 tokens directly with Google\'s APIs. Your files remain exclusively in your Google account.'
      }
    ],
    relatedTools: ['google-drive-direct-download-link-generator', 'google-drive-embed-generator']
  },

  // 54. Scientific Calculator
  {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'calculators',
    description: 'Perform advanced mathematical operations including trigonometric (sin, cos, tan), logarithmic, exponential, and power calculations.',
    seoTitle: 'Scientific Calculator Online – Advanced Math Calculator | PTools',
    seoDescription: 'Free online scientific calculator. Calculate trigonometry, logarithms, square roots, powers, and pi with keyboard support and precision.',
    keywords: ['scientific calculator', 'advanced calculator', 'trigonometry calculator', 'math calculator', 'sin cos tan'],
    icon: 'Calculator',
    featured: true,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter mathematical expressions using the scientific keypad or keyboard.',
      'Switch between Radians (RAD) and Degrees (DEG) modes as needed.',
      'Click equals (=) or press Enter to compute the exact result.'
    ],
    features: ['Trigonometric functions (sin, cos, tan)', 'Logarithmic (ln, log10) & powers', 'RAD / DEG mode toggle', 'Keyboard shortcuts'],
    faqs: [{ question: 'Does this calculator support radians and degrees?', answer: 'Yes, you can toggle between RAD and DEG with one click.' }],
    relatedTools: ['basic-calculator', 'percentage-calculator', 'loan-emi-calculator']
  },

  // 55. Loan & EMI Calculator
  {
    id: 'loan-emi-calculator',
    slug: 'loan-emi-calculator',
    name: 'Loan & EMI Mortgage Calculator',
    category: 'business',
    description: 'Calculate monthly loan EMI payments, total interest payable, and total payment for home, auto, or personal loans.',
    seoTitle: 'Loan & Mortgage EMI Calculator – Monthly Payment Breakdown | PTools',
    seoDescription: 'Calculate monthly loan EMI and total interest for mortgages, car loans, and personal financing. Accurate real-time amortization math.',
    keywords: ['loan calculator', 'emi calculator', 'mortgage calculator', 'monthly payment', 'interest calculator'],
    icon: 'DollarSign',
    featured: true,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter the total principal loan amount.',
      'Enter annual interest rate percentage.',
      'Enter loan tenure in years to calculate monthly EMI.'
    ],
    features: ['Exact monthly EMI calculation', 'Total interest breakdown', 'Principal vs Interest split', 'One-click copy'],
    faqs: [{ question: 'What formula is used for EMI?', answer: 'Standard financial amortization: E = P * r * (1+r)^n / ((1+r)^n - 1).' }],
    relatedTools: ['discount-calculator', 'basic-calculator', 'invoice-generator']
  },

  // 56. Tip & Split Bill Calculator
  {
    id: 'tip-calculator',
    slug: 'tip-calculator',
    name: 'Tip & Split Bill Calculator',
    category: 'business',
    description: 'Calculate restaurant tips and split total dinner bills evenly among friends with custom percentages.',
    seoTitle: 'Tip & Split Bill Calculator – Fast Restaurant Gratuity | PTools',
    seoDescription: 'Calculate tip amounts and split bills fairly among groups. Instant percentage presets (15%, 18%, 20%) with per-person breakdown.',
    keywords: ['tip calculator', 'split bill', 'restaurant tip', 'gratuity calculator', 'bill splitter'],
    icon: 'DollarSign',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter the raw bill amount before tip.',
      'Select a tip percentage preset or enter custom value.',
      'Enter number of people sharing the check to see cost per person.'
    ],
    features: ['Tip presets (10%, 15%, 18%, 20%, 25%)', 'Even group bill splitting', 'Per-person amount breakdown', 'Instant copy'],
    faqs: [{ question: 'Does this calculate tax on tip?', answer: 'It calculates tip directly on the bill amount provided.' }],
    relatedTools: ['discount-calculator', 'basic-calculator', 'percentage-calculator']
  },

  // 57. Discount & Sales Tax Calculator
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    name: 'Discount & Sales Tax Calculator',
    category: 'business',
    description: 'Calculate final prices after store sales discounts and local sales tax/VAT additions.',
    seoTitle: 'Discount & Sales Tax Calculator – Calculate Shopping Savings | PTools',
    seoDescription: 'Find your final shopping price with discounts and sales tax combined. Displays exact savings amount and tax added.',
    keywords: ['discount calculator', 'sales tax calculator', 'vat calculator', 'shopping savings', 'percent off'],
    icon: 'Percent',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter the original retail price.',
      'Enter the discount percentage (e.g. 20%).',
      'Enter sales tax / VAT percentage to view final out-of-pocket price.'
    ],
    features: ['Dual discount and tax calculation', 'Displays total dollar savings', 'Clean formula breakdown', 'Instant copy'],
    faqs: [{ question: 'Is tax calculated before or after discount?', answer: 'In standard retail, tax is applied to the discounted sale price.' }],
    relatedTools: ['tip-calculator', 'percentage-calculator', 'loan-emi-calculator']
  },

  // 58. Date Difference & Business Days Calculator
  {
    id: 'date-difference-calculator',
    slug: 'date-difference-calculator',
    name: 'Date Difference & Working Days Calculator',
    category: 'date-time',
    description: 'Calculate exact calendar days, weeks, months, and working business days between two dates.',
    seoTitle: 'Date Difference & Business Days Calculator | PTools',
    seoDescription: 'Calculate the duration between two dates in total days, weeks, and business days (excluding weekends) online.',
    keywords: ['date difference', 'days between dates', 'business days calculator', 'working days', 'date duration'],
    icon: 'Calendar',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Select a start date.',
      'Select an end date.',
      'View total calendar days, business days, and week breakdown immediately.'
    ],
    features: ['Excludes weekends for business day counts', 'Shows weeks and remainder days', 'Leap year compliant', 'Fast calculation'],
    faqs: [{ question: 'Are public holidays excluded?', answer: 'Business days count excludes Saturdays and Sundays.' }],
    relatedTools: ['age-calculator', 'timestamp-converter', 'countdown-timer']
  },

  // 59. Fuel Cost Calculator
  {
    id: 'fuel-cost-calculator',
    slug: 'fuel-cost-calculator',
    name: 'Fuel Cost & Road Trip Calculator',
    category: 'calculators',
    description: 'Estimate total gas and fuel costs for road trips and commutes based on vehicle MPG and gas prices.',
    seoTitle: 'Fuel Cost Calculator – Road Trip Gas Expense Estimator | PTools',
    seoDescription: 'Calculate fuel expenses for road trips and daily driving. Estimates total gallons and fuel price with round-trip support.',
    keywords: ['fuel cost calculator', 'gas calculator', 'road trip cost', 'mpg calculator', 'commute fuel'],
    icon: 'Fuel',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter total trip distance.',
      'Enter vehicle fuel economy (MPG).',
      'Enter current gas price per gallon.',
      'Toggle Round Trip if returning along same route.'
    ],
    features: ['Gallons required estimation', 'Round trip toggle', 'Real-time cost update', 'One-click copy'],
    faqs: [{ question: 'Can I use kilometers?', answer: 'Yes, just keep distance and consumption units consistent.' }],
    relatedTools: ['basic-calculator', 'unit-converter', 'discount-calculator']
  },

  // 60. Number Base Converter
  {
    id: 'number-base-converter',
    slug: 'number-base-converter',
    name: 'Number Base Converter (Binary, Hex, Dec, Oct)',
    category: 'converters',
    description: 'Convert numbers bidirectionally between Decimal, Binary, Hexadecimal, and Octal formats.',
    seoTitle: 'Number Base Converter – Decimal, Binary, Hex, Octal | PTools',
    seoDescription: 'Convert numbers between base 10 (decimal), base 2 (binary), base 16 (hexadecimal), and base 8 (octal) in real time.',
    keywords: ['number base converter', 'binary to decimal', 'hex to decimal', 'decimal to binary', 'octal converter'],
    icon: 'Binary',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Type a number into any field (Decimal, Binary, Hex, or Octal).',
      'All other numerical base representations synchronize automatically.'
    ],
    features: ['Bidirectional 4-base conversion', 'Real-time synchronization', 'Copy buttons for all formats', 'High number support'],
    faqs: [{ question: 'What is base 16 used for?', answer: 'Hexadecimal is commonly used in programming and memory addressing.' }],
    relatedTools: ['roman-numeral-converter', 'base64-encoder', 'uuid-generator']
  },

  // 61. Roman Numeral Converter
  {
    id: 'roman-numeral-converter',
    slug: 'roman-numeral-converter',
    name: 'Roman Numeral Converter',
    category: 'converters',
    description: 'Convert standard numbers into ancient Roman numerals and decode Roman numerals back into numbers.',
    seoTitle: 'Roman Numeral Converter – Numbers to Roman Numerals | PTools',
    seoDescription: 'Convert numbers to Roman numerals and Roman numerals to numbers online. Supports values 1 to 3999 with instant validation.',
    keywords: ['roman numeral converter', 'numbers to roman', 'roman numerals', 'roman numerals 2026', 'ancient numbers'],
    icon: 'Hash',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter an Arabic number (1-3999) or type Roman letters (I, V, X, L, C, D, M).',
      'The opposite format updates immediately with accurate validation.'
    ],
    features: ['Full 1-3999 range support', 'Bidirectional instant translation', 'Capitalization auto-formatting', 'Copy affordance'],
    faqs: [{ question: 'What is 2026 in Roman numerals?', answer: '2026 is MMXXVI.' }],
    relatedTools: ['number-base-converter', 'number-to-words-converter', 'unit-converter']
  },

  // 62. Number to Words Converter
  {
    id: 'number-to-words-converter',
    slug: 'number-to-words-converter',
    name: 'Number to Words Converter',
    category: 'converters',
    description: 'Convert numbers and currency figures into written English words for checks, contracts, and legal documents.',
    seoTitle: 'Number to Words Converter – Numbers to English Words | PTools',
    seoDescription: 'Convert digits into spelled-out English words. Includes currency mode for writing bank checks and invoices accurately.',
    keywords: ['number to words', 'spell numbers', 'numbers for checks', 'words converter', 'spelling numbers'],
    icon: 'FileText',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Type or paste any numeric value.',
      'Toggle Currency Format if writing for checks or invoices.',
      'Copy the spelled-out words with one click.'
    ],
    features: ['Billions and millions scale support', 'Check writing currency format', 'Decimals and cents support', 'One-click copy'],
    faqs: [{ question: 'Can this be used for writing checks?', answer: 'Yes, check the "Currency Format" toggle to generate formal dollars and cents wording.' }],
    relatedTools: ['roman-numeral-converter', 'word-counter', 'invoice-generator']
  },

  // 63. Text Diff Viewer
  {
    id: 'text-diff-viewer',
    slug: 'text-diff-viewer',
    name: 'Text Diff & Comparison Checker',
    category: 'text-tools',
    description: 'Compare two text snippets or documents side-by-side to highlight added, modified, and deleted lines.',
    seoTitle: 'Text Diff Checker – Compare Two Texts Online | PTools',
    seoDescription: 'Compare text files, documents, and code snippets online. Visual side-by-side line comparison with addition and deletion highlights.',
    keywords: ['text diff', 'compare text', 'diff checker', 'text comparison', 'find text differences'],
    icon: 'GitCompare',
    featured: true,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Paste your original text in the left pane.',
      'Paste your modified text in the right pane.',
      'Review line-by-line differences highlighted in red and green.'
    ],
    features: ['Line-by-line comparison', 'Visual red/green diff indicators', 'Zero data uploaded to servers', 'Line numbering'],
    faqs: [{ question: 'Is my text sent to a server?', answer: 'No, comparison runs locally in browser memory.' }],
    relatedTools: ['find-and-replace', 'sort-lines', 'word-counter']
  },

  // 64. Find and Replace Tool
  {
    id: 'find-and-replace',
    slug: 'find-and-replace',
    name: 'Find and Replace Text Tool',
    category: 'text-tools',
    description: 'Find words, phrases, or regex patterns within text and replace them globally with instant match counters.',
    seoTitle: 'Find and Replace Text Online – Global String Replacer | PTools',
    seoDescription: 'Find and replace words, symbols, and characters in text documents. Supports case sensitivity and match count statistics.',
    keywords: ['find and replace', 'text replacer', 'replace words', 'search and replace', 'text modifier'],
    icon: 'Search',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Paste your source text.',
      'Enter the word or phrase to find.',
      'Enter replacement text and toggle case matching if required.',
      'Copy updated text.'
    ],
    features: ['Match case sensitivity toggle', 'Live replaced match counter', 'Handles multi-line blocks', 'One-click copy'],
    faqs: [{ question: 'Does this replace all occurrences?', answer: 'Yes, it replaces all matching occurrences across the entire text.' }],
    relatedTools: ['text-cleaner', 'text-diff-viewer', 'text-case-converter']
  },

  // 65. Sort Lines Tool
  {
    id: 'sort-lines',
    slug: 'sort-lines',
    name: 'Sort Lines Alphabetically & by Length',
    category: 'text-tools',
    description: 'Sort lists and text lines alphabetically (A-Z, Z-A) or by string length (shortest to longest).',
    seoTitle: 'Sort Lines Online – Alphabetical & Length Line Sorter | PTools',
    seoDescription: 'Sort text lines alphabetically (A to Z, Z to A) or by character length. Clean up lists, tags, and data columns instantly.',
    keywords: ['sort lines', 'alphabetical sorter', 'sort list a-z', 'sort text', 'line sorter'],
    icon: 'ArrowUpDown',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Paste multi-line text into editor.',
      'Click A-Z, Z-A, Shortest First, or Longest First.',
      'Copy sorted list.'
    ],
    features: ['A-Z and Z-A sorting', 'Length-based sorting', 'Preserves Unicode characters', 'One-click copy'],
    faqs: [{ question: 'Can this sort numbers?', answer: 'Yes, lines starting with numbers sort according to alphanumeric order.' }],
    relatedTools: ['remove-duplicate-lines', 'text-cleaner', 'find-and-replace']
  },

  // 66. Reverse Text Tool
  {
    id: 'reverse-text',
    slug: 'reverse-text',
    name: 'Reverse Text & Word Order Tool',
    category: 'text-tools',
    description: 'Reverse text strings character-by-character, reverse word order, or flip letters within individual words.',
    seoTitle: 'Reverse Text Online – Backwards Text & Word Flipper | PTools',
    seoDescription: 'Flip words and letters backwards. Reverse entire strings, reverse word order, or reverse each word individually.',
    keywords: ['reverse text', 'backwards text', 'flip text', 'reverse words', 'string inverter'],
    icon: 'FileText',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Paste or type text.',
      'Select Reverse Entire Text, Reverse Word Order, or Reverse Each Word.',
      'Copy the flipped result.'
    ],
    features: ['3 distinct reversing modes', 'Real-time string inversion', 'Handles emojis and punctuation', 'One-click copy'],
    faqs: [{ question: 'What is word-order reversal?', answer: '"Hello World" becomes "World Hello".' }],
    relatedTools: ['text-case-converter', 'word-counter', 'rot13-encoder']
  },

  // 67. Word Frequency Counter
  {
    id: 'word-frequency-counter',
    slug: 'word-frequency-counter',
    name: 'Word Frequency & Keyword Counter',
    category: 'text-tools',
    description: 'Analyze word frequency occurrences and extract repeated keywords with occurrence counts.',
    seoTitle: 'Word Frequency Counter – Keyword Density & Occurrences | PTools',
    seoDescription: 'Analyze text to discover most frequent words and repeated phrases. Displays occurrence count for SEO and content writing.',
    keywords: ['word frequency', 'keyword density', 'repeated words', 'word count frequency', 'content analyzer'],
    icon: 'FileText',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Paste text into the analyzer box.',
      'Review table of unique words sorted by highest frequency count.'
    ],
    features: ['Counts unique words', 'Sorted by most frequent', 'Strips punctuation for clean analysis', 'Fast in-memory parsing'],
    faqs: [{ question: 'Does this count common stop words?', answer: 'It analyzes all words in text to provide complete transparency.' }],
    relatedTools: ['word-counter', 'character-counter', 'meta-tag-generator']
  },

  // 68. JWT (JSON Web Token) Decoder
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    name: 'JWT (JSON Web Token) Decoder',
    category: 'developer-tools',
    description: 'Decode and inspect JSON Web Tokens (JWT) into readable Header, Payload claims, and Expiration status client-side.',
    seoTitle: 'JWT Decoder Online – Decode JSON Web Tokens Client-Side | PTools',
    seoDescription: 'Decode JSON Web Tokens (JWT) online without sending secrets to any server. Inspect claims, header algorithms, and expiration status.',
    keywords: ['jwt decoder', 'decode jwt', 'json web token', 'jwt claims', 'jwt debugger'],
    icon: 'Key',
    featured: true,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Paste your encoded JWT string (header.payload.signature).',
      'View parsed Header JSON and Payload claims with expiration timestamp diagnostics.'
    ],
    features: ['100% Client-side decoding (zero server transmission)', 'Expiration date check and countdown', 'Header and Payload JSON view', 'Copy affordances'],
    faqs: [{ question: 'Are tokens sent across the internet?', answer: 'Never. Decoding uses browser base64 parsing only.' }],
    relatedTools: ['base64-decoder', 'hmac-generator', 'json-formatter']
  },

  // 69. HMAC Generator
  {
    id: 'hmac-generator',
    slug: 'hmac-generator',
    name: 'HMAC Generator (SHA-256, SHA-512)',
    category: 'security',
    description: 'Generate Hash-based Message Authentication Codes (HMAC) using cryptographic secret keys and Web Crypto API.',
    seoTitle: 'HMAC Generator – SHA-256, SHA-512 Authentication Hashes | PTools',
    seoDescription: 'Calculate HMAC authentication hashes for API signatures and data integrity using browser SubtleCrypto hardware acceleration.',
    keywords: ['hmac generator', 'hmac sha256', 'hmac sha512', 'api signature', 'cryptography'],
    icon: 'ShieldCheck',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter your message data.',
      'Enter your secret signing key.',
      'Select algorithm (SHA-256, SHA-512) and click Compute HMAC.'
    ],
    features: ['Built using Web Crypto API', 'SHA-256, SHA-512, SHA-384, SHA-1 support', 'Hex output', 'Copy button'],
    faqs: [{ question: 'What is HMAC used for?', answer: 'HMAC verifies both data integrity and authenticity of messages between systems.' }],
    relatedTools: ['hash-generator', 'password-generator', 'jwt-decoder']
  },

  // 70. HTML Entity Encoder & Decoder
  {
    id: 'html-entity-encoder',
    slug: 'html-entity-encoder',
    name: 'HTML Entity Encoder & Decoder',
    category: 'encoding-decoding',
    description: 'Convert special symbols (<, >, &, \", \') into safe HTML entities and decode entities back to readable text.',
    seoTitle: 'HTML Entity Encoder & Decoder – Convert Special Characters | PTools',
    seoDescription: 'Escape special characters into HTML entities (&lt;, &gt;, &amp;) for web development and decode encoded HTML entities back.',
    keywords: ['html entity encoder', 'html entities', 'escape html', 'decode html entities', 'special characters'],
    icon: 'Code',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter text or HTML snippet.',
      'Select Encode or Decode mode to transform entities.',
      'Copy the output with one click.'
    ],
    features: ['Encodes <, >, &, quotes', 'Decodes named and numbered HTML entities', 'Instant output', 'One-click copy'],
    faqs: [{ question: 'Why escape HTML characters?', answer: 'Escaping prevents browsers from interpreting text as executable markup or XSS vulnerabilities.' }],
    relatedTools: ['url-encoder', 'html-formatter', 'base64-encoder']
  },

  // 71. ROT13 Cipher
  {
    id: 'rot13-encoder',
    slug: 'rot13-encoder',
    name: 'ROT13 Cipher Encoder & Decoder',
    category: 'encoding-decoding',
    description: 'Encode and decode text using the classic Caesar rotation-13 substitution cipher.',
    seoTitle: 'ROT13 Encoder & Decoder – Classic Rotation Cipher | PTools',
    seoDescription: 'Encode and decode messages using the reciprocal ROT13 Caesar substitution cipher online. Fast, simple, and browser-based.',
    keywords: ['rot13', 'rot13 cipher', 'caesar cipher', 'decode rot13', 'letter rotation'],
    icon: 'Binary',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Type or paste text into the box.',
      'Read and copy the rotated ciphertext.'
    ],
    features: ['Reciprocal Caesar cipher', 'Preserves letter casing and spacing', 'Instant conversion', 'One-click copy'],
    faqs: [{ question: 'Is ROT13 secure encryption?', answer: 'No, ROT13 is a simple obfuscation cipher, not secure cryptography.' }],
    relatedTools: ['morse-code-translator', 'base64-encoder', 'reverse-text']
  },

  // 72. Morse Code Translator with Audio
  {
    id: 'morse-code-translator',
    slug: 'morse-code-translator',
    name: 'Morse Code Translator with Audio',
    category: 'translation-language',
    description: 'Translate text to Morse code and Morse code to text with synthesized audio beep playback.',
    seoTitle: 'Morse Code Translator with Audio Playback | PTools',
    seoDescription: 'Translate text to Morse code dots and dashes, and decode Morse to text. Includes Web Audio sound player for real Morse beeps.',
    keywords: ['morse code translator', 'morse code audio', 'text to morse', 'morse code beeps', 'telegraph code'],
    icon: 'Languages',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Type standard English text or enter Morse dots and dashes.',
      'Click Play Morse Audio to listen to audio beeps.',
      'Copy the translated code.'
    ],
    features: ['Web Audio API synthesized beeps', 'Bidirectional translation', 'International Morse Code standard', 'One-click copy'],
    faqs: [{ question: 'How is spacing represented in Morse code?', answer: 'Letters are separated by spaces, and words are separated by slashes (/).' }],
    relatedTools: ['rot13-encoder', 'number-base-converter', 'base64-encoder']
  },

  // 73. Regex Tester Tool
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    name: 'Regex Tester & Matcher',
    category: 'developer-tools',
    description: 'Test regular expressions against strings with real-time match highlighting, error detection, and regex flags.',
    seoTitle: 'Regex Tester – Test Regular Expressions Online | PTools',
    seoDescription: 'Test and debug JavaScript regular expressions in real-time. Matches highlighting, capture group counts, and flags support.',
    keywords: ['regex tester', 'regular expression', 'test regex', 'regex debugger', 'pattern matching'],
    icon: 'Code',
    featured: true,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter your regular expression pattern.',
      'Configure flags (g, i, m).',
      'Enter test string to view matches live.'
    ],
    features: ['Real-time regex matching', 'Displays matched tokens', 'Syntax error detection', 'Flag support (g, i, m)'],
    faqs: [{ question: 'What flavor of regex is supported?', answer: 'It uses standard ECMAScript JavaScript regular expressions.' }],
    relatedTools: ['json-formatter', 'find-and-replace', 'slug-generator']
  },

  // 74. URL Parser & Query Inspector
  {
    id: 'url-parser',
    slug: 'url-parser',
    name: 'URL Parser & Query Inspector',
    category: 'url-link-tools',
    description: 'Inspect URL components including protocol, host, port, path, anchor, and query parameter key-value pairs.',
    seoTitle: 'URL Parser – Parse URL Components & Query Parameters | PTools',
    seoDescription: 'Break down complex URLs into protocol, domain, path, hash, and extract all query parameter keys and values clearly.',
    keywords: ['url parser', 'parse url', 'query string parser', 'url components', 'url inspector'],
    icon: 'Link',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Paste any web address or URL with query parameters.',
      'Inspect the structured table of parameters and URL breakdown.'
    ],
    features: ['Extracts all query parameters into key-value rows', 'Port and protocol inspection', 'Client-side URL parsing', 'Clean formatting'],
    faqs: [{ question: 'Does this handle encoded query parameters?', answer: 'Yes, URL parameters are properly decoded for readability.' }],
    relatedTools: ['utm-builder', 'url-encoder', 'url-decoder']
  },

  // 75. User Agent & Device Info
  {
    id: 'user-agent-parser',
    slug: 'user-agent-parser',
    name: 'User Agent & Browser Inspector',
    category: 'device-utility',
    description: 'Inspect your active web browser version, operating system, rendering engine, and device form factor.',
    seoTitle: 'User Agent & Browser Info Inspector | PTools',
    seoDescription: 'View your browser user agent string, detected operating system, browser engine, and device capabilities instantly.',
    keywords: ['user agent parser', 'browser info', 'what is my user agent', 'device info', 'browser diagnostics'],
    icon: 'Laptop',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'browser-api',
    apiDependency: 'browser-api',
    lastTested: '2026-10-03',
    howToUse: [
      'Open the tool to view your current browser and OS diagnostic breakdown immediately.',
      'Copy the raw user agent string if needed for technical support or debugging.'
    ],
    features: ['Detects Chrome, Safari, Firefox, Edge', 'Operating system detection', 'Form factor indicator', 'Raw UA copy'],
    faqs: [{ question: 'What is a User Agent?', answer: 'A user agent is a technical header your browser sends to identify itself to websites.' }],
    relatedTools: ['screen-resolution-checker', 'download-time-calculator', 'ip-info']
  },

  // 76. Screen Resolution & DPI Checker
  {
    id: 'screen-resolution-checker',
    slug: 'screen-resolution-checker',
    name: 'Screen Resolution & Display DPI Checker',
    category: 'device-utility',
    description: 'Measure your monitor screen resolution, viewport dimensions, Device Pixel Ratio (DPR), and color depth.',
    seoTitle: 'Screen Resolution & DPI Checker – Display Dimensions | PTools',
    seoDescription: 'Check your monitor resolution in pixels, window viewport size, Retina DPR scaling factor, and color depth in real time.',
    keywords: ['screen resolution', 'what is my screen resolution', 'dpi checker', 'device pixel ratio', 'viewport size'],
    icon: 'Laptop',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'browser-api',
    apiDependency: 'browser-api',
    lastTested: '2026-10-03',
    howToUse: [
      'Open the page to see your display dimensions in pixels.',
      'Resize your browser window to watch available dimensions update live.'
    ],
    features: ['Exact pixel resolution display', 'Device Pixel Ratio (Retina) detection', 'Available workspace dimensions', 'Color depth bits'],
    faqs: [{ question: 'What is Device Pixel Ratio (DPR)?', answer: 'DPR indicates how many physical screen pixels represent one CSS pixel (e.g. 2x on Retina displays).' }],
    relatedTools: ['user-agent-parser', 'image-resizer', 'css-box-shadow-generator']
  },

  // 77. Bandwidth & Download Time Calculator
  {
    id: 'download-time-calculator',
    slug: 'download-time-calculator',
    name: 'Download & Upload Time Calculator',
    category: 'website-network',
    description: 'Calculate how long large file downloads and uploads will take based on file size and internet connection speed.',
    seoTitle: 'Download Time Calculator – Calculate File Transfer Time | PTools',
    seoDescription: 'Calculate estimated download and upload times for games, movies, and large backups based on your internet bandwidth (Mbps/Gbps).',
    keywords: ['download time calculator', 'file transfer time', 'how long to download', 'bandwidth calculator', 'download speed'],
    icon: 'HardDrive',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter file size and select unit (MB, GB, TB).',
      'Enter your internet speed in Mbps.',
      'View total hours, minutes, and seconds required for file transfer.'
    ],
    features: ['MB, GB, TB file size support', 'Calculates exact hours and minutes', 'Continuous bandwidth math', 'Copy time estimate'],
    faqs: [{ question: 'Why does real download time vary?', answer: 'Real-world speed fluctuates due to server caps, network latency, and Wi-Fi conditions.' }],
    relatedTools: ['unit-converter', 'user-agent-parser', 'image-compressor']
  },

  // 78. CSS Box Shadow Generator
  {
    id: 'css-box-shadow-generator',
    slug: 'css-box-shadow-generator',
    name: 'CSS Box Shadow Generator',
    category: 'design-tools',
    description: 'Design beautiful, subtle CSS box shadows visually with real-time sliders and copy production CSS code.',
    seoTitle: 'CSS Box Shadow Generator – Visual Shadow Maker | PTools',
    seoDescription: 'Create CSS box shadows visually. Adjust blur, spread, X/Y offsets, colors, and inset shadows with live interactive preview.',
    keywords: ['css box shadow', 'shadow generator', 'box shadow maker', 'css shadow', 'web design'],
    icon: 'Layers',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Adjust horizontal and vertical offset sliders.',
      'Adjust blur radius, spread, opacity, and color.',
      'Copy the generated CSS box-shadow rule.'
    ],
    features: ['Live interactive preview box', 'Inset shadow toggle', 'RGBA color alpha support', 'One-click CSS copy'],
    faqs: [{ question: 'Is this CSS compatible with all browsers?', answer: 'Yes, standard box-shadow is universally supported.' }],
    relatedTools: ['glassmorphism-generator', 'gradient-generator', 'color-picker']
  },

  // 79. WCAG Color Contrast Checker
  {
    id: 'wcag-contrast-checker',
    slug: 'wcag-contrast-checker',
    name: 'WCAG Color Contrast Checker',
    category: 'design-tools',
    description: 'Check color contrast ratios against WCAG 2.1 accessibility guidelines for normal and large text (AA & AAA).',
    seoTitle: 'WCAG Color Contrast Checker – Accessibility Compliance | PTools',
    seoDescription: 'Test foreground text and background colors against official WCAG 2.1 AA and AAA accessibility contrast standards.',
    keywords: ['contrast checker', 'wcag contrast', 'color accessibility', 'wcag aa aaa', 'accessible colors'],
    icon: 'Palette',
    featured: true,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Pick a text color and background color.',
      'Review calculated contrast ratio (e.g. 7.5:1).',
      'Check whether your color combination passes WCAG AA and AAA standards.'
    ],
    features: ['Exact luminance ratio formula', 'Normal and Large text compliance', 'Live preview text card', 'WCAG 2.1 standard'],
    faqs: [{ question: 'What is the minimum WCAG AA contrast for normal text?', answer: 'The minimum contrast ratio is 4.5:1 for normal text and 3.0:1 for large text.' }],
    relatedTools: ['color-picker', 'hex-rgb-converter', 'glassmorphism-generator']
  },

  // 80. Glassmorphism CSS Generator
  {
    id: 'glassmorphism-generator',
    slug: 'glassmorphism-generator',
    name: 'Glassmorphism CSS Generator',
    category: 'design-tools',
    description: 'Create frosted glass UI cards with CSS backdrop-filter blur, translucent backgrounds, and borders.',
    seoTitle: 'Glassmorphism CSS Generator – Frosted Glass UI Effect | PTools',
    seoDescription: 'Generate modern frosted glass CSS effects online. Adjust backdrop blur and transparency with live gradient backdrop preview.',
    keywords: ['glassmorphism generator', 'frosted glass css', 'backdrop filter', 'css glass effect', 'modern ui'],
    icon: 'Layers',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Adjust the blur intensity and transparency sliders.',
      'Preview the frosted glass card over vibrant gradient.',
      'Copy the CSS code snippet.'
    ],
    features: ['Live gradient preview', 'Adjustable blur and opacity', 'Vendor-prefixed CSS output', 'One-click copy'],
    faqs: [{ question: 'Do all browsers support backdrop-filter?', answer: 'Yes, modern Chrome, Safari, Edge, and Firefox support backdrop-filter.' }],
    relatedTools: ['css-box-shadow-generator', 'gradient-generator', 'color-picker']
  },

  // 81. Invoice & Receipt Generator
  {
    id: 'invoice-generator',
    slug: 'invoice-generator',
    name: 'Invoice & Receipt Generator',
    category: 'business',
    description: 'Create professional business invoices and client receipts with line items, tax calculations, and printable layout.',
    seoTitle: 'Free Invoice & Receipt Generator Online – Printable Format | PTools',
    seoDescription: 'Generate simple, clean invoices and receipts online. Add items, calculate taxes, and print or export as PDF without signing up.',
    keywords: ['invoice generator', 'receipt generator', 'create invoice', 'free invoice maker', 'billing receipt'],
    icon: 'Receipt',
    featured: true,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Fill in your business name and client name.',
      'Add service or product line items with quantities and prices.',
      'Adjust tax percentage if needed and click Print / Save as PDF.'
    ],
    features: ['Dynamic line item additions', 'Automatic subtotal and tax calculation', 'Browser print and PDF export ready', 'Clean formatting'],
    faqs: [{ question: 'Are invoice details saved on your servers?', answer: 'No. Everything is kept inside your browser session for total privacy.' }],
    relatedTools: ['loan-emi-calculator', 'discount-calculator', 'number-to-words-converter']
  },

  // 82. GPA & CGPA Calculator
  {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    name: 'GPA & CGPA College Grade Calculator',
    category: 'education',
    description: 'Calculate your semester GPA and cumulative grade point average on a 4.0 scale with credit hours.',
    seoTitle: 'GPA Calculator – College & High School Grade Point Average | PTools',
    seoDescription: 'Calculate your semester GPA on standard 4.0 scale. Add courses, credit hours, and letter grades (A, B, C, D) with real-time GPA updates.',
    keywords: ['gpa calculator', 'cgpa calculator', 'calculate gpa', 'college grade calculator', 'grade point average'],
    icon: 'GraduationCap',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Add your courses with course names.',
      'Select credit hours and grade earned (A+, A, B, etc.).',
      'View your calculated GPA out of 4.00.'
    ],
    features: ['Standard 4.0 academic scale', 'Add unlimited courses', 'Credit-weighted average', 'Instant calculation'],
    faqs: [{ question: 'What grade scale is used?', answer: 'Standard US 4.0 scale (A=4.0, A-=3.7, B+=3.3, B=3.0, etc.).' }],
    relatedTools: ['citation-generator', 'percentage-calculator', 'countdown-timer']
  },

  // 83. Academic Citation Generator
  {
    id: 'citation-generator',
    slug: 'citation-generator',
    name: 'Academic Citation Generator (APA, MLA, Chicago)',
    category: 'education',
    description: 'Generate accurate academic citations in APA (7th ed), MLA (9th ed), Chicago, and BibTeX formats for research papers.',
    seoTitle: 'Academic Citation Generator – APA, MLA, Chicago, BibTeX | PTools',
    seoDescription: 'Format book, journal, and article citations in APA 7, MLA 9, Chicago, and BibTeX styles for bibliographies and essays.',
    keywords: ['citation generator', 'apa citation', 'mla citation', 'bibtex generator', 'bibliography maker'],
    icon: 'BookOpen',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Select your required citation style (APA, MLA, Chicago, BibTeX).',
      'Fill in author(s), title, year, and publisher.',
      'Copy the formatted citation ready for your bibliography.'
    ],
    features: ['APA 7th edition formatting', 'MLA 9th edition formatting', 'Chicago & BibTeX output', 'One-click copy'],
    faqs: [{ question: 'Are italics included?', answer: 'Yes, citations use standard italics notation for book and journal titles.' }],
    relatedTools: ['gpa-calculator', 'word-counter', 'lorem-ipsum-generator']
  },

  // 84. Barcode Generator
  {
    id: 'barcode-generator',
    slug: 'barcode-generator',
    name: 'Barcode Generator (Code 128 / SKU)',
    category: 'qr-barcode',
    description: 'Generate standard Code 128 barcodes for products, inventory, and packaging with instant SVG vector download.',
    seoTitle: 'Barcode Generator – Free Code 128 Barcodes Online | PTools',
    seoDescription: 'Create scannable Code 128 barcodes online. Enter text or product SKU and download high-resolution SVG barcode vectors.',
    keywords: ['barcode generator', 'code 128', 'free barcode', 'sku barcode', 'product barcode'],
    icon: 'QrCode',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Enter an alphanumeric code, SKU, or product number.',
      'View the generated barcode pattern live.',
      'Download as high-resolution vector SVG.'
    ],
    features: ['Code 128 standard pattern', 'Vector SVG download', 'Crisp scannable rendering', 'No registration required'],
    faqs: [{ question: 'Can barcode scanners read this?', answer: 'Yes, Code 128 is supported by all standard laser and camera barcode scanners.' }],
    relatedTools: ['qr-code-generator', 'email-qr-generator', 'image-resizer']
  },

  // 85. Email & Phone QR Code Generator
  {
    id: 'email-qr-generator',
    slug: 'email-qr-generator',
    name: 'Email & Phone Call QR Code Generator',
    category: 'qr-barcode',
    description: 'Create custom QR codes that automatically open a draft email or start a phone call when scanned.',
    seoTitle: 'Email & Phone QR Code Generator – Direct Contact QR | PTools',
    seoDescription: 'Generate QR codes that trigger an email or direct phone call when scanned with a smartphone camera.',
    keywords: ['email qr code', 'phone qr code', 'mailto qr', 'call qr code', 'contact qr'],
    icon: 'QrCode',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Choose Email or Phone Call mode.',
      'Fill in recipient email/subject or telephone number.',
      'Scan the generated QR code with any smartphone.'
    ],
    features: ['mailto: and tel: URI protocols', 'Immediate camera scanning support', 'Instant client-side rendering', 'No tracking redirects'],
    faqs: [{ question: 'Does scanning dial automatically?', answer: 'On iOS and Android, the smartphone asks the user to confirm before placing the call.' }],
    relatedTools: ['qr-code-generator', 'barcode-generator', 'utm-builder']
  },

  // 86. AI Prompt Formatter & Optimizer
  {
    id: 'prompt-generator',
    slug: 'prompt-generator',
    name: 'AI Prompt Formatter & Structure Optimizer',
    category: 'ai-tools',
    description: 'Structure and optimize AI prompts with explicit roles, context, rules, and structured output formatting.',
    seoTitle: 'AI Prompt Formatter & Structure Optimizer | PTools',
    seoDescription: 'Structure AI prompts professionally for Gemini, Claude, and GPT models with role definition, context boundaries, and output contracts.',
    keywords: ['ai prompt generator', 'prompt engineering', 'structure prompt', 'gemini prompt', 'prompt optimizer'],
    icon: 'Cpu',
    featured: true,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Define the AI role and objective.',
      'Provide tech stack context and rules/constraints.',
      'Copy the engineered, high-performance structured prompt.'
    ],
    features: ['Framework-based prompt structuring', 'Role, Context, Constraints hierarchy', 'Prevents AI hallucinations', 'One-click copy'],
    faqs: [{ question: 'Does this work with Gemini and ChatGPT?', answer: 'Yes, clear structured prompts improve output quality across all major LLMs.' }],
    relatedTools: ['token-calculator', 'lorem-ipsum-generator', 'json-formatter']
  },

  // 87. LLM Token & Character Estimator
  {
    id: 'token-calculator',
    slug: 'token-calculator',
    name: 'LLM Token & Character Estimator',
    category: 'ai-tools',
    description: 'Estimate token counts, character lengths, and word ratios for modern Large Language Models.',
    seoTitle: 'LLM Token Estimator – Token Count Calculator for AI | PTools',
    seoDescription: 'Calculate estimated token counts and character ratios for LLM prompts and API payloads client-side without API keys.',
    keywords: ['token calculator', 'llm tokens', 'token count', 'gpt token counter', 'gemini tokens'],
    icon: 'Cpu',
    featured: false,
    popular: true,
    status: 'active',
    implementationType: 'client-side',
    apiDependency: 'none',
    lastTested: '2026-10-03',
    howToUse: [
      'Paste your draft prompt or document text.',
      'View estimated tokens, character count, and word total immediately.'
    ],
    features: ['Standard BPE token approximation (~4 chars/token)', 'Live updating counter', 'Word and character metrics', 'Zero network calls'],
    faqs: [{ question: 'How is token count estimated?', answer: 'In English prose, 1 token is roughly equivalent to 4 characters or 0.75 words.' }],
    relatedTools: ['prompt-generator', 'word-counter', 'character-counter']
  }
];
