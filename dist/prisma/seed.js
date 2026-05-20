"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcrypt_1 = require("bcrypt");
const settings_1 = require("./seed/settings");
const rbac_1 = require("./seed/rbac");
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set; see prisma/.env');
}
const prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({ connectionString: databaseUrl }),
});
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@admin.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
async function main() {
    const resources = [
        'account',
        'customer',
        'order',
        'team',
        'settings',
    ];
    const actions = ['create', 'read', 'update', 'delete'];
    const permissions = [];
    for (const resource of resources) {
        for (const action of actions) {
            permissions.push({
                name: `${resource}:${action}`,
            });
        }
    }
    await prisma.permission.createMany({
        data: permissions,
        skipDuplicates: true,
    });
    const admin = await prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: { name: 'ADMIN' },
    });
    const user = await prisma.role.upsert({
        where: { name: 'USER' },
        update: {},
        create: { name: 'USER' },
    });
    const allPermissions = await prisma.permission.findMany();
    await prisma.rolePermission.createMany({
        data: allPermissions.map((p) => ({
            roleId: admin.id,
            permissionId: p.id,
        })),
        skipDuplicates: true,
    });
    const basicPermissions = allPermissions.filter((p) => ['order:read', 'customer:read'].includes(p.name));
    await prisma.rolePermission.createMany({
        data: basicPermissions.map((p) => ({
            roleId: user.id,
            permissionId: p.id,
        })),
        skipDuplicates: true,
    });
    const existingAdmin = await prisma.account.findUnique({
        where: { email: ADMIN_EMAIL },
    });
    if (!existingAdmin) {
        const adminPasswordHash = await (0, bcrypt_1.hash)(ADMIN_PASSWORD, 10);
        await prisma.account.create({
            data: {
                name: 'Admin Master',
                email: ADMIN_EMAIL,
                password: adminPasswordHash,
                roleId: admin.id,
            },
        });
        console.log(`✅ Admin master criado: ${ADMIN_EMAIL}`);
    }
    else {
        console.log(`ℹ️ Admin master já existe: ${ADMIN_EMAIL}`);
    }
}
async function init() {
    await (0, settings_1.createSettings)();
    await (0, rbac_1.createRbac)();
}
init()
    .then(() => {
    console.log('🌱 Seed rodado com sucesso');
})
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map