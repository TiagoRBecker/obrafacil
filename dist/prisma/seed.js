"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rbac_1 = require("./seed/rbac");
const test_data_1 = require("./seed/test-data");
async function init() {
    await (0, rbac_1.createRbac)();
    const counts = await (0, test_data_1.createTestData)();
    console.log('');
    console.log('📊 Resumo dos dados de teste:');
    Object.entries(counts).forEach(([key, value]) => {
        console.log(`   ${key.padEnd(20)} ${value}`);
    });
}
init()
    .then(() => {
    console.log('🌱 Seed rodado com sucesso');
})
    .catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map