
import { createApp } from './src/app';
import { createServer as createViteServer } from 'vite';
import { env } from './src/config/env';

async function startServer() {
  const app = await createApp();
  const PORT = parseInt(env.PORT, 10);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    const express = await import('express');
    const path = await import('path');
    app.use(express.static(path.join(process.cwd(), 'dist')));
    
    // SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
