import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { BadRequestException, Logger } from '@nestjs/common';

const logger = new Logger('GenerateOrderPdf');

export async function generateOrderPdf(data: any): Promise<Buffer | undefined> {
  try {

    // 1. Ler template HTML
    const filePath = path.resolve(__dirname, '../template/order.hbs');

    const html = fs.readFileSync(filePath, 'utf-8');

    // 2. Compilar template
    const template = Handlebars.compile(html);

    // 3. Injetar dados
    const finalHtml = template(data);

    // 4. Abrir browser

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setRequestInterception(false);
    // 5. Renderizar HTML
    await page.setContent(finalHtml, {
      waitUntil: 'networkidle0' as any,
    });

    // 6. Gerar PDF
    const pdfUint8 = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    const pdf = Buffer.from(pdfUint8);
    await browser.close();

    return pdf
  } catch (error) {
    logger.error(`Erro ao gerar o buffer pdf`);
    throw new BadRequestException(`Erro ao gerar o pdf  com puppert`);
  }
}
