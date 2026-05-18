# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in the Aksu project, please report it responsibly by emailing **ezrat2116@gmail.com** instead of using the issue tracker.

### Guidelines for Reporting:

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Include a clear description of the vulnerability
3. Provide steps to reproduce if applicable
4. Include your email address for follow-up

### Our Commitment:

- We will respond to your report within 48 hours
- We will keep you informed of our progress toward a fix
- We will credit you in the fix announcement (if desired)
- We will work to resolve critical vulnerabilities quickly

## Security Best Practices

This project uses:

- **TypeScript** for type safety
- **Supabase** for database and authentication
- **React** with modern security practices
- **ESLint & Prettier** for code quality

### Keeping Your Fork Secure:

1. Never commit `.env` files containing secrets
2. Always use `.env.example` as a template
3. Rotate API keys if they are ever exposed
4. Use environment variables for sensitive configuration
5. Keep dependencies up to date: `npm audit`

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅ Actively supported |
| Older   | ❌ No longer supported |

## Security Updates

We regularly update dependencies to patch security vulnerabilities. Check for updates with:

```bash
npm audit
npm update
```
