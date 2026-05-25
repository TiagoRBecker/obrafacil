import { createSettings } from './seed/settings';
import { createRbac } from './seed/rbac';
import { createTestData } from './seed/test-data';

async function init() {
  await createSettings();
  await createRbac();
  const counts = await createTestData();
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
