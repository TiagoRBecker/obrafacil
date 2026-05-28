"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestData = void 0;
const { faker } = require('@faker-js/faker');
const prisma_1 = require("./prisma");
const BILLING_TYPES = ['hour', 'fixed', 'daily', 'monthly'];
const TEAM_STATUS = ['FREE', 'BUSY', 'ON_VACATION'];
const ORDER_STATUS = ['PENDENTE', 'APROVADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'];
const MATERIAL_UNITS = ['un', 'm', 'm²', 'kg', 'L', 'cx', 'pct'];
const SERVICE_NAMES = [
    'Instalação elétrica residencial',
    'Manutenção preventiva',
    'Troca de disjuntores',
    'Instalação de chuveiro',
    'Quadro de distribuição',
    'Aterramento elétrico',
    'Instalação de luminárias',
    'Automação residencial',
    'Projeto elétrico',
    'Laudo técnico',
    'Instalação de ar condicionado',
    'Cabeamento estruturado',
    'Sistema de segurança',
    'Painel solar',
    'Motor de portão',
];
const MATERIAL_NAMES = [
    'Cabo flexível 2.5mm',
    'Cabo flexível 4mm',
    'Cabo flexível 6mm',
    'Disjuntor monopolar 10A',
    'Disjuntor bipolar 20A',
    'Disjuntor tripolar 40A',
    'Tomada 10A branca',
    'Interruptor simples',
    'Interruptor paralelo',
    'Eletroduto corrugado 3/4',
    'Eletroduto corrugado 1"',
    'Caixa de passagem 4x4',
    'Fita isolante',
    'Conector de emenda',
    'Braçadeira nylon',
    'Quadro de distribuição 12 módulos',
    'Quadro de distribuição 18 módulos',
    'DPS Classe II',
    'DR bipolar 25A',
    'Disjuntor monopolares 16A',
];
const CITIES = [
    'São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo', 'Santo André',
    'Osasco', 'Barueri', 'Santos', 'Jundiaí', 'Sorocaba',
    'Ribeirão Preto', 'São José dos Campos', 'Taubaté', 'Mogi das Cruzes', 'Suzano',
    'Americana', 'Indaiatuba', 'Vinhedo', 'Valinhos', 'Itu',
];
const STREETS = [
    'Rua das Flores', 'Av. Paulista', 'Rua Augusta', 'Rua Oscar Freire',
    'Av. Brigadeiro', 'Rua da Consolação', 'Rua 7 de Setembro', 'Av. Brasil',
    'Rua do Contorno', 'Rua XV de Novembro', 'Rua Marquês de Itu', 'Av. São João',
];
const createTestData = async () => {
    const adminRole = await prisma_1.prisma.role.findUnique({ where: { name: 'ADMIN' } });
    const userRole = await prisma_1.prisma.role.findUnique({ where: { name: 'USER' } });
    const existingAccounts = await prisma_1.prisma.account.findMany({ take: 1 });
    const operatorEmails = [
        'joao@eletrica.com',
        'maria@eletrica.com',
        'carlos@eletrica.com',
        'ana@eletrica.com',
        'pedro@eletrica.com',
    ];
    const operators = await Promise.all(operatorEmails.map((email, i) => prisma_1.prisma.account.upsert({
        where: { email },
        update: {},
        create: {
            name: faker.person.fullName(),
            email,
            password: '$2b$10$dummy_hash_placeholder',
            roleId: userRole?.id,
        },
    })));
    const customers = await Promise.all(Array.from({ length: 30 }, (_, i) => prisma_1.prisma.customer.upsert({
        where: { phone: `(11) 9${String(9000 + i).padStart(4, '0')}-${String(1000 + i).padStart(4, '0')}` },
        update: {},
        create: {
            name: faker.person.fullName(),
            phone: `(11) 9${String(9000 + i).padStart(4, '0')}-${String(1000 + i).padStart(4, '0')}`,
            address: `${STREETS[i % STREETS.length]}, ${faker.location.buildingNumber()}`,
            city: CITIES[i % CITIES.length],
            service: SERVICE_NAMES[i % SERVICE_NAMES.length],
        },
    })));
    const teamMembers = await Promise.all(Array.from({ length: 12 }, (_, i) => prisma_1.prisma.team.upsert({
        where: { email: `tecnico${i + 1}@eletrica.com` },
        update: {},
        create: {
            name: faker.person.fullName(),
            jobTitle: ['Eletricista', 'Técnico', 'Engenheiro', 'Auxiliar', 'Supervisor'][i % 5],
            email: `tecnico${i + 1}@eletrica.com`,
            phone: `(11) 9${String(8000 + i).padStart(4, '0')}-${String(2000 + i).padStart(4, '0')}`,
            status: faker.helpers.arrayElement(TEAM_STATUS),
        },
    })));
    for (let i = 0; i < 40; i++) {
        const customer = customers[i % customers.length];
        const initDate = faker.date.between({ from: '2026-01-01', to: '2026-06-30' });
        const endDate = new Date(initDate);
        endDate.setDate(endDate.getDate() + faker.number.int({ min: 3, max: 30 }));
        const validityDate = new Date(endDate);
        validityDate.setDate(validityDate.getDate() + 30);
        const estimatedHours = faker.number.float({ min: 4, max: 120, fractionDigits: 1 });
        const valueHour = faker.number.float({ min: 50, max: 200, fractionDigits: 2 });
        const numberEmployees = faker.number.int({ min: 1, max: 6 });
        const laborValue = estimatedHours * valueHour * numberEmployees;
        const numMaterials = faker.number.int({ min: 2, max: 4 });
        let materialValue = 0;
        const materials = [];
        for (let m = 0; m < numMaterials; m++) {
            const quantity = faker.number.float({ min: 1, max: 50, fractionDigits: 0 });
            const unitPrice = faker.number.float({ min: 5, max: 250, fractionDigits: 2 });
            materials.push({
                name: faker.helpers.arrayElement(MATERIAL_NAMES),
                unit: faker.helpers.arrayElement(MATERIAL_UNITS),
                quantity,
                unitPrice,
            });
            materialValue += quantity * unitPrice;
        }
        const discount = faker.helpers.maybe(() => faker.number.float({ min: 0, max: 15, fractionDigits: 0 })) ?? 0;
        const totalValue = (laborValue + materialValue) * (1 - discount / 100);
        const order = await prisma_1.prisma.order.upsert({
            where: { customerId_initDate: { customerId: customer.id, initDate } },
            update: {},
            create: {
                name: customer.name,
                phone: customer.phone,
                address: customer.address ?? '',
                observations: faker.helpers.maybe(() => faker.lorem.sentence()) ?? '',
                title: SERVICE_NAMES[i % SERVICE_NAMES.length],
                description: faker.lorem.paragraph(),
                typeCharge: faker.helpers.arrayElement(BILLING_TYPES),
                valueHour,
                estimatedHours,
                numberEmployees,
                finalObservations: faker.helpers.maybe(() => faker.lorem.sentence()) ?? '',
                initDate,
                endDate,
                validityDate,
                customerId: customer.id,
                totalValue,
                materialValue,
                discount,
                laborValue,
                status: faker.helpers.arrayElement(ORDER_STATUS),
                materials: {
                    createMany: {
                        data: materials.map((m) => ({
                            name: m.name,
                            unit: m.unit,
                            quantity: m.quantity,
                            unitPrice: m.unitPrice,
                        })),
                    },
                },
            },
            include: { materials: true },
        });
        if (i % 2 === 0) {
            const numTeam = faker.number.int({ min: 1, max: 3 });
            const shuffled = [...teamMembers].sort(() => 0.5 - Math.random());
            await Promise.all(shuffled.slice(0, numTeam).map((member) => prisma_1.prisma.teamOrder.upsert({
                where: { teamId_orderId: { teamId: member.id, orderId: order.id } },
                update: {},
                create: { teamId: member.id, orderId: order.id },
            })));
        }
    }
    await prisma_1.prisma.whatsAppSession.upsert({
        where: { instance: 'whatsapp-production' },
        update: {},
        create: {
            instance: 'whatsapp-production',
            status: 'open',
            qrCode: null,
        },
    });
    await prisma_1.prisma.whatsAppSession.upsert({
        where: { instance: 'whatsapp-test' },
        update: {},
        create: {
            instance: 'whatsapp-test',
            status: 'close',
            qrCode: 'base64_qr_code_placeholder',
        },
    });
    const someOrders = await prisma_1.prisma.order.findMany({ take: 5 });
    await Promise.all(someOrders.map((order, i) => prisma_1.prisma.messageTracking.upsert({
        where: { orderId: order.id },
        update: {},
        create: {
            orderId: order.id,
            messageId: `msg_${faker.string.alphanumeric(12)}`,
        },
    })));
    const counts = {
        accounts: await prisma_1.prisma.account.count(),
        customers: await prisma_1.prisma.customer.count(),
        teams: await prisma_1.prisma.team.count(),
        orders: await prisma_1.prisma.order.count(),
        materials: await prisma_1.prisma.orderMaterial.count(),
        teamOrders: await prisma_1.prisma.teamOrder.count(),
        whatsappSessions: await prisma_1.prisma.whatsAppSession.count(),
        messageTrackings: await prisma_1.prisma.messageTracking.count(),
    };
    return counts;
};
exports.createTestData = createTestData;
//# sourceMappingURL=test-data.js.map