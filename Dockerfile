# Multi-stage build for Next.js 14 app (production image)
# Uses standalone output to minimize runtime size.

# 1) Base builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (use npm here; adapt if you prefer pnpm/yarn)
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci --ignore-scripts

# Copy source
COPY . .

# Build with standalone output
RUN npm run build

# 2) Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Add a non-root user for safety
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy standalone build and necessary assets from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose Next.js port
EXPOSE 3000
USER appuser

# Start the standalone server
CMD ["node", "server.js"]
