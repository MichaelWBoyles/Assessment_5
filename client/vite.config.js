import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const productionBuildConfig = {
  base:'/static/',
  build:{
    outDir:'../server/static',

    emptyOutDir:true,
    sourcemap:true,
  },

  plugins: [react()]
};


export default defineConfig(productionBuildConfig)