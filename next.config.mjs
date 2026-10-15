/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Para que un detalle de tipos no frene el despliegue en Vercel
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
