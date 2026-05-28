"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderPdf = generateOrderPdf;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('GenerateOrderPdf');
async function generateOrderPdf(data) {
    try {
        const filePath = path_1.default.resolve(__dirname, '../template/order.hbs');
        const html = fs_1.default.readFileSync(filePath, 'utf-8');
        const template = handlebars_1.default.compile(html);
        const finalHtml = template(data);
        const browser = await puppeteer_1.default.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.setRequestInterception(false);
        await page.setContent(finalHtml, {
            waitUntil: 'networkidle0',
        });
        const pdfUint8 = await page.pdf({
            format: 'A4',
            printBackground: true,
        });
        const pdf = Buffer.from(pdfUint8);
        await browser.close();
        return pdf;
    }
    catch (error) {
        logger.error(`Erro ao gerar o buffer pdf`);
        throw new common_1.BadRequestException(`Erro ao gerar o pdf  com puppert`);
    }
}
//# sourceMappingURL=generateOrderPdf.js.map