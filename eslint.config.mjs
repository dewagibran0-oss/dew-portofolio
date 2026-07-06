import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Pola yang disengaja & aman untuk proyek ini (tanpa React Compiler):
    // - set-state-in-effect: sinkronisasi atribut DOM (tema/lang) -> state saat mount (anti-FOUC).
    // - purity/immutability: pola standar React-Three-Fiber (Math.random di useMemo, mutasi uniform di useFrame).
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
    },
  },
]);

export default eslintConfig;
