"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSettings = void 0;
const prisma_1 = require("./prisma");
const createSettings = async () => {
    const email = process.env.EMAIL;
    await prisma_1.prisma.settings.upsert({
        where: {
            email: email,
        },
        update: {
            businessName: process.env.BUSINESS_NAME,
            address: process.env.ADDRESS,
            logoUrl: process.env.LOGO_URL,
            defaultBillingUnit: process.env.DEFAULT_BILLING_UNIT,
            phone: process.env.PHONE_BUSINESS,
            proposalTerms: process.env.PROPOSAL_TERMS,
            specialty: process.env.SPECIALTY,
            warrantyTerms: process.env.WARRANTY_TERMS,
            proposalValidityDays: parseInt(process.env.PROPOSAL_VALIDITY_DAYS)
        },
        create: {
            email: email,
            businessName: process.env.BUSINESS_NAME,
            address: process.env.ADDRESS,
            logoUrl: process.env.LOGO_URL,
            defaultBillingUnit: process.env.DEFAULT_BILLING_UNIT,
            phone: process.env.PHONE_BUSINESS,
            proposalTerms: process.env.PROPOSAL_TERMS,
            specialty: process.env.SPECIALTY,
            warrantyTerms: process.env.WARRANTY_TERMS,
            proposalValidityDays: parseInt(process.env.PROPOSAL_VALIDITY_DAYS),
        },
    });
    console.log("Settings Empresarial inseridos com sucesso ao iniciar o servidor ");
    return;
};
exports.createSettings = createSettings;
//# sourceMappingURL=settings.js.map