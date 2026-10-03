import React from 'react';
import { Tool } from '../../types';
import { BasicCalculator, PercentageCalculator, AgeCalculator, BmiCalculator, UnitConverter } from './CalculatorTools';
import { WordCounter, CharacterCounter, TextCaseConverter, RemoveDuplicateLines, TextCleaner, LoremIpsumGenerator, SlugGenerator } from './TextTools';
import { Base64Encoder, Base64Decoder, UrlEncoder, UrlDecoder, UuidGenerator, PasswordGenerator, HashGenerator } from './EncodingTools';
import { JsonFormatter, JsonValidator, JsonMinifier, HtmlFormatter, CssFormatter, JavascriptFormatter, CsvToJson, JsonToCsv, MarkdownToHtml, HtmlToMarkdown } from './CodeFormatterTools';
import { ColorPickerTool, HexRgbConverter, GradientGenerator } from './ColorTools';
import { QrCodeGenerator, ImageCompressor, ImageResizer, ImageFormatConverter, ImageToBase64 } from './ImageTools';
import { PdfMerger, PdfSplitter, PdfCompressor, JpgToPdf } from './PdfTools';
import { TimestampConverter, CountdownTimer, Stopwatch } from './DateTimeTools';
import { UtmBuilder, MetaTagGenerator, RobotsTxtGenerator } from './SeoMarketingTools';
import { GoogleDriveDirectLink, GoogleDriveEmbedGenerator, GoogleDriveStorageAnalyzer } from './GoogleDriveTools';
import { ScientificCalculator, LoanEmiCalculator, TipSplitBillCalculator, DiscountTaxCalculator, DateDifferenceCalculator, FuelCostCalculator } from './AdvancedCalculators';
import { NumberBaseConverter, RomanNumeralConverter, NumberToWordsConverter } from './AdvancedConverters';
import { TextDiffViewer, FindAndReplaceTool, SortLinesTool, ReverseTextTool, WordFrequencyCounter } from './AdvancedTextTools';
import { JwtDecoderTool, HmacGeneratorTool, HtmlEntityEncoderDecoder, Rot13Tool, MorseCodeTool, RegexTesterTool } from './AdvancedSecurityDevTools';
import { UrlParserTool, UserAgentParserTool, ScreenResolutionDpiTool, BandwidthDownloadTimeCalculator } from './WebNetworkTools';
import { CssShadowGenerator, WcagContrastChecker, GlassmorphismGenerator } from './DesignCssTools';
import { InvoiceReceiptGenerator, GpaCgpaCalculator, AcademicCitationGenerator } from './BusinessEducationTools';
import { BarcodeGeneratorTool, EmailPhoneQrGenerator } from './BarcodeQrTools';
import { PromptEngineeringFormatter, LlmTokenEstimator } from './AiTools';

interface ToolRunnerProps {
  tool: Tool;
}

export const ToolRunner: React.FC<ToolRunnerProps> = ({ tool }) => {
  switch (tool.slug) {
    // Calculators & Converters
    case 'basic-calculator': return <BasicCalculator />;
    case 'percentage-calculator': return <PercentageCalculator />;
    case 'age-calculator': return <AgeCalculator />;
    case 'bmi-calculator': return <BmiCalculator />;
    case 'unit-converter': return <UnitConverter />;
    case 'scientific-calculator': return <ScientificCalculator />;
    case 'loan-emi-calculator': return <LoanEmiCalculator />;
    case 'tip-calculator': return <TipSplitBillCalculator />;
    case 'discount-calculator': return <DiscountTaxCalculator />;
    case 'date-difference-calculator': return <DateDifferenceCalculator />;
    case 'fuel-cost-calculator': return <FuelCostCalculator />;
    case 'number-base-converter': return <NumberBaseConverter />;
    case 'roman-numeral-converter': return <RomanNumeralConverter />;
    case 'number-to-words-converter': return <NumberToWordsConverter />;

    // Text tools
    case 'word-counter': return <WordCounter />;
    case 'character-counter': return <CharacterCounter />;
    case 'text-case-converter': return <TextCaseConverter />;
    case 'remove-duplicate-lines': return <RemoveDuplicateLines />;
    case 'text-cleaner': return <TextCleaner />;
    case 'lorem-ipsum-generator': return <LoremIpsumGenerator />;
    case 'slug-generator': return <SlugGenerator />;
    case 'text-diff-viewer': return <TextDiffViewer />;
    case 'find-and-replace': return <FindAndReplaceTool />;
    case 'sort-lines': return <SortLinesTool />;
    case 'reverse-text': return <ReverseTextTool />;
    case 'word-frequency-counter': return <WordFrequencyCounter />;

    // Encoding & Security
    case 'base64-encoder': return <Base64Encoder />;
    case 'base64-decoder': return <Base64Decoder />;
    case 'url-encoder': return <UrlEncoder />;
    case 'url-decoder': return <UrlDecoder />;
    case 'uuid-generator': return <UuidGenerator />;
    case 'password-generator': return <PasswordGenerator />;
    case 'hash-generator': return <HashGenerator />;
    case 'jwt-decoder': return <JwtDecoderTool />;
    case 'hmac-generator': return <HmacGeneratorTool />;
    case 'html-entity-encoder': return <HtmlEntityEncoderDecoder />;
    case 'rot13-encoder': return <Rot13Tool />;
    case 'morse-code-translator': return <MorseCodeTool />;
    case 'regex-tester': return <RegexTesterTool />;

    // Developer & Code
    case 'json-formatter': return <JsonFormatter />;
    case 'json-validator': return <JsonValidator />;
    case 'json-minifier': return <JsonMinifier />;
    case 'html-formatter': return <HtmlFormatter />;
    case 'css-formatter': return <CssFormatter />;
    case 'javascript-formatter': return <JavascriptFormatter />;
    case 'csv-to-json': return <CsvToJson />;
    case 'json-to-csv': return <JsonToCsv />;
    case 'markdown-to-html': return <MarkdownToHtml />;
    case 'html-to-markdown': return <HtmlToMarkdown />;

    // Design & Color
    case 'color-picker': return <ColorPickerTool />;
    case 'hex-rgb-converter': return <HexRgbConverter />;
    case 'gradient-generator': return <GradientGenerator />;
    case 'css-box-shadow-generator': return <CssShadowGenerator />;
    case 'wcag-contrast-checker': return <WcagContrastChecker />;
    case 'glassmorphism-generator': return <GlassmorphismGenerator />;

    // QR & Images
    case 'qr-code-generator': return <QrCodeGenerator />;
    case 'barcode-generator': return <BarcodeGeneratorTool />;
    case 'email-qr-generator': return <EmailPhoneQrGenerator />;
    case 'image-compressor': return <ImageCompressor />;
    case 'image-resizer': return <ImageResizer />;
    case 'jpg-to-png': return <ImageFormatConverter targetFormat="png" title="JPG to PNG Converter" />;
    case 'png-to-jpg': return <ImageFormatConverter targetFormat="jpeg" title="PNG to JPG Converter" />;
    case 'webp-converter': return <ImageFormatConverter targetFormat="webp" title="WebP Converter" />;
    case 'image-to-base64': return <ImageToBase64 />;

    // PDF
    case 'pdf-merger': return <PdfMerger />;
    case 'pdf-splitter': return <PdfSplitter />;
    case 'pdf-compressor': return <PdfCompressor />;
    case 'jpg-to-pdf': return <JpgToPdf />;
    case 'pdf-to-jpg': return <PdfSplitter />;

    // Date & Time
    case 'timestamp-converter': return <TimestampConverter />;
    case 'countdown-timer': return <CountdownTimer />;
    case 'stopwatch': return <Stopwatch />;

    // SEO, URLs & Network
    case 'utm-builder': return <UtmBuilder />;
    case 'meta-tag-generator': return <MetaTagGenerator />;
    case 'robots-txt-generator': return <RobotsTxtGenerator />;
    case 'url-parser': return <UrlParserTool />;
    case 'user-agent-parser': return <UserAgentParserTool />;
    case 'screen-resolution-checker': return <ScreenResolutionDpiTool />;
    case 'download-time-calculator': return <BandwidthDownloadTimeCalculator />;

    // Business & Education
    case 'invoice-generator': return <InvoiceReceiptGenerator />;
    case 'gpa-calculator': return <GpaCgpaCalculator />;
    case 'citation-generator': return <AcademicCitationGenerator />;

    // AI Tools
    case 'prompt-generator': return <PromptEngineeringFormatter />;
    case 'token-calculator': return <LlmTokenEstimator />;

    // Google Drive
    case 'google-drive-direct-download-link-generator': return <GoogleDriveDirectLink />;
    case 'google-drive-embed-generator': return <GoogleDriveEmbedGenerator />;
    case 'google-drive-storage-analyzer': return <GoogleDriveStorageAnalyzer />;

    default:
      return (
        <div className="p-8 text-center text-slate-500">
          <p className="font-semibold text-slate-700 dark:text-slate-300">Tool interface loading</p>
          <p className="text-xs mt-1">This tool runs browser-side client processing.</p>
        </div>
      );
  }
};
