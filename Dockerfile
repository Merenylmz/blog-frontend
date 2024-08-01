FROM node:20.15.0-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY . . 
RUN  yarn install
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

#ENV NEXT_TELEMETRY_DISABLED 1

# RUN yarn build

#ENV NODE_ENV production
#ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copying source files
#COPY . /app

RUN chown -R nextjs:nodejs .
RUN /bin/sh -c /bin/sh -c chown -R nextjs:nodejs /app/.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
CMD ["yarn", "run", "dev"]