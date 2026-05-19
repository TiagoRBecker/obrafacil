const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const INSTANCE_NAME = process.env.INSTANCE_NAME;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const NUMBER = process.env.NUMBER;

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForApi(maxRetries = 20) {
  console.log('⏳ Aguardando Evolution API...');
  console.log('WEBHOOK_URL:', WEBHOOK_URL);

  for (let i = 1; i <= maxRetries; i++) {
    try {
      const res = await fetch(`${API_URL}/`);
      if (res.status === 200 || res.status === 401 || res.status === 404) {
        console.log(`✅ API respondendo (HTTP ${res.status})`);
        return;
      }
      console.log(
        `   Tentativa ${i}/${maxRetries} — HTTP ${res.status} — aguardando ${i}s...`,
      );
    } catch {
      console.log(
        `   Tentativa ${i}/${maxRetries} — sem resposta — aguardando ${i}s...`,
      );
    }
    await wait(i * 1000);
  }

  throw new Error('❌ API não respondeu. Verifique o container evolution.');
}

async function createInstance() {
  console.log(`🚀 Criando instância '${INSTANCE_NAME}'...`);

  const res = await fetch(`${API_URL}/instance/create`, {
    method: 'POST',
    headers: {
      apikey: API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instanceName: INSTANCE_NAME,
      token: INSTANCE_NAME,
      integration: 'WHATSAPP-BAILEYS',

      qrcode: false, // 👈 essencial

      settings: {
        groupsIgnore: true,
        alwaysOnline: false,
        readMessages: false,
        readStatus: false,
      },

      webhook: {
        enabled: true,
        url: WEBHOOK_URL,

        // 👉 melhor usar true (modo correto por evento)
        byEvents: false,

        // 👉 QR já vem pronto em base64
        base64: false,

        events: ['QRCODE_UPDATED', 'CONNECTION_UPDATE', 'MESSAGES_UPSERT'],
      },
    }),
  });

  const data = await res.json();
  console.log('📦 Resposta:', JSON.stringify(data, null, 2));

  if (data.instanceName || res.status === 201) {
    console.log('✅ Instância criada com sucesso!');
  } else if (JSON.stringify(data).toLowerCase().includes('already')) {
    console.log('ℹ️  Instância já existia — ok.');
  } else {
    throw new Error('Falha ao criar instância.');
  }
}

async function main() {
  console.log('🔧 Variáveis:');
  console.log(`   API_URL:       ${API_URL}`);
  console.log(`   INSTANCE_NAME: ${INSTANCE_NAME}`);
  console.log(`   WEBHOOK_URL:   ${WEBHOOK_URL}`);

  await waitForApi();
  await createInstance();

  console.log('🎉 Init finalizado.');
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
