import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'client')
const DEST = path.join(ROOT, 'frontend-only')

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function rm(p) {
  if (await exists(p)) await fs.rm(p, { recursive: true, force: true })
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === 'dist') continue
    if (e.name.startsWith('.env')) continue
    const from = path.join(src, e.name)
    const to = path.join(dest, e.name)
    if (e.isDirectory()) await copyDir(from, to)
    else if (e.isFile()) await fs.copyFile(from, to)
  }
}

async function patchFiles() {
  // 1) Remove dev proxy to backend in vite config
  const viteConfigPath = path.join(DEST, 'vite.config.js')
  if (await exists(viteConfigPath)) {
    const raw = await fs.readFile(viteConfigPath, 'utf8')
    const next = raw.replace(
      /,\s*server:\s*\{\s*proxy:\s*\{[\s\S]*?\}\s*\}\s*\n?\}\)\s*$/m,
      '\n})\n'
    )
    await fs.writeFile(viteConfigPath, next, 'utf8')
  }

  // 2) Force mock API by default
  const apiPath = path.join(DEST, 'src', 'lib', 'api.js')
  if (await exists(apiPath)) {
    let raw = await fs.readFile(apiPath, 'utf8')
    raw = raw.replace(
      /const USE_MOCK\s*=\s*import\.meta\.env\.VITE_API_MOCK\s*===\s*'1'\s*/,
      "const USE_MOCK = true\n"
    )
    raw = raw.replaceAll(
      "import.meta.env.VITE_API_MOCK === '1'",
      'true'
    )
    await fs.writeFile(apiPath, raw, 'utf8')
  }

  // 3) Add a minimal README for deploy instructions
  const readmePath = path.join(DEST, 'README.md')
  const readme = `# Frontend-only (Mock)\n\nChạy UI độc lập, không cần backend/database.\n\n## Dev\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Deploy Vercel\n- Root Directory: \`frontend-only\`\n- Framework: Vite\n- Build Command: \`npm run build\`\n- Output: \`dist\`\n`
  await fs.writeFile(readmePath, readme, 'utf8')
}

console.log('[frontend-only] Recreating folder...')
await rm(DEST)
await copyDir(SRC, DEST)
await patchFiles()
console.log('[frontend-only] Done:', DEST)

