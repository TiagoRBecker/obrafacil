"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRbac = void 0;
require("dotenv/config");
const bcrypt_1 = require("bcrypt");
const prisma_1 = require("./prisma");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@admin.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const createRbac = async () => {
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
    await prisma_1.prisma.permission.createMany({
        data: permissions,
        skipDuplicates: true,
    });
    const admin = await prisma_1.prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: { name: 'ADMIN' },
    });
    const user = await prisma_1.prisma.role.upsert({
        where: { name: 'USER' },
        update: {},
        create: { name: 'USER' },
    });
    const allPermissions = await prisma_1.prisma.permission.findMany();
    await prisma_1.prisma.rolePermission.createMany({
        data: allPermissions.map((p) => ({
            roleId: admin.id,
            permissionId: p.id,
        })),
        skipDuplicates: true,
    });
    const basicPermissions = allPermissions.filter((p) => ['order:read', 'customer:read'].includes(p.name));
    await prisma_1.prisma.rolePermission.createMany({
        data: basicPermissions.map((p) => ({
            roleId: user.id,
            permissionId: p.id,
        })),
        skipDuplicates: true,
    });
    const existingAdmin = await prisma_1.prisma.account.findUnique({
        where: { email: ADMIN_EMAIL },
    });
    if (!existingAdmin) {
        const adminPasswordHash = await (0, bcrypt_1.hash)(ADMIN_PASSWORD, 10);
        await prisma_1.prisma.account.create({
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
};
exports.createRbac = createRbac;
//# sourceMappingURL=rbac.js.map