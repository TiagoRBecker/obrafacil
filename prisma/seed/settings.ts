import { prisma } from './prisma';

export const createSettings = async () => {
  const email = process.env.EMAIL;
 await prisma.settings.upsert({
    where: {
      email: email,
    },
    update: {
      businessName:process.env.BUSINESS_NAME,
      address: process.env.ADDRESS,
      logoUrl:process.env.LOGO_URL,
      defaultBillingUnit: process.env.DEFAULT_BILLING_UNIT as string,
      phone:process.env.PHONE_BUSINESS as string,
      proposalTerms:process.env.PROPOSAL_TERMS,
      specialty:process.env.SPECIALTY as string,
      warrantyTerms:process.env.WARRANTY_TERMS,
      proposalValidityDays: parseInt(process.env.PROPOSAL_VALIDITY_DAYS as string)
    },
    create: {
      email: email as string,
      businessName:process.env.BUSINESS_NAME,
      address: process.env.ADDRESS,
      logoUrl:process.env.LOGO_URL,
      defaultBillingUnit: process.env.DEFAULT_BILLING_UNIT as string,
      phone:process.env.PHONE_BUSINESS as string,
      proposalTerms:process.env.PROPOSAL_TERMS,
      specialty:process.env.SPECIALTY as string,
      warrantyTerms:process.env.WARRANTY_TERMS,
      proposalValidityDays: parseInt(process.env.PROPOSAL_VALIDITY_DAYS as string)  ,
    },
  });
  console.log("Settings Empresarial inseridos com sucesso ao iniciar o servidor ")
  return
};









