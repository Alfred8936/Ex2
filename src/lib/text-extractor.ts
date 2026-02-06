import { PDFParse } from 'pdf-parse'

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const pdfParser = new PDFParse({ data: buffer })
    const result = await pdfParser.getText()
    return result.text || ''
  } catch (error) {
    console.error('Error extracting text from PDF:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

export function extractTextFromTXT(buffer: Buffer): string {
  return buffer.toString('utf-8')
}
