// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node', // or 'jsdom' for browser-like env
        globals: true,        // optional: use global describe/test/expect
        coverage: {
            reporter: ['text', 'html']
        }
    }
});
