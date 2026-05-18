# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please email **security@aksu.dev** with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

Please do **NOT** open a public issue for security vulnerabilities.

## Security Best Practices

### For Contributors:
- Never commit `.env` files with secrets
- Use `.env.example` as a template
- Review code for hardcoded credentials
- Run `npm audit` regularly
- Enable 2FA on your GitHub account

### For Users:
- Keep dependencies updated: `npm update`
- Check for vulnerabilities: `npm audit`
- Report issues responsibly

## Dependency Security

This project uses:
- **Supabase** for authentication & database
- **TanStack Router/Query** for routing & data fetching
- **Radix UI** for accessible components

All dependencies are regularly updated to patch security vulnerabilities.
