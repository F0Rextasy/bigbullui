# Security Policy

## Supported Versions

Only the latest `latest` dist-tag on npm (`bigbullui`, `bigbullicons`, `create-bigbull-app`) receives security fixes.

## Reporting a Vulnerability

**Do not open a public issue.** Report privately:

- Email: madlen.halil@gmail.com with subject `[SECURITY] bigbullui`
- Or use GitHub private vulnerability reporting on this repo, if enabled.

Include: affected package + version, reproduction steps or proof of concept, and impact assessment.

We aim to acknowledge within 72 hours and ship a fix or mitigation within 14 days. Credit is given in the release notes unless you ask otherwise.

## Scope Notes

This library ships UI source with zero runtime dependencies, which keeps the attack surface small. The docs site (`/create`, StackBlitz export, MCP server) runs entirely client-side or locally — no tokens, cookies, or tracking are collected by the library itself.
