
import { Router } from 'express';
import { searchController } from '../controllers/search.controller';

const router = Router();

router.get('/', searchController.unifiedSearch);
router.get('/papers', searchController.unifiedSearch); // Reusing unified with type filter
router.get('/authors', searchController.unifiedSearch); // Reusing unified with type filter

export default router;
