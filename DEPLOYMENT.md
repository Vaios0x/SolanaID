# SolanaID - Guía de Despliegue en Vercel

## 🚀 Configuración para Vercel

### Variables de Entorno Requeridas

Configura las siguientes variables de entorno en el dashboard de Vercel:

```bash
# Solana Configuration
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_SOLANA_TESTNET_RPC_URL=https://api.testnet.solana.com

# Program Configuration
NEXT_PUBLIC_PROGRAM_ID=your_program_id_here
NEXT_PUBLIC_NETWORK=devnet

# TLS Notary Configuration
NEXT_PUBLIC_NOTARY_SERVER_URL=https://your-notary-server.com
NEXT_PUBLIC_NOTARY_API_KEY=your_api_key_here

# App Configuration
NEXT_PUBLIC_APP_NAME=SolanaID
NEXT_PUBLIC_APP_DESCRIPTION=Decentralized Identity Verification on Solana
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Pasos para Desplegar

1. **Conectar con GitHub**
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Haz clic en "New Project"
   - Conecta tu repositorio de GitHub: `Vaios0x/SolanaID`

2. **Configurar el Proyecto**
   - **Framework Preset**: Next.js
   - **Root Directory**: `app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

3. **Configurar Variables de Entorno**
   - Ve a Settings > Environment Variables
   - Agrega todas las variables listadas arriba
   - Asegúrate de marcar "Production", "Preview", y "Development"

4. **Configurar Dominio Personalizado (Opcional)**
   - Ve a Settings > Domains
   - Agrega tu dominio personalizado
   - Configura los registros DNS según las instrucciones

### Características PWA

El proyecto está configurado como una Progressive Web App (PWA) con:

- ✅ Service Worker para cache offline
- ✅ Web App Manifest
- ✅ Iconos optimizados para diferentes tamaños
- ✅ Soporte para instalación en dispositivos móviles
- ✅ Cache inteligente para recursos estáticos

### Optimizaciones para Vercel

- **Standalone Output**: Habilitado para mejor rendimiento
- **Compression**: Habilitada para reducir el tamaño de los archivos
- **ETags**: Habilitados para cache eficiente
- **Headers de Seguridad**: Configurados para mejor seguridad
- **Cache Headers**: Optimizados para PWA

### Comandos de Build

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

### Estructura del Proyecto

```
app/
├── app/                 # Next.js App Router
├── components/          # Componentes React
├── lib/                # Utilidades y hooks
├── public/             # Archivos estáticos
│   ├── manifest.json   # PWA Manifest
│   ├── sw.js          # Service Worker
│   └── icons/          # Iconos PWA
├── vercel.json        # Configuración Vercel
└── package.json       # Dependencias
```

### Troubleshooting

**Error de Build:**
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que el Node.js version sea >= 18.0.0

**PWA no funciona:**
- Verifica que el manifest.json esté accesible
- Revisa que el Service Worker esté registrado correctamente
- Usa HTTPS en producción (Vercel lo proporciona automáticamente)

**Errores de Solana:**
- Verifica que las URLs de RPC sean correctas
- Asegúrate de que el Program ID sea válido
- Revisa la configuración de red (mainnet/devnet/testnet)

### Monitoreo

- **Vercel Analytics**: Habilitado automáticamente
- **Performance**: Monitoreo de Core Web Vitals
- **Errors**: Logs de errores en tiempo real
- **Deployments**: Historial de despliegues

### Soporte

Para problemas específicos de Vercel:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [PWA on Vercel](https://vercel.com/docs/deployments/static-files)
